import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock3, MapPin, Star, Check, X, MessageCircle, CalendarDays, Users, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { api, getStoredTours, TOURS_UPDATED_EVENT } from '../api';
import useSiteSettings from '../hooks/useSiteSettings';

export default function TourDetails() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const settings = useSiteSettings();
  const [tours, setTours] = useState(() => getStoredTours());

  useEffect(() => {
    const loadTours = () => {
      api.get('/tours').then(({ data }) => setTours(data)).catch(() => {});
    };

    const handleStorage = event => {
      if (!event.key || event.key === 'ste_tours') loadTours();
    };

    loadTours();
    window.addEventListener(TOURS_UPDATED_EVENT, loadTours);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(TOURS_UPDATED_EVENT, loadTours);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const tour = tours.find(item => item.slug === slug) || tours[0];
  const itinerary = tour.itinerary || [
    { day: 1, title: 'Arrival & welcome', text: 'Private airport pickup and hotel check-in.' },
    { day: 2, title: 'Guided discovery', text: 'Explore the highlights with your local Egyptologist.' },
    { day: 3, title: 'Slow travel & hidden gems', text: 'A flexible day shaped around your interests.' },
  ];
  const whatsappHref = `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`;

  return <>
    <Helmet><title>{tour.title} | {settings.companyName}</title><meta name="description" content={tour.excerpt}/></Helmet>
    <section className="detail-top"><div className="container"><Link className="back-link" to="/tours"><ArrowLeft size={16}/> {t('tourDetails.back')}</Link><div className="detail-heading"><div><span className="tour-badge inline">{tour.badge || t('tourDetails.privateTour')}</span><h1>{tour.title}</h1><div className="detail-meta"><span><Star size={17} fill="currentColor"/> {tour.rating} ({tour.reviews} {t('tourDetails.reviews')})</span><span><MapPin size={17}/>{tour.city}</span><span><Clock3 size={17}/>{tour.duration}</span></div></div><div className="detail-price"><small>{t('common.from')}</small><strong>${tour.price}</strong><span>{t('common.person')}</span></div></div></div></section>
    <section className="gallery-wrap"><div className="container detail-gallery"><img className="gallery-main" src={tour.image}/><img src={tour.gallery?.[0] || 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=900&q=85'}/><img src={tour.gallery?.[1] || 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=900&q=85'}/></div></section>
    <section className="section"><div className="container detail-layout">
      <div className="detail-content"><div className="content-block"><span className="eyebrow">{t('tourDetails.overviewEyebrow')}</span><h2>{t('tourDetails.overviewTitle')}</h2><p className="lead">{tour.excerpt}</p><p>{t('tourDetails.overviewText')}</p></div>
        <div className="content-block"><h2>{t('tourDetails.highlights')}</h2><div className="highlight-grid">{tour.highlights?.map(item => <div key={item}><Check size={18}/>{item}</div>)}</div></div>
        <div className="content-block"><h2>{t('tourDetails.itinerary')}</h2><div className="itinerary">{itinerary.map(item => <div className="itinerary-item" key={item.day}><div className="day-num">{t('tourDetails.day')} {item.day}</div><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div></div>
        <div className="content-block include-grid"><div><h3>{t('tourDetails.included')}</h3><p><Check/>{t('tourDetails.guide')}</p><p><Check/>{t('tourDetails.transfers')}</p><p><Check/>{t('tourDetails.accommodation')}</p><p><Check/>{t('tourDetails.assist')}</p></div><div><h3>{t('tourDetails.notIncluded')}</h3><p><X/>{t('tourDetails.flights')}</p><p><X/>{t('tourDetails.expenses')}</p><p><X/>{t('tourDetails.insurance')}</p><p><X/>{t('tourDetails.activities')}</p></div></div>
      </div>
      <aside className="booking-card"><span className="eyebrow">{t('tourDetails.planEyebrow')}</span><h3>{t('tourDetails.requestTitle')}</h3><p>{t('tourDetails.requestText')}</p><label><CalendarDays size={16}/> {t('tourDetails.travelDate')}</label><input type="date"/><label><Users size={16}/> {t('tourDetails.travelers')}</label><select><option>{t('tourDetails.travelerTwo')}</option><option>{t('tourDetails.travelerOne')}</option><option>{t('tourDetails.travelerThree')}</option><option>{t('tourDetails.travelerFour')}</option><option>{t('tourDetails.travelerFive')}</option></select><input placeholder={t('tourDetails.yourName')}/><input placeholder={t('tourDetails.yourContact')}/><button className="btn btn-primary wide">{t('tourDetails.requestAvailability')}</button><a className="whatsapp-line" href={whatsappHref}><MessageCircle size={18}/> {t('tourDetails.whatsappNow')}</a><small>{t('tourDetails.noPayment')}</small></aside>
    </div></section>
  </>;
}
