import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import cloudinary from '@/lib/cloudinary';
import { Photo } from '@/models/Photo';

// Get one by id
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
    console.error(error);

    return NextResponse.json({ error: 'Failed to get photo' }, { status: 500 });
  }
}

// Update by ID
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
    const category = formData.get('category') as string;
    const price = Number(formData.get('price'));

    const file = formData.get('file') as File | null;

    let cloudinaryPublicId = photo.cloudinaryPublicId;

    // Якщо завантажили нове фото
    if (file && file.size > 0) {
      // видаляємо старе
      await cloudinary.uploader.destroy(photo.cloudinaryPublicId);

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'photos',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );

        stream.end(buffer);
      });

      cloudinaryPublicId = uploadResult.public_id;
    }

    const updatedPhoto = await Photo.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        price,
        cloudinaryPublicId,
      },
      {
        new: true,
      },
    );

    return NextResponse.json(updatedPhoto);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Update failed',
      },
      {
        status: 500,
      },
    );
  }
}

// Delete by Id
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

    await cloudinary.uploader.destroy(photo.cloudinaryPublicId);

    await Photo.findByIdAndDelete(id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
