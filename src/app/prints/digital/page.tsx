'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';
import { GalleryItem } from '@/types/galleryTypes';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { fetchAllGalleryItems } from '@/api/galleryApi';

const DigitalPage = () => {
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchAllGalleryItems();
        setGalleryList(data);
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading gallery...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        {galleryList.map((item) => (
          <Link
            href={`${ROUTES.DIGITAL}/${item._id}`}
            className={styles.card}
            key={item._id}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={item.previewImageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.image}
              />
            </div>
            <h3>{item.title}</h3>
            <p>${item.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DigitalPage;
