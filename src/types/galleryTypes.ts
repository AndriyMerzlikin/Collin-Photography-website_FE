export type GalleryCategory = 'birds' | 'landscape' | 'mammals';

export type GalleryCategoryAll = GalleryCategory | 'all';

export type GalleryItem = {
  _id: string;
  title: string;
  description: string;
  category: GalleryCategory;
  digitalImage: boolean;
  frameImage: boolean;
  price: number;
  originalImageUrl: string;
  previewImageUrl: string;
};
