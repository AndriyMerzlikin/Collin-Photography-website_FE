import { GalleryCategory } from '@/types/galleryTypes';

export type PhotoFormData = {
  title: string;
  description: string;
  category: GalleryCategory;
  price: number;
  file?: File;
};

export type PhotoFormInitialData = PhotoFormData & {
  previewUrl?: string;
};
