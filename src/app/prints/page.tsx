import React from 'react';
import styles from './page.module.scss';
import Typography from '@/components/general/Typography/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

const PrintsPage = () => {
  return (
    <div className={styles.container}>
      <Typography variant="h2">prints</Typography>
      <div className={styles.cardBox}>
        <Link href={ROUTES.DIGITAL} className={styles.cardWrapper}>
          <div className={styles.imageWrapper}>
            <Image
              src="/gallery2.jpg"
              alt="Digital prints"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className={styles.image}
            />
            <Typography variant="h3" className={styles.overlayText}>
              digital prints
            </Typography>
          </div>
        </Link>
        <Link href={ROUTES.FRAME} className={styles.cardWrapper}>
          <div className={styles.imageWrapper}>
            <Image
              src="/gallery3.jpg"
              alt="Frame prints"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.image}
            />
            <Typography variant="h3" className={styles.overlayText}>
              frame prints
            </Typography>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PrintsPage;
