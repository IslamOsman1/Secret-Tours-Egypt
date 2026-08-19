import { useEffect, useState } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe2, Phone, ChevronDown, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { languages } from '../i18n';
import useSiteSettings from '../hooks/useSiteSettings';
import { SETTINGS_UPDATED_EVENT, TOURS_UPDATED_EVENT } from '../api';

function applyGoogleTranslation(code) {
  const combo = document.querySelector('.goog-te-combo');
  if (!combo) return false;

  if (combo.value !== code) {
    combo.value = code;
    combo.dispatchEvent(new Event('change'));
  }

  return true;
}

function syncGoogleTranslateCookie(code) {
  const value = `/auto/${code}`;
  document.cookie = `googtrans=${value};path=/`;
  document.cookie = `googtrans=${value};path=/;domain=${window.location.hostname}`;
}

function ensureGoogleTranslate() {
  if (window.google?.translate?.TranslateElement || document.querySelector('script[data-google-translate="true"]')) {
    return;
  }

  window.googleTranslateElementInit = () => {
    if (!window.google?.translate?.TranslateElement) return;

    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        autoDisplay: false,
        includedLanguages: languages.map(([code]) => code).join(','),
      },
      'google_translate_element'
    );
  };

  const script = document.createElement('script');
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  script.dataset.googleTranslate = 'true';
  document.body.appendChild(script);
}

function scheduleTranslationRefresh(code) {
  if (code === 'en') {
    window.setTimeout(() => applyGoogleTranslation('en'), 250);
    return () => {};
  }

  const delays = [350, 1200, 2400];
  const timers = delays.map(delay =>
    window.setTimeout(() => {
      if (!applyGoogleTranslation(code)) {
        window.setTimeout(() => applyGoogleTranslation(code), 900);
      }
    }, delay)
  );

  return () => timers.forEach(timer => window.clearTimeout(timer));
}

function Header() {
  const { t, i18n } = useTranslation();
  const settings = useSiteSettings();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const changeLang = code => {
    i18n.changeLanguage(code);
    localStorage.setItem('ste_lang', code);
    syncGoogleTranslateCookie(code);
    setLangOpen(false);
  };

  useEffect(() => {
    if (!localStorage.getItem('ste_lang')) {
      localStorage.setItem('ste_lang', 'en');
    }
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    syncGoogleTranslateCookie(i18n.language || 'en');
    ensureGoogleTranslate();
  }, [i18n.language]);

  const nav = [
    ['/', t('nav.home')],
    ['/tours', t('nav.tours')],
    ['/category/nile-cruises', t('nav.cruises')],
    ['/category/day-trips', t('nav.dayTrips')],
    ['/destinations', t('nav.destinations')],
    ['/blog', t('nav.blog')],
    ['/about', t('nav.about')],
  ];

  return <>
    <div className="topbar">
      <div className="container topbar-inner">
        <span>{settings.companyName}, crafted personally for you</span>
        <span><Phone size={14}/> {settings.whatsapp} &nbsp; • &nbsp; 24/7 Local Support</span>
      </div>
    </div>
    <header className="header">
      <div className="container nav-wrap">
        <Link className="brand" to="/"><img src="/logo.png" alt={settings.companyName}/></Link>
        <nav className={`nav ${open ? 'open' : ''}`}>
          {nav.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}
          <Link className="mobile-tailor" to="/tailor-made">{t('nav.tailor')}</Link>
        </nav>
        <div className="nav-actions">
          <div className="lang-switch notranslate" translate="no">
            <button className="notranslate" translate="no" onClick={() => setLangOpen(value => !value)}>
              <Globe2 size={18}/>
              <span className="notranslate" translate="no">{i18n.language.toUpperCase()}</span>
              <ChevronDown size={14}/>
            </button>
            {langOpen && <div className="lang-menu notranslate" translate="no">
              {languages.map(([code, name, flag]) => <button className="notranslate" translate="no" key={code} onClick={() => changeLang(code)}>
                <span className="notranslate" translate="no">{flag}</span>
                <span className="notranslate" translate="no">{name}</span>
              </button>)}
            </div>}
          </div>
          <Link className="btn btn-primary desktop-tailor" to="/tailor-made">{t('nav.tailor')}</Link>
          <button className="menu-btn" onClick={() => setOpen(value => !value)}>{open ? <X/> : <Menu/>}</button>
        </div>
      </div>
    </header>
  </>;
}

function Footer() {
  const settings = useSiteSettings();
  const map = settings.footerMap;

  return <footer className="footer">
    <div className="container footer-grid">
      <div className="footer-brand">
        <img src="/logo.png" alt={settings.companyName}/>
        <p>{settings.footerDescription}</p>
        <div className="socials"><a href="#"><Instagram/></a><a href="#"><Facebook/></a><a href="#"><Youtube/></a></div>
      </div>
      <div><h4>Explore</h4><Link to="/tours">Tour Packages</Link><Link to="/category/nile-cruises">Nile Cruises</Link><Link to="/category/day-trips">Day Trips</Link><Link to="/tailor-made">Tailor-Made</Link></div>
      <div><h4>Company</h4><Link to="/about">About Us</Link><Link to="/blog">Travel Guide</Link><Link to="/contact">Contact</Link><a href="#">Privacy Policy</a></div>
      <div><h4>Contact</h4><p>{settings.officeLocation}</p><p>{settings.whatsapp}</p><p>{settings.publicEmail}</p><Link className="footer-whatsapp" to="/contact"><MessageCircle size={18}/> WhatsApp us</Link></div>
    </div>
    {map.enabled && map.embedUrl && <div className="container footer-map-wrap"><div className="footer-map-card"><div className="footer-map-head"><h4>{map.title}</h4><p>{settings.officeLocation}</p></div><iframe title={map.title} src={map.embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/></div></div>}
    <div className="container footer-bottom"><span>© 2026 {settings.companyName}. All rights reserved.</span><span>Designed for unforgettable Egypt journeys.</span></div>
  </footer>;
}

export default function SiteLayout() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const settings = useSiteSettings();
  const wa = settings.whatsapp.replace(/\D/g, '') || import.meta.env.VITE_WHATSAPP_NUMBER || '201000000000';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  useEffect(() => {
    ensureGoogleTranslate();
    syncGoogleTranslateCookie(i18n.language || 'en');
    return scheduleTranslationRefresh(i18n.language || 'en');
  }, [i18n.language, location.pathname]);

  useEffect(() => {
    const refresh = () => {
      syncGoogleTranslateCookie(i18n.language || 'en');
      scheduleTranslationRefresh(i18n.language || 'en');
    };

    window.addEventListener(SETTINGS_UPDATED_EVENT, refresh);
    window.addEventListener(TOURS_UPDATED_EVENT, refresh);

    return () => {
      window.removeEventListener(SETTINGS_UPDATED_EVENT, refresh);
      window.removeEventListener(TOURS_UPDATED_EVENT, refresh);
    };
  }, [i18n.language]);

  return <div><div id="google_translate_element" hidden></div><Header/><main><Outlet/></main><Footer/><a className="wa-float" href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer"><MessageCircle/></a></div>;
}
