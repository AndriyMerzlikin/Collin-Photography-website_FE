'use client';

import React from 'react';
import styles from './Footer.module.scss';
import Typography from '@/components/general/Typography/Typography';
import { FiInstagram } from 'react-icons/fi';
import Link from 'next/link';
import Logo from '@/components/general/Logo/Logo';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

const Footer = () => {
  const pathname = usePathname();
  const isContactsPage = pathname === ROUTES.CONTACTS;

  return (
    <>
      {!isContactsPage ? (
        <div className={styles.container}>
          <div className={styles.infoBox}>
            <div className={styles.contactBox}>
              <Typography variant="body-large" className={styles.contactTitle}>
                contact me
              </Typography>
              <Typography className={styles.contactText}>Email:</Typography>
              <Typography className={styles.contactText}>
                collin.r.photography@gmail.com
              </Typography>
              <Link
                href="https://www.instagram.com/collinruehrer?igsh=Mnc3aHNnOGc4ZWt4"
                className={styles.socialButton}
              >
                <FiInstagram size={25} />
              </Link>
            </div>
            <div>
              <Typography
                variant="body-large"
                className={styles.descriptionTitle}
              >
                support young nature photographer
              </Typography>
              <Typography className={styles.descriptionSubtitle}>
                purchase his first calendar
              </Typography>
              <Typography className={styles.descriptionText}>
                At just 15 years old,{' '}
                <span className={styles.descriptionSpan}>Collin</span> is a
                rising nature and wildlife photographer with a deep love for the
                outdoors. With only one year of experience, he captures
                breathtaking moments in nature, from majestic wildlife to serene
                landscapes. Now, you can support his journey by purchasing his
                very first nature photography calendar! Featuring his best
                shots, this calendar brings the beauty of the natural world to
                your home. Every purchase helps{' '}
                <span className={styles.descriptionSpan}>Collin</span> continue
                exploring, learning, and sharing his passion for nature through
                his lens.
              </Typography>
            </div>
            <div className={styles.rulesBox}>
              <Link href={ROUTES.IMPRESSUM}>
                <Typography>Impressum</Typography>
              </Link>
              <hr/>
              <Link href={ROUTES.DATENSCHUTZ}>
                <Typography>Datenschutzerklärung</Typography>
              </Link>
              <hr/>
              <Link href={ROUTES.AGB}>
                <Typography>AGB</Typography>
              </Link>
            </div>
          </div>
          <div className={styles.signBox}>
            <Logo />
            <Typography variant="body-small">
              Copyright © 2025 - CollinPhotography
            </Typography>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Footer;
