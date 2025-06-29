'use client';

import React from 'react';
import styles from './GalleryList.module.scss';
import Image from 'next/image';
import { FiZoomIn } from 'react-icons/fi';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const galleryList = [
  'gallery1.jpg',
  'gallery2.jpg',
  'gallery3.jpg',
  'gallery4.jpg',
  'gallery5.jpg',
  'gallery6.jpg',
  'gallery7.jpg',
  'gallery8.jpg',
  'gallery9.jpg',
  'gallery10.jpg',
];

const GalleryList = () => {
  return (
    <PhotoProvider>
      <ul className={styles.container}>
        {galleryList.map((item, index) => (
          <li key={index} className={styles.itemBox}>
            <PhotoView src={`/${item}`}>
              <div className={styles.imageWrapper}>
                <Image
                  src={`/${item}`}
                  alt={`Gallery image ${index + 1}`}
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
