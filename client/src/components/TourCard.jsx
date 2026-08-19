import { Link } from 'react-router-dom';
import { Clock3, MapPin, Star, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function TourCard({tour}){
  const {t}=useTranslation();
  return <article className="tour-card">
    <Link to={`/tours/${tour.slug}`} className="tour-image-wrap">
      <img src={tour.image} alt={tour.title}/>{tour.badge&&<span className="tour-badge">{tour.badge}</span>}
    </Link>
    <div className="tour-body">
      <div className="rating"><Star size={15} fill="currentColor"/> {tour.rating} <span>({tour.reviews})</span></div>
      <Link to={`/tours/${tour.slug}`}><h3>{tour.title}</h3></Link>
      <div className="tour-meta"><span><MapPin size={16}/>{tour.city}</span><span><Clock3 size={16}/>{tour.duration}</span></div>
      <p>{tour.excerpt}</p>
      <div className="tour-footer"><div><small>{t('common.from')}</small><strong>${tour.price}</strong><small>{t('common.person')}</small></div><Link className="round-link" to={`/tours/${tour.slug}`} aria-label="View tour"><ArrowUpRight/></Link></div>
    </div>
  </article>;
}
