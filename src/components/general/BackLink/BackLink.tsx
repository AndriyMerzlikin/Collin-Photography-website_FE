'use client';

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./BackLink.module.scss";

type BackLinkProps = {
    href: string;
    title: string;
}

const BackLink = ({ href, title }: BackLinkProps) => {
    return (
        <Link href={href} className={styles.backLink}>
            <FaArrowLeft/>
            {title}
        </Link>
    );
};

export default BackLink;
