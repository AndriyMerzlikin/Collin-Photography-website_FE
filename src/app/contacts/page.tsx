import React from 'react';
import styles from './page.module.scss';
import Typography from '@/components/general/Typography/Typography';
import { FiInstagram } from 'react-icons/fi';
import { PiTiktokLogo } from 'react-icons/pi';
import { FaYoutube } from 'react-icons/fa';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm/ContactForm';
import { SOCIAL_MEDIA } from '@/constants/socialMediaLinks';

const Contacts = () => {
  return (
    <div className={styles.container}>
      <section className={styles.titleContainer}>
        <Typography variant="h3">contact Collin</Typography>
        <Typography variant="body-large">
          We look forward to hear from you!
        </Typography>
        <Typography variant="body-large">Follow me on Social Media</Typography>
        <div className={styles.socialsBox}>
          <Link
            href={SOCIAL_MEDIA.INSTAGRAM}
            className={styles.socialButton}
            title="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiInstagram size={35} />
          </Link>
          <Link
            href={SOCIAL_MEDIA.TIK_TOK}
            className={styles.socialButton}
            title="Tiktok"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PiTiktokLogo size={35} />
          </Link>
          <Link
            href={SOCIAL_MEDIA.YOUTUBE}
            className={styles.socialButton}
            title="YouTube"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube size={35} />
          </Link>
        </div>
      </section>

      <section className={styles.contactsContainer}>
        <div className={styles.formBox}>
          <ContactForm />
        </div>
        <div className={styles.infoBox}>
          <Typography variant="h4" className={styles.infoTitle}>
            info
          </Typography>
          <Typography variant="h4" className={styles.infoSubtitle}>
            Contact Collin
          </Typography>
          <Typography variant="body-large" className={styles.infoText}>
            Interested in working with <span>Collin</span>, the 16-year-old
            wildlife photographer? Whether you’re an agency looking to showcase
            fresh talent or you’d like to feature his work in your project,
            reach out to him by the email.
          </Typography>
          <Typography variant="h4" className={styles.infoTitle}>
            email
          </Typography>

          <Link
            href={`mailto:${SOCIAL_MEDIA.EMAIL}`}
            className={styles.emailLink}
          >
            <Typography variant="body-medium">{SOCIAL_MEDIA.EMAIL}</Typography>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
