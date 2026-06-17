import { NextResponse } from 'next/server';

import { r2 } from '@/lib/r2';

import { PutObjectCommand } from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export async function POST(req: Request) {
    const { fileName, fileType } = await req.json();

    const key = `photos/${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: key,
        ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(r2, command, {
        expiresIn: 300,
    });

    return NextResponse.json({
        uploadUrl,
        key,
    });
}