import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { BrandedImage } from '../components/BrandedImage';
import { useApp } from '../context/AppContext';
import { images, services } from '../data/site';
import { t, getServiceCopy } from '../i18n/translations';
import { useGsapReveal, useParallax } from '../hooks/useGsapReveal';
import './HomePage.css';

export function HomePage() {
  const { lang } = useApp();
  const heroImgRef = useRef<HTMLDivElement>(null);
  useParallax(heroImgRef, 60);
  useGsapReveal('.reveal', [lang]);

  const tickers = [
    t('ticker1', lang),
    t('ticker2', lang),
    t('ticker3', lang),
    t('ticker4', lang),
    t('ticker5', lang),
    t('ticker6', lang),
  ];

  return (
    <>
      <section className="hero section-pad">
        <div className="container hero__grid">
          <div className="hero__copy reveal">
            <p className="eyebrow eyebrow-line">{t('heroEyebrow', lang)}</p>
            <h1 className="display">{t('heroTitle', lang)}</h1>
            <p className="lead">{t('heroLead', lang)}</p>
            <Link to="/book" className="btn btn-primary">
              {t('heroCta', lang)} →
            </Link>
            <ul className="hero-features">
              <li>{t('heroFeature1', lang)}</li>
              <li>{t('heroFeature2', lang)}</li>
              <li>{t('heroFeature3', lang)}</li>
            </ul>
          </div>
          <div className="hero__visual reveal" ref={heroImgRef}>
            <BrandedImage src={images.hero} alt="" className="hero__image" />
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden>
        <div className="ticker__track">
          {[...tickers, ...tickers].map((item, i) => (
            <span key={`${item}-${i}`}>{item}</span>
          ))}
        </div>
      </div>

      <section className="section-pad">
        <div className="container services-intro">
          <div className="reveal">
            <p className="eyebrow">{t('servicesEyebrow', lang)}</p>
            <h2 className="section-title">{t('servicesTitle', lang)}</h2>
          </div>
          <p className="lead reveal">
            <Link to="/services">{t('servicesExplore', lang)} →</Link>
          </p>
        </div>
        <div className="container service-cards">
          {services.slice(0, 3).map((s) => {
            const copy = getServiceCopy(s.slug, lang);
            return (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="service-card reveal card"
              >
                <BrandedImage src={s.image} alt="" className="service-card__img" />
                <div className="service-card__body">
                  <span className="service-card__icon">{s.icon}</span>
                  <h3>{copy.title}</h3>
                  <p>{copy.short}</p>
                  <span className="service-card__arrow">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="approach section-pad">
        <div className="approach__curve" aria-hidden />
        <div className="container approach__grid">
          <div className="reveal">
            <p className="eyebrow eyebrow-line">{t('approachEyebrow', lang)}</p>
            <h2 className="section-title">{t('approachTitle', lang)}</h2>
            <p className="lead approach__lead">{t('approachLead', lang)}</p>
            <Link to="/team" className="btn btn-ghost">
              {t('approachCta', lang)} →
            </Link>
          </div>
          <div className="approach__portraits reveal">
            <BrandedImage src={images.doctorM} alt="" strong className="portrait portrait--a" />
            <BrandedImage src={images.doctorF} alt="" strong className="portrait portrait--b" />
          </div>
        </div>
      </section>
    </>
  );
}
