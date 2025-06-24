import styles from './page.module.scss';
import Typography from "@/components/general/Typography/Typography";

export default function Home() {
    return (
        <div className={styles.container}>
            <section className={styles.heroSection}>
                <div className={styles.sectionContentBox}>
                    <Typography variant='h1' className={styles.heroTitle}>
                        <span>nature</span>
                        <span>photography</span>
                    </Typography>
                    <h2 className={styles.heroSubTitle}>is my passion</h2>
                    <p className={styles.heroText}>Young photographer, passionate about animals and plants</p>
                </div>
            </section>
            <section className={styles.sectionContentBox}>about</section>
            <section className={styles.sectionContentBox}>gallery</section>
            <section className={styles.sectionContentBox}>news</section>
        </div>
    )
}
