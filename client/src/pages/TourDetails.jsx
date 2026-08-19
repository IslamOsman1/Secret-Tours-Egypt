import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock3, MapPin, Star, Check, X, MessageCircle, CalendarDays, Users, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { api, getStoredTours, TOURS_UPDATED_EVENT } from '../api';
import useSiteSettings from '../hooks/useSiteSettings';

export default function TourDetails() {
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
    <section className="detail-top"><div className="container"><Link className="back-link" to="/tours"><ArrowLeft size={16}/> Back to tours</Link><div className="detail-heading"><div><span className="tour-badge inline">{tour.badge || 'Private Tour'}</span><h1>{tour.title}</h1><div className="detail-meta"><span><Star size={17} fill="currentColor"/> {tour.rating} ({tour.reviews} reviews)</span><span><MapPin size={17}/>{tour.city}</span><span><Clock3 size={17}/>{tour.duration}</span></div></div><div className="detail-price"><small>From</small><strong>${tour.price}</strong><span>per person</span></div></div></div></section>
    <section className="gallery-wrap"><div className="container detail-gallery"><img className="gallery-main" src={tour.image}/><img src={tour.gallery?.[0] || 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=900&q=85'}/><img src={tour.gallery?.[1] || 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=900&q=85'}/></div></section>
    <section className="section"><div className="container detail-layout">
      <div className="detail-content"><div className="content-block"><span className="eyebrow">Journey overview</span><h2>A deeper way to experience Egypt</h2><p className="lead">{tour.excerpt}</p><p>This private journey blends iconic sights with a relaxed local rhythm. Your guide and operations team can adapt timing and optional experiences to suit your pace.</p></div>
        <div className="content-block"><h2>Highlights</h2><div className="highlight-grid">{tour.highlights?.map(item => <div key={item}><Check size={18}/>{item}</div>)}</div></div>
        <div className="content-block"><h2>Day-by-day itinerary</h2><div className="itinerary">{itinerary.map(item => <div className="itinerary-item" key={item.day}><div className="day-num">Day {item.day}</div><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div></div>
        <div className="content-block include-grid"><div><h3>Included</h3><p><Check/>Private licensed guide</p><p><Check/>Air-conditioned transfers</p><p><Check/>Accommodation as listed</p><p><Check/>Meet & assist service</p></div><div><h3>Not included</h3><p><X/>International flights</p><p><X/>Personal expenses</p><p><X/>Travel insurance</p><p><X/>Optional activities</p></div></div>
      </div>
      <aside className="booking-card"><span className="eyebrow">Plan this journey</span><h3>Request your trip</h3><p>Tell us when you're travelling. We'll confirm availability and personalise the details.</p><label><CalendarDays size={16}/> Travel date</label><input type="date"/><label><Users size={16}/> Travelers</label><select><option>2 travelers</option><option>1 traveler</option><option>3 travelers</option><option>4 travelers</option><option>5+ travelers</option></select><input placeholder="Your name"/><input placeholder="Email or WhatsApp"/><button className="btn btn-primary wide">Request availability</button><a className="whatsapp-line" href={whatsappHref}><MessageCircle size={18}/> Prefer WhatsApp? Chat now</a><small>No payment required to request availability.</small></aside>
    </div></section>
  </>;
}
