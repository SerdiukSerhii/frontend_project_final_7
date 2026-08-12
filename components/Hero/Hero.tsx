import Link from 'next/link';
import css from './Hero.module.css';

const Hero = () => {
  return (
    <section className={css.heroSection}>
      <div className="container">
        <div className={css.heroContainer}>
          <div
            className={css.imageWrapper}
            aria-hidden="true"
          />

          <div className={css.textContent}>
            <h1 className={css.title}>
              Find your <span className={css.harmony}>harmony</span> in community
            </h1>

            <div className={css.actions}>
              <a
                href="#popular-articles"
                className={css.btnPrimary}
              >
                Go to Articles
              </a>

              <Link
                href="/register"
                className={css.btnSecondary}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
