'use client';

import React, { useState } from 'react';
import styles from './page.module.scss';
import GalleryList from '@/components/GalleryList/GalleryList';
import Typography from '@/components/general/Typography/Typography';
import CategorySelect from '@/components/CategorySelect/CategorySelect';
import { GalleryCategoryAll } from '@/types/galleryTypes';

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategoryAll>('all');

  return (
    <div className={styles.container}>
      <Typography variant="h1">My Portfolio</Typography>
      <div className={styles.selectWrapper}>
        <CategorySelect
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>
      <GalleryList category={selectedCategory} />
    </div>
  );
};

export default PortfolioPage;
