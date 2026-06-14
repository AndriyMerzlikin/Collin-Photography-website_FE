import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import cloudinary from '@/lib/cloudinary';
import { Photo } from '@/models/Photo';

import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { r2 } from '@/lib/r2';

import { uploadToR2 } from '@/lib/r2-upload';
import { createPreviewBuffer } from '@/lib/resize-preview';
import { uploadPreviewToCloudinary } from '@/lib/upload-preview';

import type { UploadApiResponse } from 'cloudinary';
import { PhotoUploadFormValues } from '@/components/PhotoUploadForm/photoUploadFormSchema';

type UpdatePhotoData = Partial<PhotoUploadFormValues> & {
  originalUrl?: string;
  r2Key?: string;
  cloudinaryPublicId?: string;
};
/* =========================
   GET BY ID
========================= */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const photo = await Photo.findById(id);

    if (!photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...photo.toObject(),

      thumbnailUrl: cloudinary.url(photo.cloudinaryPublicId, {
        secure: true,
        transformation: [{ width: 600, crop: 'fill' }],
      }),

      previewUrl: cloudinary.url(photo.cloudinaryPublicId, {
        secure: true,
        transformation: [
          { width: 1800, quality: 'auto' },
          {
            overlay: 'gallery_watermark_tvi72l',
            gravity: 'south',
            y: 20,
            opacity: 80,
          },
        ],
      }),
    });
  } catch (error) {
    console.error('GET PHOTO ERROR:', error);

    return NextResponse.json({ error: 'Failed to get photo' }, { status: 500 });
  }
}

/* =========================
   UPDATE BY ID
========================= */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const photo = await Photo.findById(id);

    if (!photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    const formData = await req.formData();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    const category = formData.get(
      'category',
    ) as PhotoUploadFormValues['category'];

    const price = Number(formData.get('price'));
    const file = formData.get('file') as File | null;

    let updatedData: UpdatePhotoData = {
      title,
      description,
      category,
      price,
    };

    if (file && file.size > 0) {
      console.log('🟡 NEW FILE UPLOADED - updating image');

      const oldR2Key = photo.r2Key;
      const oldCloudinaryId = photo.cloudinaryPublicId;

      // 🧨 1. DELETE OLD FILE FIRST (R2)
      if (oldR2Key) {
        try {
          console.log('🧨 DELETING OLD R2 BEFORE UPLOAD:', oldR2Key);

          await r2.send(
            new DeleteObjectCommand({
              Bucket: process.env.R2_BUCKET_NAME!,
              Key: oldR2Key,
            }),
          );

          console.log('✅ OLD R2 DELETED');
        } catch (err) {
          console.error('❌ FAILED TO DELETE OLD R2:', err);
        }
      }

      // 🧨 2. DELETE OLD CLOUDINARY
      if (oldCloudinaryId) {
        await cloudinary.uploader.destroy(oldCloudinaryId);
      }

      // 🟢 3. NOW upload new file
      const r2Key = `photos/${Date.now()}-${file.name.replace(/\s/g, '-')}`;

      const originalUrl = await uploadToR2(file, r2Key);

      const previewBuffer = await createPreviewBuffer(file);

      const cloudinaryResult = (await uploadPreviewToCloudinary(
        previewBuffer,
      )) as UploadApiResponse;

      updatedData = {
        ...updatedData,
        originalUrl,
        r2Key,
        cloudinaryPublicId: cloudinaryResult.public_id,
      };
    }

    const updatedPhoto = await Photo.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return NextResponse.json(updatedPhoto);
  } catch (error) {
    console.error('UPDATE ERROR:', error);

    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

/* =========================
   DELETE BY ID
========================= */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const photo = await Photo.findById(id);

    if (!photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    // 1. delete cloudinary
    await cloudinary.uploader.destroy(photo.cloudinaryPublicId);

    // 2. delete r2 (FIXED WITH LOGS)
    if (photo.r2Key) {
      try {
        await r2.send(
          new DeleteObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: photo.r2Key,
          }),
        );
      } catch (err) {
        console.error('❌ R2 DELETE ERROR:', err);
      }
    } else {
      console.log('⚠️ NO R2 KEY FOUND IN DB');
    }

    // 3. delete db
    await Photo.findByIdAndDelete(id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('DELETE ERROR:', error);

    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
