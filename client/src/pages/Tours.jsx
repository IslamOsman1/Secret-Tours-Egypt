import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import TourCard from '../components/TourCard';
import { api, getStoredTours, TOURS_UPDATED_EVENT } from '../api';
import { categories } from '../data/demo';

export default function Tours(){
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
    <section className="page-hero compact"><div className="container"><span className="eyebrow light">Explore Egypt</span><h1>{activeName||'Egypt Tours & Travel Packages'}</h1><p>Private, flexible journeys designed by local experts. Every itinerary can be adapted to you.</p></div></section>
    <section className="section"><div className="container">
      <div className="filters"><div className="searchbox"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by tour or destination"/></div><div className="sortbox"><SlidersHorizontal size={18}/><select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Recommended</option><option value="price-low">Price: low to high</option><option value="rating">Top rated</option></select></div></div>
      <div className="results-line"><strong>{list.length} journeys</strong><span>All prices shown per person in USD</span></div>
      <div className="tour-grid">{list.map(t=><TourCard key={t._id} tour={t}/>)}</div>
      {!list.length&&<div className="empty-state"><h3>No journeys found</h3><p>Try a different destination or search term.</p></div>}
    </div></section>
  </>;
}
