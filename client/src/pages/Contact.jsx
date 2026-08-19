import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { api } from '../api';
import useSiteSettings from '../hooks/useSiteSettings';

export default function Contact() {
  const settings = useSiteSettings();
  const page = settings.contactPage;
  const whatsappHref = `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`;
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async event => {
    event.preventDefault();
    setLoading(true);
    const form = Object.fromEntries(new FormData(event.currentTarget));

    try {
      await api.post('/inquiries', { ...form, type: 'contact' });
      setSent(true);
      event.currentTarget.reset();
    } finally {
      setLoading(false);
    }
  };

  return <>
    <Helmet><title>Contact | {settings.companyName}</title></Helmet>
    <section className="page-hero compact"><div className="container"><span className="eyebrow light">{page.heroEyebrow}</span><h1>{page.heroTitle}</h1><p>{page.heroText}</p></div></section>
    <section className="section"><div className="container contact-grid"><div><div className="contact-item"><MessageCircle/><div><h3>{page.whatsappTitle}</h3><p>{page.whatsappText}</p><a href={whatsappHref}>{settings.whatsapp}</a></div></div><div className="contact-item"><Mail/><div><h3>{page.emailTitle}</h3><p>{page.emailText}</p><a href={`mailto:${settings.publicEmail}`}>{settings.publicEmail}</a></div></div><div className="contact-item"><MapPin/><div><h3>{page.basedTitle}</h3><p>{page.basedText}</p><a href="#">{settings.officeLocation}</a></div></div><div className="contact-item"><Phone/><div><h3>{page.supportTitle}</h3><p>{page.supportText}</p></div></div></div><form className="form-card" onSubmit={submit}><label>Name</label><input name="name" required/><label>Email</label><input name="email" type="email" required/><label>Subject</label><input name="subject" required/><label>Message</label><textarea name="message" rows="7" required></textarea>{sent && <p>{page.successText}</p>}<button className="btn btn-primary" disabled={loading}>{loading ? 'Sending...' : 'Send message'} <Send size={17}/></button></form></div></section>
  </>;
}
