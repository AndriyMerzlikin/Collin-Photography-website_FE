import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import cloudinary from '@/lib/cloudinary';
import { Photo } from '@/models/Photo';
import { createSlug } from '@/lib/slug';

export async function GET() {
  await connectDB();

  const photos = await Photo.find().sort({ createdAt: -1 });

  return NextResponse.json(
    photos.map((photo) => ({
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
    })),
  );
}

/* =========================
   CREATE PHOTO (ONLY DB)
========================= */
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      title,
      description,
      category,
      price,
      r2Key,
      originalUrl,
      cloudinaryPublicId,
    } = body;

    if (!title || !category || !price || !r2Key || !cloudinaryPublicId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const slug = createSlug(title);

    const photo = await Photo.create({
      title,
      description,
      category,
      price,
      slug, // ✅ IMPORTANT
      r2Key,
      originalUrl,
      cloudinaryPublicId,
    });

    return NextResponse.json(photo);
  } catch (error) {
    console.error('POST ERROR:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
