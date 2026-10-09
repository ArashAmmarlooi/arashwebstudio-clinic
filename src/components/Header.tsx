import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../i18n/translations';
import './Header.css';

export function Header() {
  const { lang, setLang, theme, toggleTheme } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = [
    { to: '/', label: t('navHome', lang) },
    { to: '/services', label: t('navServices', lang) },
    { to: '/team', label: t('navTeam', lang) },
    { to: '/contact', label: t('navContact', lang) },
  ];

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <span className="logo__mark" aria-hidden />
          <span>{t('brand', lang)}</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <nav className={`site-nav ${open ? 'open' : ''}`}>
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <div className="lang-switch" role="group" aria-label="Language">
            <button
              type="button"
              className={lang === 'en' ? 'active' : ''}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <span>|</span>
            <button
              type="button"
              className={lang === 'fr' ? 'active' : ''}
              onClick={() => setLang('fr')}
            >
              FR
            </button>
          </div>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className={theme === 'light' ? 'on' : ''} aria-hidden>☀</span>
            <span className={theme === 'dark' ? 'on' : ''} aria-hidden>🌙</span>
          </button>
          <Link to="/book" className="btn btn-primary header-cta">
            {t('navBook', lang)} →
          </Link>
        </div>
      </div>
    </header>
  );
}
