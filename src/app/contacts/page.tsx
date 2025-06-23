import React from 'react';
import styles from './page.module.scss';
import Typography from '@/components/general/Typography/Typography';
import { FiInstagram } from 'react-icons/fi';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm/ContactForm';

const Contacts = () => {
  return (
    <div className={styles.container}>
      <section className={styles.titleContainer}>
        <Typography variant="h3">contact Collin</Typography>
        <Typography variant="body-large">
          We look forward to hear from you!
        </Typography>
        <Link
          href="https://www.instagram.com/collinruehrer?igsh=Mnc3aHNnOGc4ZWt4"
          className={styles.socialButton}
        >
          <FiInstagram size={35} />
        </Link>
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
            Interested in working with <span>Collin</span>, the 17-year-old
            nature and wildlife photographer? Whether you’re an agency looking
            to showcase fresh talent or you’d like to feature his work in your
            project, reach out to him by the email.
          </Typography>
          <Typography variant="h4" className={styles.infoTitle}>
            email
          </Typography>

          <Link
            href="mailto:collin.r.photography@gmail.com"
            className={styles.emailLink}
          >
            <Typography variant="body-large">
              collin.r.photography@gmail.com
            </Typography>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
