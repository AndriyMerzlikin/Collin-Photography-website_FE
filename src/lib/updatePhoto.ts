import { createBrowserPreview } from './create-browser-preview';

type UpdatePhotoData = {
  title: string;
  description: string;
  category: string;
  price: number;
};

export async function updatePhoto(
  photoId: string,
  data: UpdatePhotoData,
  file?: File,
) {
  let payload: Record<string, unknown> = {
    ...data,
  };

  // якщо фото не змінювали
  if (!file) {
    const res = await fetch(`/api/photos/${photoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error('Failed to update photo');
    }

    return await res.json();
  }

  // ---------- R2 ----------
  const presignedRes = await fetch('/api/r2/presigned-url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fileName: file.name,
      fileType: file.type,
    }),
  });

  if (!presignedRes.ok) {
    throw new Error('Failed to get R2 URL');
  }

  const { uploadUrl, key } = await presignedRes.json();

  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error('Failed to upload original file');
  }

  const originalUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`;

  // ---------- CLOUDINARY ----------
  const previewFile = await createBrowserPreview(file);

  const cloudinaryForm = new FormData();

  cloudinaryForm.append('file', previewFile);

  const cloudinaryRes = await fetch('/api/cloudinary-upload', {
    method: 'POST',
    body: cloudinaryForm,
  });

  if (!cloudinaryRes.ok) {
    throw new Error('Failed to upload preview');
  }

  const cloudinaryData = await cloudinaryRes.json();

  payload = {
    ...payload,
    r2Key: key,
    originalUrl,
    cloudinaryPublicId: cloudinaryData.public_id,
  };

  const res = await fetch(`/api/photos/${photoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to update photo');
  }

  return await res.json();
}
