import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Map, MessageSquareText, Images, Settings, LogOut, Plus, Search, Pencil, Trash2, Eye, UploadCloud, Menu, X, House, CircleHelp, MapPinned, NotebookPen, Phone, PlaneTakeoff, Globe, MapIcon, TimerReset } from 'lucide-react';
import { api, getStoredSettings, getStoredTours, SETTINGS_UPDATED_EVENT, TOURS_UPDATED_EVENT } from '../api';

const navGroups = [
  {
    title: 'Overview',
    items: [
      ['overview', 'Dashboard', LayoutDashboard],
      ['tours', 'Tours', Map],
      ['inquiries', 'Inquiries', MessageSquareText],
      ['media', 'Media', Images],
    ],
  },
  {
    title: 'Site Content',
    items: [
      ['general', 'General', Settings],
      ['footer', 'Footer', MapIcon],
      ['campaign', 'Campaign', TimerReset],
      ['home', 'Home Page', House],
      ['about', 'About Page', CircleHelp],
      ['contact', 'Contact Page', Phone],
      ['blog', 'Travel Guide', NotebookPen],
      ['destinations', 'Destinations', MapPinned],
      ['tailor', 'Tailor-Made', PlaneTakeoff],
    ],
  },
];

const homeTestimonialsFallback = Array.from({ length: 3 }, () => ({ name: '', country: '', text: '' }));
const homeFaqsFallback = Array.from({ length: 4 }, () => ({ question: '', answer: '' }));
const aboutValuesFallback = Array.from({ length: 4 }, () => ({ title: '', text: '' }));
const blogFallback = Array.from({ length: 3 }, () => ({ title: '', date: '', excerpt: '', image: '', ctaLabel: 'Read guide' }));
const destinationsFallback = Array.from({ length: 6 }, () => ({ name: '', text: '', image: '' }));

export default function AdminDashboard() {
  const [tab, setTab] = useState('overview');
  const [menu, setMenu] = useState(false);
  const [items, setItems] = useState(() => getStoredTours());
  const [inquiries, setInquiries] = useState([]);
  const [modal, setModal] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const loadTours = () => api.get('/tours').then(r => r.data?.length && setItems(r.data)).catch(() => {});
    const loadInquiries = () => api.get('/inquiries').then(r => setInquiries(r.data)).catch(() => {});
    loadTours();
    loadInquiries();
    window.addEventListener(TOURS_UPDATED_EVENT, loadTours);
    return () => window.removeEventListener(TOURS_UPDATED_EVENT, loadTours);
  }, []);

  const tabTitle = useMemo(
    () => navGroups.flatMap(group => group.items).find(item => item[0] === tab)?.[1] || 'Dashboard',
    [tab]
  );

  const logout = () => {
    localStorage.removeItem('ste_admin_token');
    nav('/admin');
  };

  return <div className="admin-shell">
    <aside className={`admin-sidebar ${menu ? 'show' : ''}`}>
      <div className="admin-brand"><img src="/logo.png"/><button onClick={() => setMenu(false)}><X/></button></div>
      <nav className="admin-nav-groups">
        {navGroups.map(group => <div className="admin-nav-group" key={group.title}>
          <span className="admin-nav-title">{group.title}</span>
          {group.items.map(([id, label, Icon]) => <button className={tab === id ? 'active' : ''} onClick={() => { setTab(id); setMenu(false); }} key={id}><Icon size={19}/>{label}</button>)}
        </div>)}
      </nav>
      <div className="admin-bottom"><Link to="/" target="_blank"><Eye size={18}/> View website</Link><button onClick={logout}><LogOut size={18}/> Logout</button></div>
    </aside>

    <main className="admin-main">
      <header className="admin-top"><button className="admin-mobile-menu" onClick={() => setMenu(true)}><Menu/></button><div><h1>{tabTitle}</h1><p>Secret Tours Egypt content manager</p></div><div className="admin-user"><span>AD</span><div><strong>Administrator</strong><small>Content & operations</small></div></div></header>
      {tab === 'overview' && <Overview tours={items} inquiries={inquiries} setTab={setTab}/>}
      {tab === 'tours' && <ToursAdmin items={items} setItems={setItems} openModal={() => setModal(true)}/>}
      {tab === 'inquiries' && <Inquiries data={inquiries}/>}
      {tab === 'media' && <Media/>}
      {!['overview', 'tours', 'inquiries', 'media'].includes(tab) && <SettingsPanel section={tab} tours={items}/>}
    </main>

    {modal && <TourModal close={() => setModal(false)} add={tour => { setItems(value => [tour, ...value]); setModal(false); }}/>}
  </div>;
}

