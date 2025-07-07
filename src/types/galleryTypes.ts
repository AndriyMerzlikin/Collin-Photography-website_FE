export type GalleryCategory = 'birds' | 'animals' | 'nature';

export type GalleryCategoryAll = GalleryCategory | 'all';

export type GalleryItem = {
    _id: number;
    title: string;
    description: string;
    category: GalleryCategory;
    digitalImage: boolean;
    frameImage: boolean;
    price: number;
    originalImageUrl: string;
    previewImageUrl: string;
};