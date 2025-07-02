export type GalleryCategory = 'birds' | 'animals' | 'nature';

export type GalleryCategoryAll = GalleryCategory | 'all';

export type GalleryItem = {
  id: number;
  title: string;
  description: string;
  category: GalleryCategory;
  digitalImage: boolean;
  frameImage: boolean;
  price: number;
  image: string;
};

export const galleryList: GalleryItem[] = [
  {
    id: 1,
    title: 'Majestic Eagle',
    description: 'A soaring eagle captured in the wild.',
    category: 'birds',
    digitalImage: true,
    frameImage: false,
    price: 23.45,
    image: '/gallery1.jpg',
  },
  {
    id: 2,
    title: 'Calm Lake',
    description: 'A serene view of a mountain lake at sunrise.',
    category: 'nature',
    digitalImage: false,
    frameImage: true,
    price: 34.99,
    image: '/gallery2.jpg',
  },
  {
    id: 3,
    title: 'Playful Fox',
    description: 'A red fox playing in the snow.',
    category: 'animals',
    digitalImage: true,
    frameImage: true,
    price: 19.95,
    image: '/gallery3.jpg',
  },
  {
    id: 4,
    title: 'Tropical Parrot',
    description: 'A colorful parrot perched on a branch.',
    category: 'birds',
    digitalImage: false,
    frameImage: false,
    price: 12.75,
    image: '/gallery4.jpg',
  },
  {
    id: 5,
    title: 'Forest Path',
    description: 'A quiet path through a green forest.',
    category: 'nature',
    digitalImage: true,
    frameImage: true,
    price: 27.1,
    image: '/gallery5.jpg',
  },
  {
    id: 6,
    title: 'Sleeping Cat',
    description: 'A cat resting peacefully on a windowsill.',
    category: 'animals',
    digitalImage: true,
    frameImage: false,
    price: 15.0,
    image: '/gallery6.jpg',
  },
  {
    id: 7,
    title: 'Hawk in Flight',
    description: 'A hawk mid-flight scanning for prey.',
    category: 'birds',
    digitalImage: false,
    frameImage: true,
    price: 29.49,
    image: '/gallery7.jpg',
  },
  {
    id: 8,
    title: 'Mountain Range',
    description: 'Snow-covered peaks under a blue sky.',
    category: 'nature',
    digitalImage: true,
    frameImage: true,
    price: 38.25,
    image: '/gallery8.jpg',
  },
  {
    id: 9,
    title: 'Curious Deer',
    description: 'A deer looking into the camera from a forest edge.',
    category: 'animals',
    digitalImage: false,
    frameImage: false,
    price: 11.8,
    image: '/gallery9.jpg',
  },
  {
    id: 10,
    title: 'Seaside Sunset',
    description: 'Sunset over the ocean with warm colors.',
    category: 'nature',
    digitalImage: true,
    frameImage: false,
    price: 40.0,
    image: '/gallery10.jpg',
  },
];