function Overview({ tours, inquiries, setTab }) {
  return <div className="admin-content"><div className="stat-grid"><div><span>Live tours</span><strong>{tours.length}</strong><small>Published experiences</small></div><div><span>New inquiries</span><strong>{inquiries.length || 0}</strong><small>Needs follow-up</small></div><div><span>Languages</span><strong>15</strong><small>Frontend locales</small></div><div><span>Page editors</span><strong>6</strong><small>Dedicated page controls</small></div></div><div className="admin-panels"><section><div className="panel-head"><h2>Recent tours</h2><button onClick={() => setTab('tours')}>Manage all</button></div>{tours.slice(0, 5).map(tour => <div className="mini-row" key={tour._id}><img src={tour.image}/><div><strong>{tour.title}</strong><small>{tour.city} • ${tour.price}</small></div><span className="status live">Live</span></div>)}</section><section><div className="panel-head"><h2>Quick actions</h2></div><div className="quick-actions"><button onClick={() => setTab('tours')}><Plus/>Add a new tour</button><button onClick={() => setTab('home')}><House/>Edit home page</button><button onClick={() => setTab('general')}><Globe/>Edit global settings</button><button onClick={() => setTab('inquiries')}><MessageSquareText/>Review inquiries</button></div></section></div></div>;
}

function ToursAdmin({ items, setItems, openModal }) {
  const [q, setQ] = useState('');
  const filtered = items.filter(item => item.title.toLowerCase().includes(q.toLowerCase()));

  const remove = async id => {
    if (!confirm('Delete this tour?')) return;
    setItems(value => value.filter(item => item._id !== id));
    api.delete(`/tours/${id}`).catch(() => {});
  };

  return <div className="admin-content"><div className="admin-toolbar"><div className="searchbox"><Search size={17}/><input value={q} onChange={event => setQ(event.target.value)} placeholder="Search tours..."/></div><button className="btn btn-primary" onClick={openModal}><Plus size={17}/> Add tour</button></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Tour</th><th>Category</th><th>Duration</th><th>Price</th><th>Status</th><th></th></tr></thead><tbody>{filtered.map(tour => <tr key={tour._id}><td><div className="tour-cell"><img src={tour.image}/><div><strong>{tour.title}</strong><small>{tour.city}</small></div></div></td><td>{tour.category}</td><td>{tour.duration}</td><td>${tour.price}</td><td><span className="status live">Published</span></td><td><div className="table-actions"><button title="Edit"><Pencil size={17}/></button><button title="Delete" onClick={() => remove(tour._id)}><Trash2 size={17}/></button></div></td></tr>)}</tbody></table></div></div>;
}

function Inquiries({ data }) {
  const rows = data.length ? data : [{ _id: 'd1', name: 'Emma Wilson', email: 'emma@example.com', type: 'tailor', createdAt: new Date().toISOString(), status: 'new', message: '8 days, Cairo + Nile cruise, family of 4.' }];
  return <div className="admin-content"><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Guest</th><th>Type</th><th>Message</th><th>Date</th><th>Status</th></tr></thead><tbody>{rows.map(item => <tr key={item._id}><td><strong>{item.name}</strong><small className="block">{item.email}</small></td><td>{item.type}</td><td className="message-cell">{item.message || 'Custom trip request'}</td><td>{new Date(item.createdAt).toLocaleDateString()}</td><td><span className="status new">New</span></td></tr>)}</tbody></table></div></div>;
}

