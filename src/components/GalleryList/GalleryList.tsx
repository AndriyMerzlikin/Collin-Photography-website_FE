'use client';

import React, { useEffect, useState } from 'react';
import styles from './GalleryList.module.scss';
import { PhotoProvider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import {
  GalleryCategoryAll,
  GalleryItem as GalleryItemType,
} from '@/types/galleryTypes';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import GalleryItem from '@/components/GalleryItem/GalleryItem';
import toast from 'react-hot-toast';
import { deletePhoto, fetchAllGalleryItems } from '@/api/galleryApi';

type Props = {
  category: GalleryCategoryAll;
};

const GalleryList = ({ category }: Props) => {
  const [galleryList, setGalleryList] = useState<GalleryItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = await fetchAllGalleryItems();

        setGalleryList(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deletePhoto(id);

      setGalleryList((prev) => prev.filter((item) => item._id !== id));

      toast.success('Photo removed successfully!', {
        icon: '✅',
      });
    } catch (error) {
      console.error(error);

      toast.error('Error removing photo!');
    }
  };

  let filteredList =
    category === 'all'
      ? galleryList
      : galleryList.filter((item) => item.category === category);

  if (pathname === ROUTES.HOME || pathname === '/') {
    filteredList = filteredList.slice(0, 10);
  }

  if (loading) return <p>Loading gallery...</p>;

  return (
    <PhotoProvider>
      <ul className={styles.container}>
        {filteredList.map((item) => (
          <GalleryItem key={item._id} item={item} onDelete={handleDelete} />
        ))}
      </ul>
    </PhotoProvider>
  );
};

export default GalleryList;
