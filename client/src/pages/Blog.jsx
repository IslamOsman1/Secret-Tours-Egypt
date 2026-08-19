import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useSiteSettings from '../hooks/useSiteSettings';

export default function Blog() {
  const { t } = useTranslation();
  const settings = useSiteSettings();
  const page = settings.blogPage;
  const posts = settings.home.blogPosts;

  return <>
    <Helmet><title>{page.heroTitle} | {settings.companyName}</title></Helmet>
    <section className="page-hero compact"><div className="container"><span className="eyebrow light">{page.heroEyebrow}</span><h1>{page.heroTitle}</h1><p>{page.heroText}</p></div></section>
    <section className="section"><div className="container"><div className="blog-grid blog-page">{posts.map((post, index) => <article className="blog-card" key={`${post.slug || post.title}-${index}`}><img src={post.image} alt={post.title}/><div><span>{post.date}</span><h3>{post.title}</h3><p>{post.excerpt}</p><a href="#">{post.ctaLabel || t('common.readGuide')} <ArrowRight size={16}/></a></div></article>)}</div></div></section>
  </>;
}
