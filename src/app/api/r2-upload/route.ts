import { NextResponse } from 'next/server';
import { r2 } from '@/lib/r2';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const r2Key = `photos/${Date.now()}-${file.name.replace(/\s/g, '-')}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: r2Key,
        Body: buffer,
        ContentType: file.type,
      }),
    );

    const originalUrl = `${process.env.R2_PUBLIC_URL}/${r2Key}`;

    return NextResponse.json({
      r2Key,
      originalUrl,
    });
  } catch (error) {
    console.error('R2 UPLOAD ERROR:', error);
    return NextResponse.json({ error: 'R2 upload failed' }, { status: 500 });
  }
}
