import { GalleryItem } from '@/types/galleryTypes';

// GET ALL PHOTOS
export const fetchAllGalleryItems = async (): Promise<GalleryItem[]> => {
  const res = await fetch('/api/photos');

  if (!res.ok) {
    throw new Error('Failed to fetch gallery');
  }

  return res.json();
};

// GET ONE PHOTO BY ID
export const fetchGalleryItemById = async (
  id: string,
): Promise<GalleryItem> => {
  const res = await fetch(`/api/photos/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch photo');
  }

  return res.json();
};

// CREATE NEW PHOTO
export const createPhoto = async (data: FormData): Promise<GalleryItem> => {
  const res = await fetch('/api/photos', {
    method: 'POST',
    body: data,
  });

  if (!res.ok) {
    throw new Error('Failed to create photo');
  }

  return res.json();
};

// DELETE PHOTO BY ID
export const deletePhoto = async (id: string): Promise<{ ok: boolean }> => {
  const res = await fetch(`/api/photos/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete photo');
  }

  return res.json();
};

// UPDATE PHOTO BY ID
export const updatePhoto = async (
  id: string,
  data: FormData,
): Promise<GalleryItem> => {
  const res = await fetch(`/api/photos/${id}`, {
    method: 'PUT',
    body: data,
  });

  if (!res.ok) {
    throw new Error('Failed to update photo');
  }

  return res.json();
};
