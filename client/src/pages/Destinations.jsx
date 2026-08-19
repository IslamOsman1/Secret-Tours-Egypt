import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useSiteSettings from '../hooks/useSiteSettings';

export default function Destinations() {
  const settings = useSiteSettings();
  const page = settings.destinationsPage;

  return <>
    <Helmet><title>Egypt Destinations | {settings.companyName}</title></Helmet>
    <section className="page-hero compact"><div className="container"><span className="eyebrow light">{page.heroEyebrow}</span><h1>{page.heroTitle}</h1><p>{page.heroText}</p></div></section>
    <section className="section"><div className="container"><div className="destination-grid">{page.places.map((place, index) => <article className="destination-card" key={`${place.name}-${index}`}><img src={place.image} alt={place.name}/><div><h3>{place.name}</h3><p>{place.text}</p><Link to="/tours">Explore tours <ArrowRight size={16}/></Link></div></article>)}</div></div></section>
  </>;
}
