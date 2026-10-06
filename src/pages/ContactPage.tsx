import { BrandedImage } from '../components/BrandedImage';
import { useApp } from '../context/AppContext';
import { images, mockContact } from '../data/site';
import { t } from '../i18n/translations';
import { useGsapReveal } from '../hooks/useGsapReveal';
import './ContactPage.css';

export function ContactPage() {
  const { lang } = useApp();
  useGsapReveal('.reveal', [lang]);

  return (
    <section className="contact section-pad">
      <div className="container contact__grid">
        <div className="reveal">
          <h1 className="display">{t('contactTitle', lang)}</h1>
          <p className="lead">{t('contactLead', lang)}</p>
          <p className="contact-demo-note">{mockContact.demoNote[lang]}</p>
          <div className="contact-cards">
            <div className="card contact-card">
              <h2>{t('callUs', lang)}</h2>
              <span className="contact-mock-value">{mockContact.phone}</span>
              <p>{lang === 'fr' ? 'Lun–ven, 8h–18h' : 'Mon–Fri, 8am–6pm'}</p>
            </div>
            <div className="card contact-card">
              <h2>{t('emailUs', lang)}</h2>
              <span className="contact-mock-value">{mockContact.email}</span>
              <p>{lang === 'fr' ? 'Réponse sous 24 h' : 'Reply within 24 hours'}</p>
            </div>
          </div>
          <div className="card contact-card contact-card--address">
            <h2>{lang === 'fr' ? 'Adresse' : 'Address'}</h2>
            <p className="contact-mock-value">{mockContact.address[lang]}</p>
          </div>
        </div>
        <BrandedImage src={images.lobby} alt="" className="contact__img reveal" />
      </div>
    </section>
  );
}
