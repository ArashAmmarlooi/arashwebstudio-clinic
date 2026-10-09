import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BrandedImage } from '../components/BrandedImage';
import { useApp } from '../context/AppContext';
import { images, team } from '../data/site';
import { t } from '../i18n/translations';
import { useGsapReveal } from '../hooks/useGsapReveal';
import './TeamPage.css';

const deptFilters = ['all', 'medical', 'physio', 'derma'] as const;

export function TeamPage() {
  const { lang } = useApp();
  const [dept, setDept] = useState<(typeof deptFilters)[number]>('all');
  useGsapReveal('.reveal', [lang]);

  const labels = {
    all: lang === 'fr' ? "Toute l'équipe" : 'All team',
    medical: lang === 'fr' ? 'Médecine' : 'Medicine',
    physio: lang === 'fr' ? 'Physiothérapie' : 'Physiotherapy',
    derma: lang === 'fr' ? 'Dermatologie' : 'Dermatology',
  };

  const filtered = useMemo(
    () => (dept === 'all' ? team : team.filter((m) => m.dept === dept)),
    [dept],
  );

  return (
    <>
      <section className="team-hero section-pad">
        <div className="container team-hero__inner reveal">
          <p className="eyebrow eyebrow-line">{t('navTeam', lang)}</p>
          <h1 className="display">
            {lang === 'fr' ? 'Des experts à votre écoute' : 'Experts listening to you'}
          </h1>
          <p className="lead">
            {lang === 'fr'
              ? 'Une équipe multidisciplinaire unie par la même mission : votre santé.'
              : 'A multidisciplinary team united by one mission — your health.'}
          </p>
        </div>
        <div className="container reveal">
          <BrandedImage src={images.teamHero} alt="" className="team-hero__img" />
        </div>
      </section>

      <div className="filter-bar-sticky">
        <div className="container pill-filter">
          {deptFilters.map((d) => (
            <button
              key={d}
              type="button"
              className={dept === d ? 'active' : ''}
              onClick={() => setDept(d)}
            >
              {labels[d]}
            </button>
          ))}
        </div>
      </div>

      <section className="section-pad team-grid-wrap">
        <div className="container team-grid" key={dept}>
          {filtered.map((member) => (
            <article key={member.id} className="team-card team-card--animate card">
              <BrandedImage src={member.image} alt="" className="team-card__photo" />
              <div className="team-card__body">
                <h2>{member.name[lang]}</h2>
                <p className="team-card__role">{member.role[lang]}</p>
                <Link to="/book">{lang === 'fr' ? 'Voir le profil' : 'View profile'} →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="team-cta section-pad">
        <div className="container team-cta__grid">
          <div className="reveal">
            <h2 className="section-title">
              {lang === 'fr'
                ? 'La confiance commence par une rencontre'
                : 'Trust begins with a meeting'}
            </h2>
            <p className="lead">
              {lang === 'fr'
                ? 'Réservez une consultation et découvrez un espace pensé pour votre confort.'
                : 'Book a consultation and experience a space designed for your comfort.'}
            </p>
            <Link to="/book" className="btn btn-primary">
              {t('navBook', lang)} →
            </Link>
          </div>
          <BrandedImage src={images.lobby} alt="" className="team-cta__img reveal" />
        </div>
      </section>
    </>
  );
}
