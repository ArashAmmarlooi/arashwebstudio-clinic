import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t } from '../i18n/translations';
import './Footer.css';

export function Footer() {
  const { lang } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-cta reveal">
        <p className="display footer-cta__title">{t('ctaTitle', lang)}</p>
        <Link to="/book" className="btn btn-primary">
          {t('heroCta', lang)} →
        </Link>
      </div>
      <div className="container footer-grid">
        <div>
          <p className="logo-footer">{t('brand', lang)}</p>
          <p className="footer-tagline">{t('footerTagline', lang)}</p>
        </div>
        <div className="footer-links">
          <Link to="/">{t('navHome', lang)}</Link>
          <Link to="/services">{t('navServices', lang)}</Link>
          <Link to="/team">{t('navTeam', lang)}</Link>
          <Link to="/book">{t('navBook', lang)}</Link>
          <Link to="/studio">{t('navStudio', lang)}</Link>
        </div>
        <div className="footer-social">
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="LinkedIn">IN</a>
          <a href="#" aria-label="Facebook">FB</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {year} {t('brand', lang)}. {t('footerRights', lang)}</span>
        <span>
          <a href="#">{t('privacy', lang)}</a> · <a href="#">{t('terms', lang)}</a>
        </span>
      </div>
    </footer>
  );
}
