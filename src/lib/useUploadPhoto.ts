type UploadPhotoData = {
  title: string;
  description: string;
  category: string;
  price: number;
};

export async function uploadPhoto(
  originalFile: File,
  previewFile: File,
  data: UploadPhotoData,
) {
  // 🟢 1. ORIGINAL → R2
  const r2FormData = new FormData();
  r2FormData.append('file', originalFile);

  const r2Res = await fetch('/api/r2-upload', {
    method: 'POST',
    body: r2FormData,
  });

  const { r2Key, originalUrl } = await r2Res.json();

  // 🟢 2. PREVIEW → Cloudinary
  const cloudinaryForm = new FormData();
  cloudinaryForm.append('file', previewFile);

  const cloudinaryRes = await fetch('/api/cloudinary-upload', {
    method: 'POST',
    body: cloudinaryForm,
  });

  const cloudinaryData = await cloudinaryRes.json();

  // 🟢 3. DB
  await fetch('/api/photos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      r2Key,
      originalUrl,
      cloudinaryPublicId: cloudinaryData.public_id,
    }),
  });
}
