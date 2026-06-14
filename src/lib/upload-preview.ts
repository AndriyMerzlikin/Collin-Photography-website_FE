import cloudinary from '@/lib/cloudinary';
import type { UploadApiResponse } from 'cloudinary';

export async function uploadPreviewToCloudinary(
  buffer: Buffer,
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'photos',
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result);
      },
    );

    stream.end(buffer);
  });
}
