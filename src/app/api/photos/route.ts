import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import cloudinary from '@/lib/cloudinary';
import { Photo } from '@/models/Photo';
import { createSlug } from '@/lib/slug';

// GET ALL PHOTOS

// export async function GET() {
//     await connectDB();
//
//     const photos = await Photo.find().sort({
//         createdAt: -1,
//     });
//
//     return NextResponse.json(photos);
// }

export async function GET() {
  await connectDB();

  const photos = await Photo.find().sort({
    createdAt: -1,
  });

  const formattedPhotos = photos.map((photo) => ({
    ...photo.toObject(),

    thumbnailUrl: cloudinary.url(photo.cloudinaryPublicId, {
      secure: true,
      transformation: [
        {
          width: 600,
          crop: 'fill',
        },
      ],
    }),

    previewUrl: cloudinary.url(photo.cloudinaryPublicId, {
      secure: true,
      transformation: [
        {
          width: 1800,
          quality: 'auto',
        },
        {
          overlay: 'gallery_watermark_tvi72l',
          gravity: 'south',
          y: 20,
          opacity: 80,
        },
      ],
    }),
  }));

  return NextResponse.json(formattedPhotos);
}
// UPLOAD PHOTO TO GALLERY

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const file = formData.get('file') as File;

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const price = Number(formData.get('price'));

    if (!file || !title || !category || Number.isNaN(price)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    // 1. File → Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 2. Upload to Cloudinary
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

    // 3. Generate slug
    const slug = createSlug(title);

    // 4. Save to MongoDB
    const photo = await Photo.create({
      title,
      description,
      category,
      price,
      cloudinaryPublicId: uploadResult.public_id,
      slug,
    });

    // 5. Return result
    return NextResponse.json(photo, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
