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
              src="/aboutMainImage.jpg"
              alt="About Me Photo"
              width={400}
              height={400}
              sizes="(max-width: 550px) 200px, (max-width: 768px) 300px, 400px"
              className={styles.image}
              priority
          />
        </div>

        <Typography className={styles.textLeft}>
          My Journey in Photography I started in August of 2024. I am currently
          based in Austria, and I am fortunate enough to be surrounded by plenty
          of nature and wildlife. Additionally, I am close to beautiful nature
          reserves where I can explore and capture the wonders of the natural
          world. My initial inspiration came from a photographer named Robert
          Marc Lehmann. A few months later, I discovered my mom's
          twenty-year-old camera lying around. It was that moment when I began
          taking pictures. I quickly developed a passion for photography,
          leading me to purchase my first camera just a few weeks later.
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
          Now, almost a year into my photography journey, I have dedicated a
          significant amount of time capturing the wildlife of Austria.
          Photography provides me a sense of freedom and allows me to be present
          in the moment. It is a powerful outlet for my creativity, as I strive
          to capture unique pictures and moments. I thoroughly enjoy learning
          new techniques and embracing the present. While I acknowledge that I
          am still a relatively new photographer, I am very pleased with my
          progress this far. I'm looking forward to continuing my photography
          journey and seeing what the future holds.
        </Typography>
      </div>
    </div>
  );
};

export default About;
