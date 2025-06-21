'use client'

import React from 'react';
import Link from 'next/link';
import Typography from "@/components/general/Typography/Typography";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import styles from './BurgerMenu.module.scss';

interface BurgerMenuProps {
    isOpen: boolean;
    onClose: () => void;
    links: { href: string; label: string }[];
}

const BurgerMenu = ({ isOpen, onClose, links }: BurgerMenuProps) => {
    const pathname = usePathname();

    return (
        <>
            <div
                className={clsx(styles.overlay, { [styles.open]: isOpen })}
                onClick={onClose}
            />
            <nav className={clsx(styles.mobileMenu, { [styles.open]: isOpen })}>
                {links.map(({ href, label }) => (
                    <Link
                        key={label}
                        href={href}
                        className={clsx(styles.navItem, {
                            [styles.active]: pathname === href,
                        })}
                        onClick={onClose}
                    >
                        <Typography variant='body-large'>{label}</Typography>
                    </Link>
                ))}
            </nav>
        </>
    );
};

export default BurgerMenu;
