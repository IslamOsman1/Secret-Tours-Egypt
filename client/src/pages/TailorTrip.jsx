import { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { api } from '../api';
import useSiteSettings from '../hooks/useSiteSettings';

export default function TailorTrip() {
  const settings = useSiteSettings();
  const page = settings.tailorPage;
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async event => {
    event.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      await api.post('/inquiries', { ...data, type: 'tailor' });
    } catch {}

    setLoading(false);
    setSent(true);
  };

  return <>
    <Helmet><title>Tailor-Made Egypt Trip | {settings.companyName}</title></Helmet>
    <section className="page-hero tailor-hero"><div className="container narrow"><span className="eyebrow light">{page.heroEyebrow}</span><h1>{page.heroTitle}</h1><p>{page.heroText}</p></div></section>
    <section className="section"><div className="container form-layout">
      <div><span className="eyebrow">{page.introEyebrow}</span><h2>{page.introTitle}</h2><p>{page.introText}</p><div className="mini-points">{page.points.map((point, index) => <p key={`${point}-${index}`}><CheckCircle2/>{point}</p>)}</div></div>
      <div className="form-card">{sent ? <div className="success-state"><CheckCircle2 size={52}/><h3>{page.successTitle}</h3><p>{page.successText}</p></div> : <form onSubmit={submit}>
        <div className="field-row"><div><label>Your name *</label><input name="name" required/></div><div><label>Email *</label><input type="email" name="email" required/></div></div>
        <div className="field-row"><div><label>WhatsApp / phone</label><input name="phone"/></div><div><label>Country</label><input name="country"/></div></div>
        <div className="field-row"><div><label>Arrival date</label><input type="date" name="arrivalDate"/></div><div><label>Trip length</label><select name="duration"><option>Not sure yet</option><option>1-3 days</option><option>4-6 days</option><option>7-9 days</option><option>10-14 days</option><option>15+ days</option></select></div></div>
        <div className="field-row"><div><label>Travelers</label><select name="travelers"><option>2</option><option>1</option><option>3</option><option>4</option><option>5+</option></select></div><div><label>Budget / person</label><select name="budget"><option>Flexible</option><option>Under $700</option><option>$700-1,200</option><option>$1,200-2,000</option><option>$2,000+</option></select></div></div>
        <label>What interests you?</label><div className="check-chips"><label><input type="checkbox" name="interests" value="Ancient Egypt"/>Ancient Egypt</label><label><input type="checkbox" name="interests" value="Nile Cruise"/>Nile Cruise</label><label><input type="checkbox" name="interests" value="Luxury"/>Luxury</label><label><input type="checkbox" name="interests" value="Desert"/>Desert</label><label><input type="checkbox" name="interests" value="Red Sea"/>Red Sea</label><label><input type="checkbox" name="interests" value="Food & Culture"/>Food & Culture</label></div>
        <label>Anything else we should know?</label><textarea name="message" rows="5" placeholder="Cities, hotel style, special occasion, must-see places..."></textarea>
        <button className="btn btn-primary wide" disabled={loading}>{loading ? 'Sending...' : 'Send my trip request'} <Send size={17}/></button>
      </form>}</div>
    </div></section>
  </>;
}
