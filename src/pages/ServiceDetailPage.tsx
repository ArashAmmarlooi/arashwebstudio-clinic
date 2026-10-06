import { Link, useParams } from 'react-router-dom';
import { BrandedImage } from '../components/BrandedImage';
import { useApp } from '../context/AppContext';
import { images, services, type ServiceSlug } from '../data/site';
import { t, getServiceCopy } from '../i18n/translations';
import { useGsapReveal } from '../hooks/useGsapReveal';
import './ServiceDetailPage.css';

const imageBySlug: Record<ServiceSlug, string> = {
  'primary-care': images.consultation,
  physiotherapy: images.physio,
  dermatology: images.derma,
  'womens-health': images.wellness,
};

export function ServiceDetailPage() {
  const { slug } = useParams();
  const { lang } = useApp();
  const valid = services.find((s) => s.slug === slug);
  const copy = getServiceCopy(slug ?? 'physiotherapy', lang);
  useGsapReveal('.reveal', [lang, slug]);

  if (!valid) {
    return (
      <div className="container section-pad">
        <p>Service not found.</p>
        <Link to="/services">{t('servicesExplore', lang)}</Link>
      </div>
    );
  }

  return (
    <article className="section-pad">
      <div className="container detail-hero">
        <div className="reveal">
          <p className="eyebrow">
            {t('navServices', lang)} / {copy.title}
          </p>
          <h1 className="display">{copy.title}</h1>
          <p className="lead">{copy.long}</p>
          <Link to="/book" className="btn btn-primary">
            {t('heroCta', lang)} →
          </Link>
        </div>
        <BrandedImage
          src={imageBySlug[valid.slug]}
          alt=""
          className="detail-hero__img reveal"
        />
      </div>

      <div className="container steps reveal">
        <h2 className="section-title">
          {lang === 'fr' ? 'Notre approche' : 'Our approach'}
        </h2>
        <div className="steps__row">
          {copy.process.map((step, i) => (
            <div key={step} className="steps__item card">
              <span className="steps__num">0{i + 1}</span>
              <h3>{step}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="container faq-split">
        <BrandedImage src={images.treatment} alt="" className="faq-split__img reveal" />
        <div className="reveal">
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title">
            {lang === 'fr' ? 'Vos questions, nos réponses.' : 'Your questions, answered.'}
          </h2>
          <details open>
            <summary>
              {lang === 'fr' ? 'Combien dure une consultation?' : 'How long is a visit?'}
            </summary>
            <p>
              {lang === 'fr'
                ? 'La plupart des visites durent entre 30 et 45 minutes.'
                : 'Most visits are 30–45 minutes depending on the service.'}
            </p>
          </details>
          <details>
            <summary>
              {lang === 'fr' ? 'Acceptez-vous les nouveaux patients?' : 'Are you accepting new patients?'}
            </summary>
            <p>
              {lang === 'fr'
                ? 'Oui — réservez en ligne ou contactez notre équipe.'
                : 'Yes — book online or contact our care team.'}
            </p>
          </details>
        </div>
      </div>
    </article>
  );
}
