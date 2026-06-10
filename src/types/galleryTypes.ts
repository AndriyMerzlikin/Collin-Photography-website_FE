export type GalleryCategory = 'birds' | 'landscape' | 'mammals';

export type GalleryCategoryAll = GalleryCategory | 'all';

export type GalleryItem = {
  _id: string;
  title: string;
  description?: string;
  category: GalleryCategory;
  price: number;
  slug: string;
  thumbnailUrl: string;
  previewUrl: string;
};
