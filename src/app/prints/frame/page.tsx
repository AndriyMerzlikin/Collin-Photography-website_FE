'use client';

import React, { useState } from 'react';
import styles from './page.module.scss';
import Typography from '@/components/general/Typography/Typography';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import Image from 'next/image';
import { calendarsData } from '@/constants/calendarsData';
import { CalendarsDataItem } from '@/types/calendarsDataTypes';

const FramePage = () => {
  const [frameList, setFrameList] =
    useState<CalendarsDataItem[]>(calendarsData);

  return (
    <div className={styles.container}>
      <Typography variant="h1">Calendars</Typography>
      <div className={styles.listContainer}>
        {frameList.map((item) => (
          <Link
            href={`${ROUTES.FRAME}/${item._id}`}
            className={styles.card}
            key={item._id}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={item.imgUrl[0]}
                alt={item.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.image}
              />
            </div>
            <div className={styles.textContainer}>
              <Typography variant="h4">{item.title}</Typography>
              <Typography variant="body-large" className={styles.price}>
                €{item.price.toFixed(2)}
              </Typography>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FramePage;
