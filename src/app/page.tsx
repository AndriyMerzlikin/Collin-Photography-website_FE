import styles from './page.module.scss';
import Typography from "@/components/general/Typography/Typography";
import clsx from "clsx";

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
            <section className={clsx(styles.sectionContentBox, styles.aboutContainer)}>
                <Typography variant='h3'>
                    young nature and wildlife photographer – Collin
                </Typography>
                <Typography variant='body-large'>
                    <span>Collin</span> began his photography journey in August 2024, inspired by renowned wildlife
                    photographer Robert Marc Lehmann. Living in Austria, he’s surrounded by rich nature and wildlife,
                    which quickly fueled his passion. After discovering his mother’s old camera, he started taking
                    photos and soon invested in his own gear. Nearly a year in, Collin continues to explore nature
                    reserves, capturing unique moments of wildlife. Photography has become a creative outlet and a way
                    for him to stay present, and he's excited to keep growing on this path.
                </Typography>
            </section>
            <section className={styles.sectionContentBox}>gallery</section>
            <section className={styles.sectionContentBox}>news</section>
        </div>
    )
}
