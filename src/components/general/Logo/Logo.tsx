import React from 'react';
import styles from './Logo.module.scss';
import { ROUTES } from '@/constants/routes';
import { RiCameraLensLine } from 'react-icons/ri';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href={ROUTES.HOME} className={styles.logoContainer}>
      <RiCameraLensLine size={80} />
      <div className={styles.logoTextBox}>
        <span className={styles.span1}>collin</span>
        <span className={styles.span2}>photography</span>
      </div>
    </Link>
  );
};

export default Logo;
