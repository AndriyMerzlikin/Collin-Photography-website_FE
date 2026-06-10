'use client';

import React, { useState } from 'react';
import styles from './page.module.scss';
import GalleryList from '@/components/GalleryList/GalleryList';
import Typography from '@/components/general/Typography/Typography';
import GenericSelect, {
  SelectOption,
} from '@/components/CategorySelect/GenericSelect';
import { GalleryCategoryAll } from '@/types/galleryTypes';

const categoryOptions: SelectOption<GalleryCategoryAll>[] = [
  { value: 'all', label: 'all categories' },
  { value: 'birds', label: 'birds' },
  { value: 'landscape', label: 'landscape' },
  { value: 'mammals', label: 'mammals' },
];

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategoryAll>('all');

  return (
    <div className={styles.container}>
      <Typography variant="h1">My Portfolio</Typography>

      <div className={styles.selectWrapper}>
        <GenericSelect
          value={selectedCategory}
          onChange={setSelectedCategory}
          options={categoryOptions}
        />
      </div>

      <GalleryList category={selectedCategory} />
    </div>
  );
};

export default PortfolioPage;
