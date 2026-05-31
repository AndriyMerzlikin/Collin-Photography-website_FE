import Typography from '@/components/general/Typography/Typography';
import React from 'react';
import styles from './page.module.scss';
import Image from 'next/image';

const About = () => {
  return (
    <div className={styles.aboutSection}>
      <Typography variant="h1" className={styles.heading}>
        About Me
      </Typography>
      <div className={styles.textRow}>
        <div className={styles.imageWrapper}>
          <Image
            src="/aboutMainImage2.jpg"
            alt="About Me Photo"
            width={400}
            height={400}
            sizes="(max-width: 550px) 200px, (max-width: 768px) 300px, 400px"
            className={styles.image}
            priority
          />
        </div>

        <Typography className={styles.textLeft}>
          I started my photography journey in August 2024. Based in Austria, I
          am lucky to be surrounded by beautiful nature and wildlife reserves,
          which are perfect for my work. My initial inspiration came from the
          photographer Robert Marc Lehmann. A few months after discovering his
          work, I found my mom's twenty-year-old camera lying around—and that
          was the exact moment I started taking pictures. I quickly developed a
          real passion for it, which led me to buy my first own camera just a
          few weeks later.
        </Typography>
      </div>
      <div className={styles.textRowReverse}>
        <div className={styles.imageWrapper}>
          <Image
            src="/about1.jpg"
            alt="About Me Photo"
            width={400}
            height={400}
            sizes="(max-width: 550px) 200px, (max-width: 768px) 300px, 400px"
            className={`${styles.image} ${styles.imageRight}`}
          />
        </div>
        <Typography className={styles.textRight}>
          Now, at 16 years old and almost two years into my journey, I dedicate
          a lot of my time to capturing wildlife. For me, photography provides a
          sense of freedom and allows me to be fully present in the moment. It’s
          a great outlet for my creativity, and I always strive to capture
          unique shots. I am really proud of my progress so far, and I’m always
          looking to grow. I’m excited to keep learning, improving, and seeing
          where this journey takes me.
        </Typography>
      </div>
    </div>
  );
};

export default About;
