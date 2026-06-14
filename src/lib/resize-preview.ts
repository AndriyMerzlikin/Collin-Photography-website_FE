import sharp from 'sharp';

export async function createPreviewBuffer(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  return await sharp(buffer)
    .resize({ width: 1800, withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toBuffer();
}
