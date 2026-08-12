import Image from 'next/image';
import styles from './AboutUs.module.css';

export default function AboutUs() {
  return (
    <section className={styles.aboutUs}>
      <div className="container">
        <div className={styles.topContainer}>
          <div className={styles.textBlock}>
            <h2 className={styles.aboutUsTitle}>About us</h2>
            <p className={styles.aboutUsDescription}>
              Harmoniq is a mindful publishing platform dedicated to mental health and well-being.
              We bring together writers, thinkers, and readers who believe that open, thoughtful
              stories can heal, inspire, and connect. Whether you&apos;re here to share your journey
              or learn from others — this is your space to slow down, reflect, and grow.
            </p>
          </div>

          <div className={styles.lotosFlower}>
            <Image
              src="/images/blooming-lotus.webp"
              alt="Blooming Lotus"
              fill
              className={styles.aboutUsImage}
            />
          </div>
        </div>

        <div className={styles.bottomContainer}>
          <div className={styles.friendsHugging}>
            <Image
              src="/images/friends-hugging-in-the-field.webp"
              alt="Friends Hugging in the Field"
              fill
              className={styles.aboutUsImage}
            />
          </div>

          <div className={styles.meditatingPerson}>
            <Image
              src="/images/meditating-person.webp"
              alt="Meditation"
              fill
              className={styles.aboutUsImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
