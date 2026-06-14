// import { NextResponse } from 'next/server';
// import { connectDB } from '@/lib/mongodb';
// import cloudinary from '@/lib/cloudinary';
// import { Photo } from '@/models/Photo';
// import { createSlug } from '@/lib/slug';
//
// // import { uploadToR2 } from '@/lib/r2-upload';
// // import { createPreviewBuffer } from '@/lib/resize-preview';
// // import { uploadPreviewToCloudinary } from '@/lib/upload-preview';
//
// export async function GET() {
//   await connectDB();
//
//   const photos = await Photo.find().sort({
//     createdAt: -1,
//   });
//
//   const formattedPhotos = photos.map((photo) => ({
//     ...photo.toObject(),
//
//     thumbnailUrl: cloudinary.url(photo.cloudinaryPublicId, {
//       secure: true,
//       transformation: [
//         {
//           width: 600,
//           crop: 'fill',
//         },
//       ],
//     }),
//
//     previewUrl: cloudinary.url(photo.cloudinaryPublicId, {
//       secure: true,
//       transformation: [
//         {
//           width: 1800,
//           quality: 'auto',
//         },
//         {
//           overlay: 'gallery_watermark_tvi72l',
//           gravity: 'south',
//           y: 20,
//           opacity: 80,
//         },
//       ],
//     }),
//   }));
//
//   return NextResponse.json(formattedPhotos);
// }
// // UPLOAD PHOTO TO GALLERY
//
// // export async function POST(req: Request) {
// //   try {
// //     await connectDB();
// //
// //     const formData = await req.formData();
// //
// //     const file = formData.get('file') as File;
// //     const title = formData.get('title') as string;
// //     const description = formData.get('description') as string;
// //     const category = formData.get('category') as string;
// //     const price = Number(formData.get('price'));
// //
// //     if (!file || !title || !category || Number.isNaN(price)) {
// //       return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
// //     }
// //
// //     const slug = createSlug(title);
// //
// //     // 🟢 STEP 1 — upload ORIGINAL to R2
// //     const r2Key = `photos/${Date.now()}-${file.name}`;
// //     const originalUrl = await uploadToR2(file, r2Key);
// //
// //     // 🟢 STEP 2 — create preview buffer
// //     const previewBuffer = await createPreviewBuffer(file);
// //
// //     // 🟢 STEP 3 — upload preview to Cloudinary
// //     const cloudinaryResult = await uploadPreviewToCloudinary(previewBuffer);
// //
// //     // 🟢 STEP 4 — save DB
// //     const photo = await Photo.create({
// //       title,
// //       description,
// //       category,
// //       price,
// //       slug,
// //
// //       // preview (Cloudinary)
// //       cloudinaryPublicId: cloudinaryResult.public_id,
// //
// //       // original (R2)
// //       originalUrl,
// //       r2Key,
// //     });
// //
// //     return NextResponse.json(photo, { status: 201 });
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
// //   }
// // }
//
// export async function POST(req: Request) {
//   try {
//     await connectDB();
//
//     const body = await req.json(); // ✅ ТЕПЕР ТІЛЬКИ JSON
//
//     const {
//       title,
//       description,
//       category,
//       price,
//       r2Key,
//       originalUrl,
//       cloudinaryPublicId,
//     } = body;
//
//     if (!title || !category || !price || !r2Key || !cloudinaryPublicId) {
//       return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
//     }
//
//     const slug = createSlug(title);
//
//     const photo = await Photo.create({
//       title,
//       description,
//       category,
//       price,
//       slug,
//       r2Key,
//       originalUrl,
//       cloudinaryPublicId,
//     });
//
//     return NextResponse.json(photo, { status: 201 });
//   } catch (error) {
//     console.error('POST /photos error:', error);
//     return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
//   }
// }

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
