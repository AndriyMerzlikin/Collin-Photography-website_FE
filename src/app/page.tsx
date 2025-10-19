'use client';

import styles from './page.module.scss';
import Typography from '@/components/general/Typography/Typography';
import clsx from 'clsx';
import GalleryList from '@/components/GalleryList/GalleryList';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CalendarsDataItem } from '@/types/calendarsDataTypes';
import { calendarsData } from '@/constants/calendarsData';

export default function Home() {
  const [frameList, setFrameList] = useState<CalendarsDataItem[]>([]);

  useEffect(() => {
    setFrameList(calendarsData);
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <div className={styles.sectionContentBox}>
          <Typography variant="h1" className={styles.heroTitle}>
            <span>nature</span>
            <span>photography</span>
          </Typography>
          <h2 className={styles.heroSubTitle}>is my passion</h2>
          <p className={styles.heroText}>
            Young photographer, passionate about animals and nature
          </p>
        </div>
      </section>
      <section
        className={clsx(styles.sectionContentBox, styles.aboutContainer)}
      >
        <Typography variant="h3">
          young nature and wildlife photographer – Collin
        </Typography>
        <Typography variant="body-large">
          <span>Collin</span> began his photography journey in August 2024,
          inspired by renowned wildlife photographer Robert Marc Lehmann. Living
          in Austria, he’s surrounded by rich nature and wildlife, which quickly
          fueled his passion. After discovering his mother’s old camera, he
          started taking photos and soon invested in his own gear. Over a year
          in, Collin continues to explore nature reserves, capturing unique
          moments of wildlife. Photography has become a creative outlet and a
          way for him to stay present, and he's excited to keep growing on this
          path.
        </Typography>
      </section>
      <section
        className={clsx(styles.sectionContentBox, styles.galleryContainer)}
      >
        <Typography variant="h3">gallery</Typography>
        <GalleryList category="all" />
        <Link href={ROUTES.PORTFOLIO} className={styles.galleryButton}>
          more photos
        </Link>
      </section>

      <section className={clsx(styles.sectionContentBox, styles.newsContainer)}>
        <Typography variant="h3">news</Typography>
        {frameList.map((item) => (
          <div className={styles.calendarContainer} key={item._id}>
            <Link
              href={`${ROUTES.FRAME}/${item._id}`}
              className={styles.calendarBox}
            >
              <div className={styles.calendarImgWrapper}>
                <Image
                  src={item.imgUrl[0]}
                  alt={item.title}
                  width={300}
                  height={200}
                  priority
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.calendarImage}
                />
              </div>
              <Typography variant="h4">{item.title}</Typography>
            </Link>
            <Image
              src="/New.png"
              alt="new"
              width={150}
              height={150}
              className={styles.newImage}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
