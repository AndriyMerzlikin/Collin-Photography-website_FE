'use client';

import { useEffect, useState } from 'react';
import { GalleryItem } from '@/types/galleryTypes';
import Image from 'next/image';
import styles from './page.module.scss';
import { fetchGalleryItemById } from '@/api/galleryApi';
import { useParams } from 'next/navigation';
import Typography from '@/components/general/Typography/Typography';
import { ROUTES } from '@/constants/routes';
import { useCart } from '@/context/cartContext';
import BackLink from '@/components/general/BackLink/BackLink';

const GalleryItemPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const { addToCart } = useCart();

  const [item, setItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const data = await fetchGalleryItemById(id);
        setItem(data);
      } catch (err) {
        setError('Failed to fetch item');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) void loadItem();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error || !item) return <p>Error loading item.</p>;

  return (
    <div className={styles.container}>
      <BackLink href={ROUTES.DIGITAL} title="Back to Gallery" />
      <div className={styles.contentBox}>
        <div className={styles.imageWrapper}>
          <Image
            src={item.previewImageUrl}
            alt={item.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
            className={styles.image}
          />
        </div>
        <div className={styles.textWrapper}>
          <Typography variant="h2" className={styles.title}>
            "{item.title}"
          </Typography>
          <Typography variant="body-large" className={styles.price}>
            <strong>Price:</strong> €{item.price.toFixed(2)}
          </Typography>
          <Typography className={styles.category}>
            <strong>Category:</strong> {item.category}
          </Typography>
          <Typography variant="body-large" className={styles.description}>
            {item.description}
          </Typography>
          <button
            className={styles.cartButton}
            onClick={() =>
              addToCart({
                _id: String(item._id),
                title: item.title,
                price: item.price,
                previewImageUrl: item.previewImageUrl,
                quantity: 1,
                type: "digital"
              })
            }
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryItemPage;
