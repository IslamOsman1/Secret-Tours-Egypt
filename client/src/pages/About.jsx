import { Helmet } from 'react-helmet-async';
import { Compass, HeartHandshake, ShieldCheck, Headphones } from 'lucide-react';
import useSiteSettings from '../hooks/useSiteSettings';

const icons = [Compass, HeartHandshake, ShieldCheck, Headphones];

export default function About() {
  const settings = useSiteSettings();
  const about = settings.about;

  return <>
    <Helmet><title>About Us | {settings.companyName}</title></Helmet>
    <section className="page-hero about-hero"><div className="container"><span className="eyebrow light">{about.heroEyebrow}</span><h1>{about.heroTitle}</h1><p>{about.heroText}</p></div></section>
    <section className="section"><div className="container about-grid"><div><span className="eyebrow">{about.storyEyebrow}</span><h2>{about.storyTitle}</h2></div><div><p className="lead">{about.storyLead}</p><p>{about.storyText}</p></div></div></section>
    <section className="section section-soft"><div className="container"><div className="value-grid">{about.values.map((item, index) => {
      const Icon = icons[index] || Compass;
      return <article key={`${item.title}-${index}`}><Icon/><h3>{item.title}</h3><p>{item.text}</p></article>;
    })}</div></div></section>
    <section className="section"><div className="container split-image"><img src="https://images.unsplash.com/photo-1566192091743-5966a6079982?auto=format&fit=crop&w=1200&q=90" alt={about.promiseTitle}/><div><span className="eyebrow">{about.promiseEyebrow}</span><h2>{about.promiseTitle}</h2><p>{about.promiseText}</p></div></div></section>
  </>;
}