function Media() {
  const [files, setFiles] = useState([]);

  const upload = async event => {
    const selected = [...event.target.files];
    setFiles(value => [...selected.map(file => ({ name: file.name, url: URL.createObjectURL(file) })), ...value]);
    for (const file of selected) {
      const data = new FormData();
      data.append('image', file);
      api.post('/upload', data).catch(() => {});
    }
  };

  return <div className="admin-content"><label className="upload-zone"><UploadCloud size={36}/><strong>Upload images to Cloudinary</strong><span>JPG, PNG or WebP • drag & drop or click to browse</span><input type="file" multiple accept="image/*" onChange={upload}/></label><div className="media-grid">{files.map((file, index) => <div key={index}><img src={file.url}/><span>{file.name}</span></div>)}</div></div>;
}

function SettingsPanel({ section, tours }) {
  const [form, setForm] = useState(() => getStoredSettings());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = () => api.get('/settings').then(response => setForm(response.data)).catch(() => {});
    load();
    window.addEventListener(SETTINGS_UPDATED_EVENT, load);
    return () => window.removeEventListener(SETTINGS_UPDATED_EVENT, load);
  }, []);

  const update = (key, value) => setForm(state => ({ ...state, [key]: value }));
  const updateSection = (sectionKey, key, value) => setForm(state => ({ ...state, [sectionKey]: { ...state[sectionKey], [key]: value } }));
  const updateListItem = (sectionKey, key, index, field, value) => setForm(state => ({ ...state, [sectionKey]: { ...state[sectionKey], [key]: state[sectionKey][key].map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item) } }));
  const updateListValue = (sectionKey, key, index, value) => setForm(state => ({ ...state, [sectionKey]: { ...state[sectionKey], [key]: state[sectionKey][key].map((item, itemIndex) => itemIndex === index ? value : item) } }));
  const updateMap = (key, value) => setForm(state => ({ ...state, footerMap: { ...state.footerMap, [key]: value } }));
  const updateCountdown = (key, value) => setForm(state => ({ ...state, countdown: { ...state.countdown, [key]: value } }));
  const toggleTour = id => setForm(state => {
    const exists = state.countdown.selectedTourIds.includes(id);
    return { ...state, countdown: { ...state.countdown, selectedTourIds: exists ? state.countdown.selectedTourIds.filter(item => item !== id) : [...state.countdown.selectedTourIds, id] } };
  });

  const submit = async event => {
    event.preventDefault();
    await api.post('/settings', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const homeTestimonials = form.home.testimonials?.length ? form.home.testimonials : homeTestimonialsFallback;
  const homeFaqs = form.home.faqs?.length ? form.home.faqs : homeFaqsFallback;
  const aboutValues = form.about.values?.length ? form.about.values : aboutValuesFallback;
  const blogPosts = form.home.blogPosts?.length ? form.home.blogPosts : blogFallback;
  const destinations = form.destinationsPage.places?.length ? form.destinationsPage.places : destinationsFallback;
  const tailorPoints = form.tailorPage.points?.length ? form.tailorPage.points : ['', '', '', ''];

  return <div className="admin-content"><form className="settings-card settings-card-wide" onSubmit={submit}>
    {section === 'general' && <>
      <h2>General website settings</h2>
      <div className="field-row"><div><label>Company name</label><input value={form.companyName} onChange={event => update('companyName', event.target.value)}/></div><div><label>WhatsApp</label><input value={form.whatsapp} onChange={event => update('whatsapp', event.target.value)}/></div></div>
      <div className="field-row"><div><label>Public email</label><input value={form.publicEmail} onChange={event => update('publicEmail', event.target.value)}/></div><div><label>Office location</label><input value={form.officeLocation} onChange={event => update('officeLocation', event.target.value)}/></div></div>
      <div className="field-row"><div><label>Default currency</label><select value={form.currency} onChange={event => update('currency', event.target.value)}><option>USD</option><option>EUR</option><option>GBP</option></select></div><div><label>Footer description</label><input value={form.footerDescription} onChange={event => update('footerDescription', event.target.value)}/></div></div>
    </>}

    {section === 'footer' && <>
      <h2>Footer map</h2>
      <label className="toggle-row"><input type="checkbox" checked={form.footerMap.enabled} onChange={event => updateMap('enabled', event.target.checked)}/><span>Show map in footer</span></label>
      <div className="field-row"><div><label>Map title</label><input value={form.footerMap.title} onChange={event => updateMap('title', event.target.value)}/></div><div><label>Map embed URL</label><input value={form.footerMap.embedUrl} onChange={event => updateMap('embedUrl', event.target.value)}/></div></div>
    </>}

    {section === 'campaign' && <>
      <h2>Hero countdown campaign</h2>
      <label className="toggle-row"><input type="checkbox" checked={form.countdown.enabled} onChange={event => updateCountdown('enabled', event.target.checked)}/><span>Enable countdown below hero</span></label>
      <div className="field-row"><div><label>Campaign title</label><input value={form.countdown.title} onChange={event => updateCountdown('title', event.target.value)}/></div><div><label>Button label</label><input value={form.countdown.ctaLabel} onChange={event => updateCountdown('ctaLabel', event.target.value)}/></div></div>
      <div className="field-row"><div><label>End date & time</label><input type="datetime-local" value={form.countdown.endDate} onChange={event => updateCountdown('endDate', event.target.value)}/></div><div><label>Selected tours</label><div className="selected-count">{form.countdown.selectedTourIds.length} tours selected</div></div></div>
      <label>Campaign subtitle</label><textarea rows="3" value={form.countdown.subtitle} onChange={event => updateCountdown('subtitle', event.target.value)}/>
      <p className="save-note">You can leave tour selection empty. The countdown will still appear and the button will open the tours page.</p>
      <div className="tour-picker">{tours.map(tour => <label key={tour._id} className="tour-picker-item"><input type="checkbox" checked={form.countdown.selectedTourIds.includes(tour._id)} onChange={() => toggleTour(tour._id)}/><div><strong>{tour.title}</strong><small>{tour.city} • ${tour.price}</small></div></label>)}</div>
    </>}

    {section === 'home' && <>
      <h2>Home page</h2>
      <div className="field-row"><div><label>Categories eyebrow</label><input value={form.home.categoryEyebrow} onChange={event => updateSection('home', 'categoryEyebrow', event.target.value)}/></div><div><label>Categories title</label><input value={form.home.categoryTitle} onChange={event => updateSection('home', 'categoryTitle', event.target.value)}/></div></div>
      <label>Categories text</label><textarea rows="3" value={form.home.categoryText} onChange={event => updateSection('home', 'categoryText', event.target.value)}/>
      <label>Featured tours text</label><textarea rows="3" value={form.home.featuredText} onChange={event => updateSection('home', 'featuredText', event.target.value)}/>
      <div className="field-row"><div><label>Story eyebrow</label><input value={form.home.storyEyebrow} onChange={event => updateSection('home', 'storyEyebrow', event.target.value)}/></div><div><label>Story button</label><input value={form.home.storyButton} onChange={event => updateSection('home', 'storyButton', event.target.value)}/></div></div>
      <label>Story title</label><input value={form.home.storyTitle} onChange={event => updateSection('home', 'storyTitle', event.target.value)}/>
      <label>Story text</label><textarea rows="4" value={form.home.storyText} onChange={event => updateSection('home', 'storyText', event.target.value)}/>
      <label>Tailor-made title</label><input value={form.home.tailorTitle} onChange={event => updateSection('home', 'tailorTitle', event.target.value)}/>
      <label>Tailor-made text</label><textarea rows="3" value={form.home.tailorText} onChange={event => updateSection('home', 'tailorText', event.target.value)}/>
      <div className="field-row"><div><label>FAQ title</label><input value={form.home.faqTitle} onChange={event => updateSection('home', 'faqTitle', event.target.value)}/></div><div><label>FAQ text</label><input value={form.home.faqText} onChange={event => updateSection('home', 'faqText', event.target.value)}/></div></div>
      <div className="field-row"><div><label>Final CTA title</label><input value={form.home.finalTitle} onChange={event => updateSection('home', 'finalTitle', event.target.value)}/></div><div><label>Final CTA button</label><input value={form.home.finalButton} onChange={event => updateSection('home', 'finalButton', event.target.value)}/></div></div>
      <label>Final CTA text</label><textarea rows="3" value={form.home.finalText} onChange={event => updateSection('home', 'finalText', event.target.value)}/>
      <div className="settings-divider"></div>
      <h2>Home FAQs</h2>
      {homeFaqs.map((faq, index) => <div className="field-row" key={`faq-${index}`}><div><label>Question {index + 1}</label><input value={faq.question} onChange={event => updateListItem('home', 'faqs', index, 'question', event.target.value)}/></div><div><label>Answer {index + 1}</label><input value={faq.answer} onChange={event => updateListItem('home', 'faqs', index, 'answer', event.target.value)}/></div></div>)}
      <div className="settings-divider"></div>
      <h2>Home testimonials</h2>
      {homeTestimonials.map((item, index) => <div key={`testimonial-${index}`}><div className="field-row"><div><label>Name {index + 1}</label><input value={item.name} onChange={event => updateListItem('home', 'testimonials', index, 'name', event.target.value)}/></div><div><label>Country {index + 1}</label><input value={item.country} onChange={event => updateListItem('home', 'testimonials', index, 'country', event.target.value)}/></div></div><label>Review text {index + 1}</label><textarea rows="3" value={item.text} onChange={event => updateListItem('home', 'testimonials', index, 'text', event.target.value)}/></div>)}
    </>}

    {section === 'about' && <>
      <h2>About page</h2>
      <div className="field-row"><div><label>Hero eyebrow</label><input value={form.about.heroEyebrow} onChange={event => updateSection('about', 'heroEyebrow', event.target.value)}/></div><div><label>Hero title</label><input value={form.about.heroTitle} onChange={event => updateSection('about', 'heroTitle', event.target.value)}/></div></div>
      <label>Hero text</label><textarea rows="3" value={form.about.heroText} onChange={event => updateSection('about', 'heroText', event.target.value)}/>
      <div className="field-row"><div><label>Story eyebrow</label><input value={form.about.storyEyebrow} onChange={event => updateSection('about', 'storyEyebrow', event.target.value)}/></div><div><label>Story title</label><input value={form.about.storyTitle} onChange={event => updateSection('about', 'storyTitle', event.target.value)}/></div></div>
      <label>Story lead</label><textarea rows="3" value={form.about.storyLead} onChange={event => updateSection('about', 'storyLead', event.target.value)}/>
      <label>Story text</label><textarea rows="3" value={form.about.storyText} onChange={event => updateSection('about', 'storyText', event.target.value)}/>
      <div className="field-row"><div><label>Promise eyebrow</label><input value={form.about.promiseEyebrow} onChange={event => updateSection('about', 'promiseEyebrow', event.target.value)}/></div><div><label>Promise title</label><input value={form.about.promiseTitle} onChange={event => updateSection('about', 'promiseTitle', event.target.value)}/></div></div>
      <label>Promise text</label><textarea rows="3" value={form.about.promiseText} onChange={event => updateSection('about', 'promiseText', event.target.value)}/>
      <div className="settings-divider"></div>
      <h2>About values</h2>
      {aboutValues.map((item, index) => <div key={`value-${index}`}><div className="field-row"><div><label>Value title {index + 1}</label><input value={item.title} onChange={event => updateListItem('about', 'values', index, 'title', event.target.value)}/></div><div><label>Value text {index + 1}</label><input value={item.text} onChange={event => updateListItem('about', 'values', index, 'text', event.target.value)}/></div></div></div>)}
    </>}

    {section === 'contact' && <>
      <h2>Contact page</h2>
      <div className="field-row"><div><label>Hero eyebrow</label><input value={form.contactPage.heroEyebrow} onChange={event => updateSection('contactPage', 'heroEyebrow', event.target.value)}/></div><div><label>Hero title</label><input value={form.contactPage.heroTitle} onChange={event => updateSection('contactPage', 'heroTitle', event.target.value)}/></div></div>
      <label>Hero text</label><textarea rows="3" value={form.contactPage.heroText} onChange={event => updateSection('contactPage', 'heroText', event.target.value)}/>
      <div className="field-row"><div><label>WhatsApp title</label><input value={form.contactPage.whatsappTitle} onChange={event => updateSection('contactPage', 'whatsappTitle', event.target.value)}/></div><div><label>WhatsApp text</label><input value={form.contactPage.whatsappText} onChange={event => updateSection('contactPage', 'whatsappText', event.target.value)}/></div></div>
      <div className="field-row"><div><label>Email title</label><input value={form.contactPage.emailTitle} onChange={event => updateSection('contactPage', 'emailTitle', event.target.value)}/></div><div><label>Email text</label><input value={form.contactPage.emailText} onChange={event => updateSection('contactPage', 'emailText', event.target.value)}/></div></div>
      <div className="field-row"><div><label>Location title</label><input value={form.contactPage.basedTitle} onChange={event => updateSection('contactPage', 'basedTitle', event.target.value)}/></div><div><label>Location text</label><input value={form.contactPage.basedText} onChange={event => updateSection('contactPage', 'basedText', event.target.value)}/></div></div>
      <div className="field-row"><div><label>Support title</label><input value={form.contactPage.supportTitle} onChange={event => updateSection('contactPage', 'supportTitle', event.target.value)}/></div><div><label>Support text</label><input value={form.contactPage.supportText} onChange={event => updateSection('contactPage', 'supportText', event.target.value)}/></div></div>
      <label>Success message</label><textarea rows="2" value={form.contactPage.successText} onChange={event => updateSection('contactPage', 'successText', event.target.value)}/>
    </>}

    {section === 'blog' && <>
      <h2>Travel guide / blog</h2>
      <div className="field-row"><div><label>Hero eyebrow</label><input value={form.blogPage.heroEyebrow} onChange={event => updateSection('blogPage', 'heroEyebrow', event.target.value)}/></div><div><label>Hero title</label><input value={form.blogPage.heroTitle} onChange={event => updateSection('blogPage', 'heroTitle', event.target.value)}/></div></div>
      <label>Hero text</label><textarea rows="3" value={form.blogPage.heroText} onChange={event => updateSection('blogPage', 'heroText', event.target.value)}/>
      <div className="settings-divider"></div>
      {blogPosts.map((post, index) => <div key={`post-${index}`}><h2>Article {index + 1}</h2><div className="field-row"><div><label>Title</label><input value={post.title} onChange={event => updateListItem('home', 'blogPosts', index, 'title', event.target.value)}/></div><div><label>Date</label><input value={post.date} onChange={event => updateListItem('home', 'blogPosts', index, 'date', event.target.value)}/></div></div><label>Excerpt</label><textarea rows="3" value={post.excerpt} onChange={event => updateListItem('home', 'blogPosts', index, 'excerpt', event.target.value)}/><div className="field-row"><div><label>Image URL</label><input value={post.image} onChange={event => updateListItem('home', 'blogPosts', index, 'image', event.target.value)}/></div><div><label>Button label</label><input value={post.ctaLabel || 'Read guide'} onChange={event => updateListItem('home', 'blogPosts', index, 'ctaLabel', event.target.value)}/></div></div></div>)}
    </>}

    {section === 'destinations' && <>
      <h2>Destinations page</h2>
      <div className="field-row"><div><label>Hero eyebrow</label><input value={form.destinationsPage.heroEyebrow} onChange={event => updateSection('destinationsPage', 'heroEyebrow', event.target.value)}/></div><div><label>Hero title</label><input value={form.destinationsPage.heroTitle} onChange={event => updateSection('destinationsPage', 'heroTitle', event.target.value)}/></div></div>
      <label>Hero text</label><textarea rows="3" value={form.destinationsPage.heroText} onChange={event => updateSection('destinationsPage', 'heroText', event.target.value)}/>
      <div className="settings-divider"></div>
      {destinations.map((place, index) => <div key={`place-${index}`}><h2>Destination {index + 1}</h2><div className="field-row"><div><label>Name</label><input value={place.name} onChange={event => updateListItem('destinationsPage', 'places', index, 'name', event.target.value)}/></div><div><label>Image URL</label><input value={place.image} onChange={event => updateListItem('destinationsPage', 'places', index, 'image', event.target.value)}/></div></div><label>Description</label><textarea rows="3" value={place.text} onChange={event => updateListItem('destinationsPage', 'places', index, 'text', event.target.value)}/></div>)}
    </>}

    {section === 'tailor' && <>
      <h2>Tailor-made page</h2>
      <div className="field-row"><div><label>Hero eyebrow</label><input value={form.tailorPage.heroEyebrow} onChange={event => updateSection('tailorPage', 'heroEyebrow', event.target.value)}/></div><div><label>Hero title</label><input value={form.tailorPage.heroTitle} onChange={event => updateSection('tailorPage', 'heroTitle', event.target.value)}/></div></div>
      <label>Hero text</label><textarea rows="3" value={form.tailorPage.heroText} onChange={event => updateSection('tailorPage', 'heroText', event.target.value)}/>
      <div className="field-row"><div><label>Intro eyebrow</label><input value={form.tailorPage.introEyebrow} onChange={event => updateSection('tailorPage', 'introEyebrow', event.target.value)}/></div><div><label>Intro title</label><input value={form.tailorPage.introTitle} onChange={event => updateSection('tailorPage', 'introTitle', event.target.value)}/></div></div>
      <label>Intro text</label><textarea rows="3" value={form.tailorPage.introText} onChange={event => updateSection('tailorPage', 'introText', event.target.value)}/>
      {tailorPoints.map((point, index) => <div key={`point-${index}`}><label>Point {index + 1}</label><input value={point} onChange={event => updateListValue('tailorPage', 'points', index, event.target.value)}/></div>)}
      <div className="field-row"><div><label>Success title</label><input value={form.tailorPage.successTitle} onChange={event => updateSection('tailorPage', 'successTitle', event.target.value)}/></div><div><label>Success text</label><input value={form.tailorPage.successText} onChange={event => updateSection('tailorPage', 'successText', event.target.value)}/></div></div>
    </>}

    {saved && <div className="save-note">Settings saved.</div>}
    <button className="btn btn-primary">Save changes</button>
  </form></div>;
}

function TourModal({ close, add }) {
  const [preview, setPreview] = useState('');

  const submit = async event => {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget));
    const tour = { ...form, _id: Date.now().toString(), price: Number(form.price), rating: 5, reviews: 0, image: preview || 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1000&q=80', slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') };
    try {
      const { data } = await api.post('/tours', tour);
      add(data);
    } catch {
      add(tour);
    }
  };

  return <div className="modal-backdrop" onMouseDown={close}><div className="admin-modal" onMouseDown={event => event.stopPropagation()}><div className="panel-head"><h2>Add new tour</h2><button onClick={close}><X/></button></div><form onSubmit={submit}><label>Tour title</label><input name="title" required/><div className="field-row"><div><label>Category</label><select name="category"><option value="classic-tours">Classic tours</option><option value="nile-cruises">Nile cruises</option><option value="day-trips">Day trips</option><option value="desert-safari">Desert safari</option></select></div><div><label>Price (USD)</label><input name="price" type="number" required/></div></div><div className="field-row"><div><label>Destination</label><input name="city" required/></div><div><label>Duration</label><input name="duration" placeholder="8 Days / 7 Nights" required/></div></div><label>Short description</label><textarea name="excerpt" rows="4" required></textarea><label>Main image URL</label><input value={preview} onChange={event => setPreview(event.target.value)} placeholder="Cloudinary URL or public image URL"/><button className="btn btn-primary wide">Publish tour</button></form></div></div>;
}
