'use client';

import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import Typography from '@/components/general/Typography/Typography';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';
import { ROUTES } from '@/constants/routes';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Logo from '@/components/general/Logo/Logo';
import { useCart } from '@/context/cartContext';

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
  const isHomePage = pathname === ROUTES.HOME;

  const { cart } = useCart();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={clsx(styles.header, {
        [styles.secondaryHeader]: !isHomePage || scrolled,
      })}
    >
      <Logo />

      <nav
        className={clsx(styles.navList, { [styles.menuActive]: isMenuOpen })}
      >
        {NAV_LINKS.map(({ href, label }) => {
          const isCart = label === 'Cart';
          return (
            <Link
              key={label}
              href={href}
              onClick={handleMenuClose}
              className={clsx(styles.navItem, {
                [styles.active]: pathname === href,
              })}
            >
              <Typography variant="body-large">
                {label}
                {isCart && cartItemCount > 0 && (
                  <span className={styles.cartBadge}>{cartItemCount}</span>
                )}
              </Typography>
            </Link>
          );
        })}
      </nav>

      {isMenuOpen ? (
        <div className={styles.overlay} onClick={handleToggleMenu} />
      ) : null}

      <button onClick={handleToggleMenu} className={styles.menuButton}>
        <FiMenu
          size={30}
          className={clsx(styles.svg, {
            [styles.secondarySvg]: !isHomePage || scrolled,
          })}
        />
      </button>
    </header>
  );
};

export default Header;
