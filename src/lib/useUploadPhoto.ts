// type UploadPhotoData = {
//   title: string;
//   description: string;
//   category: string;
//   price: number;
// };
//
// export async function uploadPhoto(
//   originalFile: File,
//   previewFile: File,
//   data: UploadPhotoData,
// ) {
//   // 🟢 1. ORIGINAL → R2
//   const r2FormData = new FormData();
//   r2FormData.append('file', originalFile);
//
//   const r2Res = await fetch('/api/r2-upload', {
//     method: 'POST',
//     body: r2FormData,
//   });
//
//   const { r2Key, originalUrl } = await r2Res.json();
//
//   // 🟢 2. PREVIEW → Cloudinary
//   const cloudinaryForm = new FormData();
//   cloudinaryForm.append('file', previewFile);
//
//   const cloudinaryRes = await fetch('/api/cloudinary-upload', {
//     method: 'POST',
//     body: cloudinaryForm,
//   });
//
//   const cloudinaryData = await cloudinaryRes.json();
//
//   // 🟢 3. DB
//   await fetch('/api/photos', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       ...data,
//       r2Key,
//       originalUrl,
//       cloudinaryPublicId: cloudinaryData.public_id,
//     }),
//   });
// }
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
  /* =====================================
     1. GET PRESIGNED URL FROM NEXT API
  ===================================== */

  const presignedRes = await fetch('/api/r2/presigned-url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fileName: originalFile.name,
      fileType: originalFile.type,
    }),
  });

  if (!presignedRes.ok) {
    throw new Error('Failed to get R2 upload URL');
  }

  const { uploadUrl, key } = await presignedRes.json();

  /* =====================================
     2. DIRECT UPLOAD TO R2
     (BYPASSES VERCEL COMPLETELY)
  ===================================== */

  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': originalFile.type,
    },
    body: originalFile,
  });

  if (!uploadRes.ok) {
    throw new Error('Failed to upload original file to R2');
  }

  const originalUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`;

  /* =====================================
     3. PREVIEW → CLOUDINARY
  ===================================== */

  const cloudinaryForm = new FormData();
  cloudinaryForm.append('file', previewFile);

  const cloudinaryRes = await fetch('/api/cloudinary-upload', {
    method: 'POST',
    body: cloudinaryForm,
  });

  if (!cloudinaryRes.ok) {
    throw new Error('Failed to upload preview to Cloudinary');
  }

  const cloudinaryData = await cloudinaryRes.json();

  /* =====================================
     4. SAVE PHOTO TO DATABASE
  ===================================== */

  const dbRes = await fetch('/api/photos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,

      r2Key: key,
      originalUrl,

      cloudinaryPublicId: cloudinaryData.public_id,
    }),
  });

  if (!dbRes.ok) {
    throw new Error('Failed to save photo');
  }

  return await dbRes.json();
}