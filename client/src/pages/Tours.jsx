import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import TourCard from '../components/TourCard';
import { api, getStoredTours, TOURS_UPDATED_EVENT } from '../api';
import { categories } from '../data/demo';

export default function Tours(){
  const { t } = useTranslation();
  const {category}=useParams();
  const [tours, setTours] = useState(() => getStoredTours());
  const [query,setQuery]=useState(''); const [sort,setSort]=useState('featured');
  const activeName=categories.find(c=>c.slug===category)?.name;

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

  const list=useMemo(()=>{
    let x=tours.filter(t=>(!category||t.category===category)&&(`${t.title} ${t.city}`.toLowerCase().includes(query.toLowerCase())));
    if(sort==='price-low') x=[...x].sort((a,b)=>a.price-b.price);
    if(sort==='rating') x=[...x].sort((a,b)=>b.rating-a.rating);
    return x;
  },[category,query,sort]);
  return <>
    <Helmet><title>{activeName||'Egypt Tours'} | Secret Tours Egypt</title></Helmet>
    <section className="page-hero compact"><div className="container"><span className="eyebrow light">{t('toursPage.eyebrow')}</span><h1>{activeName||t('toursPage.title')}</h1><p>{t('toursPage.intro')}</p></div></section>
    <section className="section"><div className="container">
      <div className="filters"><div className="searchbox"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('toursPage.searchPlaceholder')}/></div><div className="sortbox"><SlidersHorizontal size={18}/><select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">{t('toursPage.recommended')}</option><option value="price-low">{t('toursPage.priceLow')}</option><option value="rating">{t('toursPage.topRated')}</option></select></div></div>
      <div className="results-line"><strong>{list.length} {t('toursPage.journeysCount')}</strong><span>{t('toursPage.pricesNote')}</span></div>
      <div className="tour-grid">{list.map(t=><TourCard key={t._id} tour={t}/>)}</div>
      {!list.length&&<div className="empty-state"><h3>{t('toursPage.emptyTitle')}</h3><p>{t('toursPage.emptyText')}</p></div>}
    </div></section>
  </>;
}
