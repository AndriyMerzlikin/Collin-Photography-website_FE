'use client';

import React, { useState } from 'react';
import styles from './Header.module.scss';
import Typography from '@/components/general/Typography/Typography';
import Link from 'next/link';
import { RiCameraLensLine } from 'react-icons/ri';
import { FiMenu } from 'react-icons/fi';
import { ROUTES } from '@/constants/routes';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const NAV_LINKS = [
  { href: ROUTES.HOME, label: 'Home' },
  { href: ROUTES.PRINTS, label: 'Prints' },
  { href: ROUTES.PORTFOLIO, label: 'Portfolio' },
  { href: ROUTES.ABOUT, label: 'About' },
  { href: ROUTES.CONTACTS, label: 'Contacts' },
  { href: ROUTES.CART, label: 'Cart' },
];

const Header = () => {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <Link href={ROUTES.HOME} className={styles.logoContainer}>
        <RiCameraLensLine size={80} />
        <div className={styles.logoTextBox}>
          <span className={styles.span1}>collin</span>
          <span className={styles.span2}>photography</span>
        </div>
      </Link>

      <nav
        className={clsx(styles.navList, { [styles.menuActive]: isMenuOpen })}
      >
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            onClick={handleMenuClose}
            className={clsx(styles.navItem, {
              [styles.active]: pathname === href,
            })}
          >
            <Typography variant="body-large">{label}</Typography>
          </Link>
        ))}
      </nav>

      {isMenuOpen ? (
        <div className={styles.overlay} onClick={handleToggleMenu} />
      ) : null}

      <button onClick={handleToggleMenu} className={styles.menuButton}>
        <FiMenu size={30} />
      </button>
    </header>
  );
};

export default Header;
