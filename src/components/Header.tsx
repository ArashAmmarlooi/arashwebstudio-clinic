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
            <span
              className={`theme-toggle__sun ${theme === 'light' ? 'on' : ''}`}
              aria-hidden
            >
              <svg viewBox="0 0 24 24" fill="currentColor" role="img">
                <path
                  d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-16h1.5v3H12V2Zm0 17h1.5v3H12v-3ZM2 11h3v1.5H2V11Zm17 0h3v1.5h-3V11ZM4.22 4.22l2.12 2.12-1.06 1.06-2.12-2.12 1.06-1.06Zm13.32 13.32 2.12 2.12-1.06 1.06-2.12-2.12 1.06-1.06ZM19.78 4.22l-1.06 1.06-2.12-2.12 1.06-1.06 2.12 2.12ZM6.34 17.66l-1.06 1.06-2.12-2.12 1.06-1.06 2.12 2.12Z"
                />
              </svg>
            </span>
            <span
              className={`theme-toggle__moon ${theme === 'dark' ? 'on' : ''}`}
              aria-hidden
            >
              <svg viewBox="0 0 24 24" fill="currentColor" role="img">
                <path
                  d="M21 14.5A7.5 7.5 0 0 1 9.5 3 6 6 0 1 0 21 14.5Z"
                />
              </svg>
            </span>
          </button>
          <Link to="/book" className="btn btn-primary header-cta">
            {t('navBook', lang)} →
          </Link>
        </div>
      </div>
    </header>
  );
}
