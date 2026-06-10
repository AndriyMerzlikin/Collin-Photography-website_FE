'use client';

import styles from './page.module.scss';
import { ROUTES } from '@/constants/routes';
import BackLink from '@/components/general/BackLink/BackLink';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { GalleryItem } from '@/types/galleryTypes';

import { fetchGalleryItemById } from '@/api/galleryApi';

import PhotoUploadForm from '@/components/PhotoUploadForm/PhotoUploadForm';

const EditPhotoPage = () => {
  const params = useParams();

  const id = params?.id as string;

  const [item, setItem] = useState<GalleryItem | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const data = await fetchGalleryItemById(id);

        setItem(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      void loadItem();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!item) {
    return <p>Photo not found</p>;
  }

  return (
    <div className={styles.container}>
      <BackLink href={ROUTES.ADMIN} title="Back to Admin panel" />

      <div className={styles.contentBox}>
        <PhotoUploadForm
          mode="edit"
          photoId={item._id}
          initialData={{
            title: item.title,
            description: item.description ?? '',
            category: item.category,
            price: item.price,
            previewUrl: item.previewUrl,
          }}
        />
      </div>
    </div>
  );
};

export default EditPhotoPage;
