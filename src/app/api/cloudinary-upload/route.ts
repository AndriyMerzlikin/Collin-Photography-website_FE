import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import type { UploadApiResponse } from 'cloudinary';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'gallery',
        },
        (error, result) => {
          if (error) {
            console.error('CLOUDINARY ERROR:', error);
            return reject(error);
          }

          if (!result) {
            console.error('CLOUDINARY: EMPTY RESULT');
            return reject(new Error('Empty Cloudinary result'));
          }

          resolve(result);
        },
      );

      stream.end(buffer);
    });

    console.log('CLOUDINARY UPLOADED:', result.secure_url);

    return NextResponse.json({
      public_id: result.public_id,
      secure_url: result.secure_url,
    });
  } catch (error) {
    console.error('CLOUDINARY UPLOAD FAILED:', error);

    return NextResponse.json(
      { error: 'Cloudinary upload failed' },
      { status: 500 },
    );
  }
}
