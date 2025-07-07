'use client';

import React, {useEffect, useState} from 'react';
import styles from './GalleryList.module.scss';
import Image from 'next/image';
import { FiZoomIn } from 'react-icons/fi';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import {
    GalleryCategoryAll,
    GalleryItem,
} from '@/types/galleryTypes';
import {BASE_URL} from "@/constants/urls";
import {ENDPOINT} from "@/constants/endpoints";

type Props = {
  category: GalleryCategoryAll;
};

const GalleryList = ({ category }: Props) => {
    const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${BASE_URL}${ENDPOINT.Get_All_Gallery}`);
                const data = await res.json();
                setGalleryList(data);
            } catch (err) {
                console.error('Error fetching gallery:', err);
            } finally {
                setLoading(false);
            }
        })();

    }, []);

  const filteredList: GalleryItem[] =
    category === 'all'
      ? galleryList
      : galleryList.filter((item) => item.category === category);

    if (loading) return <p>Loading gallery...</p>;
  return (
    <PhotoProvider>
      <ul className={styles.container}>
        {filteredList.map((item) => (
          <li key={item._id} className={styles.itemBox}>
            <PhotoView src={item.previewImageUrl}>
              <div className={styles.imageWrapper}>
                <Image
                  src={item.previewImageUrl}
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
