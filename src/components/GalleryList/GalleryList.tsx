'use client';

import React from 'react';
import styles from './GalleryList.module.scss';
import Image from 'next/image';
import { FiZoomIn } from 'react-icons/fi';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import {
  GalleryCategoryAll,
  GalleryItem,
  galleryList,
} from '@/constants/galleryList';

type Props = {
  category: GalleryCategoryAll;
};

const GalleryList = ({ category }: Props) => {
  const filteredList: GalleryItem[] =
    category === 'all'
      ? galleryList
      : galleryList.filter((item) => item.category === category);

  return (
    <PhotoProvider>
      <ul className={styles.container}>
        {filteredList.map((item) => (
          <li key={item.id} className={styles.itemBox}>
            <PhotoView src={item.image}>
              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.title}
                  className={styles.image}
                  width={500}
                  height={500}
                />
                <FiZoomIn className={styles.iconOverlay} size={50} />
              </div>
            </PhotoView>
          </li>
        ))}
      </ul>
    </PhotoProvider>
  );
};

export default GalleryList;
