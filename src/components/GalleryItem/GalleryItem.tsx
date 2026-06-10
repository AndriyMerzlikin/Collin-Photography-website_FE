'use client';

import React from 'react';
import Image from 'next/image';
import { FiZoomIn } from 'react-icons/fi';
import { PhotoView } from 'react-photo-view';
import { GalleryItem as GalleryItemType } from '@/types/galleryTypes';
import styles from './GalleryItem.module.scss';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
  item: GalleryItemType;
  onDelete?: (id: string) => void;
};

const GalleryItem = ({ item, onDelete }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const isAdmin = pathname.startsWith('/admin');

  const handleEdit = () => {
    router.push(`/admin/${item._id}`);
  };

  return (
    <li className={styles.itemBox}>
      <PhotoView src={item.previewUrl}>
        <div className={styles.imageWrapper}>
          <Image
            src={item.thumbnailUrl}
            alt={item.title}
            className={styles.image}
            width={500}
            height={500}
            priority
          />

          <FiZoomIn className={styles.iconOverlay} size={50} />
        </div>
      </PhotoView>

      {isAdmin && (
        <div className={styles.buttonBox}>
          <button
            className={styles.deleteButton}
            onClick={() => onDelete?.(item._id)}
          >
            Delete
          </button>
          <button className={styles.editButton} onClick={handleEdit}>
            Edit
          </button>
        </div>
      )}
    </li>
  );
};

export default GalleryItem;
