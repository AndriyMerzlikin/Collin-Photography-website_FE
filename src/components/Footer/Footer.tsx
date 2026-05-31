'use client';

import React from 'react';
import styles from './Footer.module.scss';
import Typography from '@/components/general/Typography/Typography';
import { FiInstagram } from 'react-icons/fi';
import { PiTiktokLogo } from 'react-icons/pi';
import { FaYoutube } from 'react-icons/fa';
import Link from 'next/link';
import Logo from '@/components/general/Logo/Logo';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { SOCIAL_MEDIA } from '@/constants/socialMediaLinks';

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
                {SOCIAL_MEDIA.EMAIL}
              </Typography>
              <div className={styles.socialsBox}>
                <Link
                  href={SOCIAL_MEDIA.INSTAGRAM}
                  className={styles.socialButton}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiInstagram size={25} />
                </Link>
                <Link
                  href={SOCIAL_MEDIA.TIK_TOK}
                  className={styles.socialButton}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PiTiktokLogo size={25} />
                </Link>
                <Link
                  href={SOCIAL_MEDIA.YOUTUBE}
                  className={styles.socialButton}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube size={25} />
                </Link>
              </div>
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
                At just 16 years old,{' '}
                <span className={styles.descriptionSpan}>Collin</span> is a
                rising wildlife photographer with a deep love for the outdoors.
                With only one year of experience, he captures breathtaking
                moments in nature, from majestic wildlife to serene landscapes.
                Now, you can support his journey by purchasing his very first
                nature photography calendar! Featuring his best shots, this
                calendar brings the beauty of the natural world to your home.
                Every purchase helps{' '}
                <span className={styles.descriptionSpan}>Collin</span> continue
                exploring, learning, and sharing his passion for nature through
                his lens.
              </Typography>
            </div>
            <div className={styles.rulesBox}>
              <Link href={ROUTES.IMPRESSUM}>
                <Typography>Impressum</Typography>
              </Link>
              <hr />
              <Link href={ROUTES.DATENSCHUTZ}>
                <Typography>Datenschutzerklärung</Typography>
              </Link>
              <hr />
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
