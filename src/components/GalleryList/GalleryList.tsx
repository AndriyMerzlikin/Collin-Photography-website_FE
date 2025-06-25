import React from 'react';
import styles from './GalleryList.module.scss';
import Image from 'next/image';
import { FiZoomIn } from 'react-icons/fi';

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
    <ul className={styles.container}>
      {galleryList.map((item, index) => (
        <li key={index} className={styles.itemBox}>
          <Image
            src={`/${item}`}
            alt={`Gallery image ${index + 1}`}
            className={styles.image}
            width={500}
            height={500}
          />
          <FiZoomIn className={styles.iconOverlay} size={50} />
        </li>
      ))}
    </ul>
  );
};

export default GalleryList;
