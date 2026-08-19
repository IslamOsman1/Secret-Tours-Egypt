import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Headphones, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import TourCard from '../components/TourCard';
import SectionHead from '../components/SectionHead';
import { api, getStoredTours, TOURS_UPDATED_EVENT } from '../api';
import useSiteSettings from '../hooks/useSiteSettings';
import { categories } from '../data/demo';

function getCountdownParts(endDate) {
  if (!endDate) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  const diff = new Date(endDate).getTime() - Date.now();
  if (Number.isNaN(diff) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    expired: false,
  };
}

export default function Home() {
  const { t } = useTranslation();
  const settings = useSiteSettings();
  const home = settings.home;
  const [tours, setTours] = useState(() => getStoredTours());
  const [countdown, setCountdown] = useState(() => getCountdownParts(settings.countdown.endDate));
  const homeTours = tours.slice(0, 6);
  const countdownTours = useMemo(() => {
    const selectedIds = settings.countdown.selectedTourIds || [];
    return selectedIds.map(id => tours.find(tour => tour._id === id)).filter(Boolean);
  }, [settings.countdown.selectedTourIds, tours]);
  const countdownLink = countdownTours[0] ? `/tours/${countdownTours[0].slug}` : '/tours';

  useEffect(() => {
    const loadTours = () => {
      api.get('/tours').then(({ data }) => setTours(data)).catch(() => {});
    };

    const handleStorage = event => {
      if (!event.key || event.key === 'ste_tours') {
        loadTours();
      }
    };

    loadTours();
    window.addEventListener(TOURS_UPDATED_EVENT, loadTours);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(TOURS_UPDATED_EVENT, loadTours);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  useEffect(() => {
    const tick = () => setCountdown(getCountdownParts(settings.countdown.endDate));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [settings.countdown.endDate]);

  return <>
    <Helmet><title>{settings.companyName} | Private Egypt Tours & Nile Cruises</title><meta name="description" content={settings.footerDescription}/></Helmet>
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <span className="hero-kicker"><Sparkles size={16}/>{t('hero.eyebrow')}</span>
        <h1>{t('hero.title')}</h1><p>{t('hero.text')}</p>
        <div className="hero-actions"><Link className="btn btn-light" to="/tours">{t('hero.cta')}<ArrowRight size={18}/></Link><Link className="btn btn-ghost-light" to="/tailor-made">{t('hero.secondary')}</Link></div>
        <div className="trust-strip"><span><strong>4.9/5</strong> guest rating</span><span><strong>24/7</strong> Egypt support</span><span><strong>100%</strong> customisable</span></div>
      </div>
    </section>

    {settings.countdown.enabled && <section className="countdown-strip"><div className="container countdown-panel">
      <div className="countdown-copy"><span className="eyebrow">{t('homePage.countdownEyebrow')}</span><h2>{settings.countdown.title}</h2><p>{settings.countdown.subtitle}</p>{countdownTours.length > 0 && <div className="countdown-tour-tags">{countdownTours.map(tour => <span key={tour._id}>{tour.title}</span>)}</div>}</div>
      <div className="countdown-timer"><div><strong>{String(countdown.days).padStart(2, '0')}</strong><span>{t('homePage.days')}</span></div><div><strong>{String(countdown.hours).padStart(2, '0')}</strong><span>{t('homePage.hours')}</span></div><div><strong>{String(countdown.minutes).padStart(2, '0')}</strong><span>{t('homePage.minutes')}</span></div><div><strong>{String(countdown.seconds).padStart(2, '0')}</strong><span>{t('homePage.seconds')}</span></div></div>
      <Link className="btn btn-primary countdown-cta" to={countdownLink}>{settings.countdown.ctaLabel || t('common.bookNow')}<ArrowRight size={18}/></Link>
    </div></section>}

    <section className="quick-search"><div className="container search-panel">
      <div><label>{t('homePage.whereToGo')}</label><select><option>Cairo & Giza</option><option>Luxor</option><option>Aswan</option><option>Red Sea</option><option>{t('homePage.allEgypt')}</option></select></div>
      <div><label>{t('homePage.travelStyle')}</label><select><option>{t('homePage.classicEgypt')}</option><option>{t('homePage.nileCruise')}</option><option>{t('homePage.luxury')}</option><option>{t('homePage.adventure')}</option><option>{t('homePage.family')}</option></select></div>
      <div><label>Trip length</label><select><option>1 Day</option><option>2-4 Days</option><option>5-7 Days</option><option>8-12 Days</option><option>12+ Days</option></select></div>
      <Link to="/tours" className="btn btn-primary">{t('homePage.findTrip')}</Link>
    </div></section>

    <section className="section"><div className="container">
      <SectionHead eyebrow={home.categoryEyebrow} title={home.categoryTitle} text={home.categoryText}/>
      <div className="category-grid">{categories.map((category, index) => <Link to={`/category/${category.slug}`} className={`category-card c${index}`} key={category.slug}><img src={category.image} alt={category.name}/><div className="category-shade"></div><div><span>Explore</span><h3>{category.name}</h3><ArrowRight/></div></Link>)}</div>
    </div></section>

    <section className="section section-soft"><div className="container">
      <SectionHead eyebrow={t('homePage.featuredEyebrow')} title={t('common.featured')} text={home.featuredText} action={<Link className="text-link" to="/tours">{t('homePage.viewAllTours')} <ArrowRight size={17}/></Link>}/>
      <div className="tour-grid">{homeTours.map(tour => <TourCard tour={tour} key={tour._id}/>)}</div>
    </div></section>

    <section className="section story-section"><div className="container story-grid">
      <div className="story-media"><img className="story-main" src="https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1400&q=90" alt={home.storyTitle}/><div className="experience-card"><strong>15+</strong><span>years of local travel expertise</span></div></div>
      <div className="story-copy"><span className="eyebrow">{home.storyEyebrow}</span><h2>{home.storyTitle}</h2><p>{home.storyText}</p>
        <div className="feature-list"><div><Compass/><span><strong>Designed around you</strong><small>No rigid one-size-fits-all itineraries.</small></span></div><div><Headphones/><span><strong>Human support 24/7</strong><small>A real local team before and during your trip.</small></span></div><div><ShieldCheck/><span><strong>Clear, trusted planning</strong><small>Transparent inclusions and dependable partners.</small></span></div></div>
        <Link className="btn btn-primary" to="/about">{home.storyButton}</Link>
      </div>
    </div></section>

    <section className="section dark-section"><div className="container">
      <SectionHead eyebrow="Tailor-made journeys" title={home.tailorTitle} text={home.tailorText} action={<Link className="btn btn-light" to="/tailor-made">Start planning <ArrowRight size={17}/></Link>}/>
      <div className="tailor-steps"><div><span>01</span><h3>Tell us about your trip</h3><p>Dates, group size, interests and travel style.</p></div><div><span>02</span><h3>Get your personal itinerary</h3><p>We design the route, stays and experiences.</p></div><div><span>03</span><h3>Refine & book</h3><p>Adjust anything until the trip feels completely yours.</p></div></div>
    </div></section>

    <section className="section"><div className="container">
      <SectionHead eyebrow={t('homePage.reviewsEyebrow')} title={t('common.reviews')} text={t('homePage.reviewsText')}/>
      <div className="review-grid">{home.testimonials.map((review, index) => <article className="review-card" key={`${review.name}-${index}`}><div className="stars">{Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} size={17} fill="currentColor"/>)}</div><p>"{review.text}"</p><div><strong>{review.name}</strong><span>{review.country} • Verified traveler</span></div></article>)}</div>
    </div></section>

    <section className="section section-soft"><div className="container">
      <SectionHead eyebrow={t('homePage.blogEyebrow')} title={t('common.blog')} text={t('homePage.blogText')} action={<Link className="text-link" to="/blog">{t('homePage.allArticles')} <ArrowRight size={17}/></Link>}/>
      <div className="blog-grid">{home.blogPosts.map((post, index) => <article className="blog-card" key={`${post.slug || post.title}-${index}`}><img src={post.image} alt={post.title}/><div><span>{post.date}</span><h3>{post.title}</h3><p>{post.excerpt}</p><Link to="/blog">{post.ctaLabel || t('common.readGuide')} <ArrowRight size={16}/></Link></div></article>)}</div>
    </div></section>

    <section className="section"><div className="container">
      <SectionHead eyebrow={t('homePage.faqEyebrow')} title={home.faqTitle} text={home.faqText}/>
      <div className="faq-list">{home.faqs.map((faq, index) => <details key={`${faq.question}-${index}`}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
    </div></section>

    <section className="final-cta"><div className="container final-cta-inner"><div><span className="eyebrow light">{t('homePage.finalEyebrow')}</span><h2>{home.finalTitle}</h2><p>{home.finalText}</p></div><Link className="btn btn-light" to="/tailor-made">{home.finalButton} <ArrowRight size={18}/></Link></div></section>
  </>;
}
