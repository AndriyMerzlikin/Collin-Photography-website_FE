import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import cloudinary from '@/lib/cloudinary';
import { Photo } from '@/models/Photo';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { r2 } from '@/lib/r2';
import { createSlug } from '@/lib/slug';

/* =========================
   GET BY ID
========================= */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await params;

  const photo = await Photo.findById(id);

  if (!photo) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
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
}

/* =========================
   UPDATE PHOTO (ONLY JSON)
========================= */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const photo = await Photo.findById(id);

    if (!photo) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const oldR2Key = photo.r2Key;
    const oldCloudinaryId = photo.cloudinaryPublicId;

    const {
      title,
      description,
      category,
      price,
      r2Key,
      originalUrl,
      cloudinaryPublicId,
    } = body;

    const updated = await Photo.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        price,

        r2Key: r2Key ?? photo.r2Key,
        originalUrl: originalUrl ?? photo.originalUrl,
        cloudinaryPublicId: cloudinaryPublicId ?? photo.cloudinaryPublicId,

        slug: title ? createSlug(title) : photo.slug,
      },
      { new: true },
    );

    const imageChanged =
      r2Key &&
      cloudinaryPublicId &&
      (oldR2Key !== r2Key || oldCloudinaryId !== cloudinaryPublicId);

    if (imageChanged) {
      await Promise.allSettled([
        r2.send(
          new DeleteObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: oldR2Key,
          }),
        ),

        cloudinary.uploader.destroy(oldCloudinaryId),
      ]);
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('PUT ERROR:', error);

    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

/* =========================
   DELETE PHOTO
========================= */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await params;

  const photo = await Photo.findById(id);

  if (!photo) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await cloudinary.uploader.destroy(photo.cloudinaryPublicId);

  if (photo.r2Key) {
    await r2.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: photo.r2Key,
      }),
    );
  }

  await Photo.findByIdAndDelete(id);

  return NextResponse.json({ ok: true });
}
