import React from 'react';
import styles from './page.module.scss';
import Typography from '@/components/general/Typography/Typography';
import BackLink from '@/components/general/BackLink/BackLink';
import { ROUTES } from '@/constants/routes';

const Page = () => {
  return (
    <div className={styles.container}>
      <Typography variant="h2" className={styles.title}>
        Datenschutzerklärung
      </Typography>

      <div className={styles.infoContainer}>
        <BackLink href={ROUTES.HOME} title="Go Back" />
        <Typography variant="h2" className={styles.title2}>
          Datenschutzerklärung
        </Typography>
        <Typography variant="h3" className={styles.subTitle}>
          Inhaltsverzeichnis
        </Typography>
        <ul className={styles.list}>
          <li>
            <a href="#einleitung">
              <Typography>Einleitung und Überblick</Typography>
            </a>
          </li>
          <li>
            <a href="#anwendungsbereich">
              <Typography>Anwendungsbereich</Typography>
            </a>
          </li>
          <li>
            <a href="#rechtsgrundlagen">
              <Typography>Rechtsgrundlagen</Typography>
            </a>
          </li>
          <li>
            <a href="#kontaktdaten">
              <Typography>Kontaktdaten des Verantwortlichen</Typography>
            </a>
          </li>
          <li>
            <a href="#speicherdauer">
              <Typography>Speicherdauer</Typography>
            </a>
          </li>
          <li>
            <a href="#rechte">
              <Typography>Rechte laut Datenschutz-Grundverordnung</Typography>
            </a>
          </li>
          <li>
            <a href="#avv">
              <Typography>Auftragsverarbeitungsvertrag (AVV)</Typography>
            </a>
          </li>
          <li>
            <a href="#cookies">
              <Typography>Cookies</Typography>
            </a>
          </li>
          <li>
            <a href="#webhosting">
              <Typography>Webhosting Einleitung</Typography>
            </a>
          </li>
          <li>
            <a href="#baukastensysteme">
              <Typography>Website Baukastensysteme Einleitung</Typography>
            </a>
          </li>
          <li>
            <a href="#socialmedia">
              <Typography>Social Media Einleitung</Typography>
            </a>
          </li>
          <li>
            <a href="#begriffe">
              <Typography>Erklärung verwendeter Begriffe</Typography>
            </a>
          </li>
          <li>
            <a href="#schlusswort">
              <Typography>Schlusswort</Typography>
            </a>
          </li>
        </ul>
        <section id="einleitung">
          <Typography variant="h3" className={styles.subTitle}>
            einleitung
          </Typography>
        </section>
        <section id="anwendungsbereich">
          <Typography variant="h3" className={styles.subTitle}>
            1
          </Typography>
        </section>
        <section id="rechtsgrundlagen">
          <Typography variant="h3" className={styles.subTitle}>
            1
          </Typography>
        </section>
        <section id="kontaktdaten">
          <Typography variant="h3" className={styles.subTitle}>
            1
          </Typography>
        </section>
        <section id="speicherdauer">
          <Typography variant="h3" className={styles.subTitle}>
            1
          </Typography>
        </section>
        <section id="rechte">
          <Typography variant="h3" className={styles.subTitle}>
            1
          </Typography>
        </section>
        <section id="avv">
          <Typography variant="h3" className={styles.subTitle}>
            1
          </Typography>
        </section>
        <section id="cookies">
          <Typography variant="h3" className={styles.subTitle}>
            1
          </Typography>
        </section>
        <section id="webhosting">
          <Typography variant="h3" className={styles.subTitle}>
            1
          </Typography>
        </section>
        <section id="baukastensysteme">
          <Typography variant="h3" className={styles.subTitle}>
            1
          </Typography>
        </section>
        <section id="socialmedia">
          <Typography variant="h3" className={styles.subTitle}>
            1
          </Typography>
        </section>
        <section id="begriffe">
          <Typography variant="h3" className={styles.subTitle}>
            1
          </Typography>
        </section>
        <section id="schlusswort">
          <Typography variant="h3" className={styles.subTitle}>
            1
          </Typography>
        </section>
      </div>
    </div>
  );
};

export default Page;
