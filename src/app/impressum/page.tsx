import React from 'react';
import styles from './page.module.scss';
import Typography from '@/components/general/Typography/Typography';
import BackLink from '@/components/general/BackLink/BackLink';
import { ROUTES } from '@/constants/routes';

const Page = () => {
  return (
    <div className={styles.container}>
      <Typography variant="h2" className={styles.title}>
        Impressum
      </Typography>

      <div className={styles.infoContainer}>
        <BackLink href={ROUTES.HOME} title="Go Back"/>
        <Typography variant="h2" className={styles.title2}>
          Legal Notice (Impressum)
        </Typography>
        <Typography variant="h4" className={styles.subTitle}>
          Information according to § 24 and § 25 Austrian Media Act (MedienG) and § 5 E-Commerce Act (ECG):
        </Typography>
        <Typography variant="h4" className={styles.subTitle}>
          Platform Owner & Operator:
        </Typography>

        <section className={styles.sectionBox}>
          <ul className={styles.list}>
            <li>
              <Typography variant="body-large">Collin Rührer</Typography>
            </li>
            <li>
              <Typography variant="body-large">Wolfgang-Schmälzl-Gasse 5/23</Typography>
            </li>
            <li>
              <Typography variant="body-large">1020 Vienna</Typography>
            </li>
            <li>
              <Typography variant="body-large">Austria</Typography>
            </li>
          </ul>
        </section>

        <section className={styles.sectionBox}>
          <Typography variant="h4" className={styles.subTitle}>
            Contact Information:
          </Typography>
          <Typography variant="body-large">Email:</Typography>
          <a href="mailto:collin.photo.business@gmail.com" className={styles.link}>
            <Typography variant="body-large">collin.photo.business@gmail.com</Typography>
          </a>
        </section>

        <section className={styles.sectionBox}>
          <Typography variant="h4" className={styles.subTitle}>
            Business Object (Unternehmensgegenstand):
          </Typography>
          <Typography variant="body-large">Photography and Content Creation</Typography>
        </section>
      </div>
    </div>
  );
};

export default Page;
