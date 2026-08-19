import css from './Hero.module.css';
import RegisterButton from './RegisterButton/RegisterButton';

const Hero = () => {
  return (
    <section className={css.heroSection}>
      <div className="container">
        <div className={css.heroContainer}>
          <div
            className={css.imageWrapper}
            aria-hidden="true"
          />
        </div>
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

            <RegisterButton className={css.btnSecondary} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
