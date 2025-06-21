import React from 'react';
import styles from './not-found.module.scss';
import Typography from '@/components/general/Typography/Typography';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

const NotFoundPage = () => (
  <div className={styles.notFoundContainer}>
    <Typography variant="h1">404 - Page Not Found</Typography>
    <Typography>Sorry, the page you are looking for does not exist.</Typography>
    <Link href={ROUTES.HOME} className={styles.homeLink}>
      <Typography variant="body-large">Go to Home page</Typography>
    </Link>
  </div>
);

export default NotFoundPage;
