import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BrandedImage } from '../components/BrandedImage';
import { useApp } from '../context/AppContext';
import { images, services, type ServiceSlug } from '../data/site';
import { t, getServiceCopy } from '../i18n/translations';
import { useGsapReveal } from '../hooks/useGsapReveal';
import './ServicesPage.css';

const filters = ['all', 'medical', 'rehab', 'skin'] as const;

export function ServicesPage() {
  const { lang } = useApp();
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');
  useGsapReveal('.reveal', [lang, filter]);

  const filterLabels = {
    all: lang === 'fr' ? 'Tous les services' : 'All services',
    medical: lang === 'fr' ? 'Soins médicaux' : 'Medical care',
    rehab: lang === 'fr' ? 'Réadaptation' : 'Rehabilitation',
    skin: lang === 'fr' ? 'Santé de la peau' : 'Skin health',
  };

  const filtered = useMemo(() => {
    if (filter === 'all') return services;
    const map: Record<Exclude<(typeof filters)[number], 'all'>, ServiceSlug> = {
      medical: 'primary-care',
      rehab: 'physiotherapy',
      skin: 'dermatology',
    };
    const slug = map[filter];
    return services.filter((s) => s.slug === slug);
  }, [filter]);

  return (
    <>
      <section className="services-hero section-pad">
        <div className="container services-hero__grid">
          <div className="reveal">
            <p className="eyebrow eyebrow-line">{t('servicesEyebrow', lang)}</p>
            <h1 className="display">
              {lang === 'fr' ? 'De bons soins, à chaque étape.' : 'Good care, for every chapter.'}
            </h1>
            <p className="lead">
              {lang === 'fr'
                ? 'Des services complets pour votre corps, votre peau et votre bien-être.'
                : 'Comprehensive services for body, skin, and whole-person wellness.'}
            </p>
          </div>
          <div className="reveal">
            <BrandedImage src={images.servicesHero} alt="" className="services-hero__img" />
          </div>
        </div>
        <div className="container pill-filter reveal">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={filter === f ? 'active' : ''}
              onClick={() => setFilter(f)}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="container services-grid">
          {filtered.map((s) => {
            const copy = getServiceCopy(s.slug, lang);
            return (
              <Link key={s.slug} to={`/services/${s.slug}`} className="svc-tile reveal card">
                <BrandedImage src={s.image} alt="" className="svc-tile__img" />
                <div className="svc-tile__body">
                  <span>{s.icon}</span>
                  <h2>{copy.title}</h2>
                  <p>{copy.short}</p>
                  <span className="svc-tile__link">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="appoint-banner reveal">
        <BrandedImage src={images.mountains} alt="" className="appoint-banner__bg" strong />
        <div className="container appoint-banner__content">
          <p className="eyebrow">{lang === 'fr' ? 'Rendez-vous' : 'Appointments'}</p>
          <h2 className="section-title">
            {lang === 'fr' ? 'Trouvez les soins qu’il vous faut.' : 'Find the care you need.'}
          </h2>
          <Link to="/book" className="btn btn-primary">
            {t('navBook', lang)} →
          </Link>
        </div>
      </section>
    </>
  );
}
