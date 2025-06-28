import React from 'react';
import styles from './not-found.module.scss';

import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

const NotFoundPage = () => (
  <div className={styles.notFoundContainer}>
    <h1 className={styles.notFoundTitle}>404 - Page Not Found</h1>
    <p className={styles.notFoundMessage}>
      Sorry, the page you are looking for does not exist.
    </p>
    <Link href={ROUTES.HOME} className={styles.homeLink}>
      <p className={styles.homeLinkText}>Go to Home page</p>
    </Link>
  </div>
);

export default NotFoundPage;
