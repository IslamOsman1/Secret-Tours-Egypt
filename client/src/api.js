import { blogPosts as seedBlogPosts, testimonials as seedTestimonials, tours as seedTours } from './data/demo';

const STORAGE_KEYS = {
  tours: 'ste_tours',
  inquiries: 'ste_inquiries',
  settings: 'ste_settings',
  adminToken: 'ste_admin_token',
};

function resolveApiBase() {
  const configured = String(import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

  if (typeof window === 'undefined') {
    return configured;
  }

  const host = window.location.hostname;
  const isBrowserLocal = host === 'localhost' || host === '127.0.0.1';
  const pointsToLocalhost = /localhost|127\.0\.0\.1/i.test(configured);

  if (!isBrowserLocal && pointsToLocalhost) {
    return '/api';
  }

  return configured;
}

const API_BASE = resolveApiBase();
const REMOTE_ENABLED = Boolean(API_BASE);

export const TOURS_UPDATED_EVENT = 'ste:tours-updated';
export const SETTINGS_UPDATED_EVENT = 'ste:settings-updated';

export const demoAdmin = {
  email: 'admin@secrettoursegypt.com',
  password: 'admin123',
  token: 'ste-local-admin-token',
};

const defaultSettings = {
  companyName: 'Secret Tours Egypt',
  whatsapp: '+20 100 000 0000',
  publicEmail: 'hello@secrettoursegypt.com',
  officeLocation: 'Cairo & Luxor, Egypt',
  currency: 'USD',
  footerDescription: 'Private Egypt tours, Nile cruises and tailor-made journeys created by local experts.',
  footerMap: {
    enabled: true,
    title: 'Find us on the map',
    embedUrl: 'https://www.google.com/maps?q=Luxor%2C%20Egypt&z=13&output=embed',
  },
  countdown: {
    enabled: true,
    title: 'Limited-time Egypt departures',
    subtitle: 'Reserve selected journeys before this offer closes.',
    endDate: '2026-12-31T23:59',
    ctaLabel: 'Book now',
    selectedTourIds: [],
  },
  home: {
    categoryEyebrow: 'Explore your way',
    categoryTitle: 'One Egypt. Endless ways to experience it.',
    categoryText: 'Choose a travel style, then make every detail your own.',
    featuredText: 'Flexible itineraries with a private, local touch.',
    storyEyebrow: 'The Secret Tours difference',
    storyTitle: 'Egypt feels different when you travel with people who call it home.',
    storyText: 'We combine the ease of a premium travel company with the warmth and flexibility of a local expert. Every journey can be adapted around your pace, interests and travel style.',
    storyButton: 'Meet Secret Tours Egypt',
    tailorTitle: "Tell us your dream. We'll build the route.",
    tailorText: 'Share your dates, interests and budget. Our Egypt specialists will turn them into a personalised itinerary.',
    faqTitle: 'Frequently asked questions',
    faqText: 'Clear answers to common questions before you plan your Egypt trip.',
    finalTitle: 'Ready to see Egypt your way?',
    finalText: 'Send us a few details and receive a personalised travel plan from a local specialist.',
    finalButton: 'Create my itinerary',
    faqs: [
      { question: 'Can every itinerary be customized?', answer: 'Yes. Dates, hotel level, pace, sightseeing, cruise class and optional experiences can all be adjusted around your preferences.' },
      { question: 'Do you arrange airport transfers and local transport?', answer: 'Yes. Private airport assistance, hotel transfers and air-conditioned sightseeing vehicles can be included in your itinerary.' },
      { question: 'Can I book a private guide?', answer: 'Yes. Most journeys can be arranged privately with a licensed Egyptologist guide and dedicated driver.' },
      { question: 'How do I start a tailor-made trip?', answer: 'Use the tailor-made form with your dates, group size and interests. The team can then prepare a personalized proposal for you.' },
    ],
    testimonials: seedTestimonials,
    blogPosts: seedBlogPosts,
  },
  about: {
    heroEyebrow: 'Local by nature',
    heroTitle: "We don't just show you Egypt. We help you feel it.",
    heroText: 'Secret Tours Egypt is a local travel company focused on private, flexible and deeply personal journeys.',
    storyEyebrow: 'Our story',
    storyTitle: 'Built for travelers who want more than a checklist.',
    storyLead: 'Great travel is not only about seeing famous places. It is about how smoothly the day flows, who explains the story, where you stop, and how confidently you feel along the way.',
    storyText: 'Our team combines experienced guides, trusted drivers and hands-on trip planners to create journeys across Cairo, Luxor, Aswan, Alexandria, the Western Desert and the Red Sea.',
    promiseEyebrow: 'Our promise',
    promiseTitle: 'Clear planning. Flexible journeys. Genuine hospitality.',
    promiseText: 'We aim to keep pricing transparent, communication quick and itineraries realistic. If your priorities change, we adapt. If you want to slow down, we make room. If you want to add a hidden gem, we help make it happen.',
    values: [
      { title: 'Local knowledge', text: 'Routes and recommendations shaped by people who know Egypt day to day.' },
      { title: 'Personal service', text: 'Real humans, flexible planning and space to adjust the journey around you.' },
      { title: 'Reliable partners', text: 'Carefully selected guides, drivers, hotels and cruise providers.' },
      { title: '24/7 support', text: 'A local contact is available throughout the trip whenever you need help.' },
    ],
  },
  contactPage: {
    heroEyebrow: "We're here to help",
    heroTitle: 'Talk to an Egypt travel expert',
    heroText: 'Questions about a tour, cruise, private transfer or custom itinerary? Send us a message.',
    whatsappTitle: 'WhatsApp',
    whatsappText: 'Fastest for trip planning and in-Egypt support.',
    emailTitle: 'Email',
    emailText: 'For proposals, documents and detailed questions.',
    basedTitle: 'Based in Egypt',
    basedText: 'Cairo & Luxor operations, serving travelers nationwide.',
    supportTitle: '24/7 traveler support',
    supportText: 'Active guests have access to an emergency local contact.',
    successText: 'Message saved successfully. You can review it from the admin dashboard.',
  },
  tailorPage: {
    heroEyebrow: 'Built around you',
    heroTitle: 'Your perfect Egypt trip starts with a conversation.',
    heroText: 'Tell us the basics. A local travel specialist can turn them into a custom day-by-day itinerary.',
    introEyebrow: 'Tailor your journey',
    introTitle: 'What would make this trip unforgettable?',
    introText: 'There are no wrong answers. Share as much or as little as you know now.',
    points: [
      'Private, no-obligation proposal',
      'Flexible dates and routing',
      'Hotel, cruise and guide options',
      '24/7 local support while in Egypt',
    ],
    successTitle: 'Request received',
    successText: 'Thanks! A Secret Tours Egypt specialist will contact you shortly.',
  },
  blogPage: {
    heroEyebrow: 'Travel smarter',
    heroTitle: 'Egypt Travel Guide',
    heroText: 'Local tips, practical planning and inspiration for your next Egyptian adventure.',
  },
  destinationsPage: {
    heroEyebrow: 'Where to go',
    heroTitle: 'Explore Egypt by destination',
    heroText: 'From ancient cities to the Nile, desert and Red Sea, discover the places that can shape your journey.',
    places: [
      { name: 'Cairo & Giza', text: 'Pyramids, museums, historic Cairo and vibrant local life.', image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Luxor', text: "Temples, royal tombs and the world's greatest open-air museum.", image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Aswan', text: 'Nubian culture, Philae Temple and peaceful Nile landscapes.', image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Red Sea', text: 'Beach escapes, snorkeling and relaxed resort stays.', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Alexandria', text: 'Mediterranean history, sea views and cosmopolitan heritage.', image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Western Desert', text: 'Oases, white desert formations and unforgettable stargazing.', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1000&q=85' },
    ],
  },
};

function slugify(value, fallback = 'tour') {
  const slug = String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return slug || fallback;
}

function normalizeTour(tour, index = 0) {
  const id = tour?._id || `tour-${Date.now()}-${index}`;
  return {
    ...tour,
    _id: id,
    slug: slugify(tour?.slug || tour?.title, id),
    featured: tour?.featured ?? true,
    rating: Number(tour?.rating ?? 5),
    reviews: Number(tour?.reviews ?? 0),
    price: Number(tour?.price ?? 0),
    image: tour?.image || 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1000&q=80',
  };
}

function read(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  if (typeof window === 'undefined') return value;
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

function getAdminToken() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(STORAGE_KEYS.adminToken) || '';
}

function isLocalEnvironment() {
  if (typeof window === 'undefined') return true;
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1';
}

function notifyToursChanged() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(TOURS_UPDATED_EVENT));
}

function notifySettingsChanged() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(SETTINGS_UPDATED_EVENT));
}

function mergeSettings(settings) {
  const value = settings || {};
  return {
    ...defaultSettings,
    ...value,
    countdown: {
      ...defaultSettings.countdown,
      ...value?.countdown,
      selectedTourIds: Array.isArray(value?.countdown?.selectedTourIds) ? value.countdown.selectedTourIds : [],
    },
    footerMap: {
      ...defaultSettings.footerMap,
      ...value?.footerMap,
    },
    home: {
      ...defaultSettings.home,
      ...value?.home,
      testimonials: Array.isArray(value?.home?.testimonials) ? value.home.testimonials : defaultSettings.home.testimonials,
      blogPosts: Array.isArray(value?.home?.blogPosts) ? value.home.blogPosts : defaultSettings.home.blogPosts,
      faqs: Array.isArray(value?.home?.faqs) ? value.home.faqs : defaultSettings.home.faqs,
    },
    about: {
      ...defaultSettings.about,
      ...value?.about,
      values: Array.isArray(value?.about?.values) ? value.about.values : defaultSettings.about.values,
    },
    contactPage: {
      ...defaultSettings.contactPage,
      ...value?.contactPage,
    },
    tailorPage: {
      ...defaultSettings.tailorPage,
      ...value?.tailorPage,
      points: Array.isArray(value?.tailorPage?.points) ? value.tailorPage.points : defaultSettings.tailorPage.points,
    },
    blogPage: {
      ...defaultSettings.blogPage,
      ...value?.blogPage,
    },
    destinationsPage: {
      ...defaultSettings.destinationsPage,
      ...value?.destinationsPage,
      places: Array.isArray(value?.destinationsPage?.places) ? value.destinationsPage.places : defaultSettings.destinationsPage.places,
    },
  };
}

export function getStoredTours() {
  if (!isLocalEnvironment()) {
    return seedTours.map(normalizeTour);
  }
  const stored = read(STORAGE_KEYS.tours, seedTours);
  const tours = Array.isArray(stored) && stored.length ? stored : seedTours;
  return tours.map(normalizeTour);
}

export function getStoredInquiries() {
  return read(STORAGE_KEYS.inquiries, []);
}

export function getStoredSettings() {
  if (!isLocalEnvironment()) {
    return mergeSettings(defaultSettings);
  }
  return mergeSettings(read(STORAGE_KEYS.settings, defaultSettings));
}

function saveTours(items) {
  const saved = write(STORAGE_KEYS.tours, items.map(normalizeTour));
  notifyToursChanged();
  return saved;
}

function saveInquiries(items) {
  return write(STORAGE_KEYS.inquiries, items);
}

function saveSettings(settings) {
  const saved = write(STORAGE_KEYS.settings, mergeSettings(settings));
  notifySettingsChanged();
  return saved;
}

function withDelay(data) {
  return new Promise(resolve => setTimeout(() => resolve({ data }), 120));
}

function reject(message, status = 400) {
  return Promise.reject({ response: { data: { message }, status } });
}

async function request(method, path, { payload, auth = false, isFormData = false } = {}) {
  const headers = {};
  if (!isFormData) headers['Content-Type'] = 'application/json';
  if (auth && getAdminToken()) headers.Authorization = `Bearer ${getAdminToken()}`;

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: method === 'GET' || method === 'DELETE' ? undefined : isFormData ? payload : JSON.stringify(payload || {}),
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw { response: { data: data || { message: 'Request failed.' }, status: response.status } };
  }

  return { data };
}

async function tryRemote(method, path, options) {
  if (!REMOTE_ENABLED) return null;
  try {
    return await request(method, path, options);
  } catch (error) {
    if (error?.response) throw error;
    return null;
  }
}

export const api = {
  async get(path) {
    const remote = await tryRemote('GET', path);
    if (remote) {
      if (path === '/tours') saveTours(remote.data || []);
      if (path === '/settings') {
        const merged = saveSettings(remote.data || {});
        return { data: merged };
      }
      if (path === '/inquiries') saveInquiries(remote.data || []);
      return remote;
    }

    if (path === '/tours') return withDelay(getStoredTours());
    if (path === '/inquiries') return withDelay(getStoredInquiries());
    if (path === '/settings') return withDelay(getStoredSettings());
    return reject(`Unsupported GET ${path}`, 404);
  },

  async post(path, payload) {
    if (path === '/auth/login' || path === '/admin/login') {
      const remote = await tryRemote('POST', path, { payload });
      if (remote) {
        if (typeof window !== 'undefined' && remote.data?.token) {
          localStorage.setItem(STORAGE_KEYS.adminToken, remote.data.token);
        }
        return remote;
      }

      if (!isLocalEnvironment()) {
        return reject('Admin login is unavailable because the API is not connected.', 503);
      }

      const email = payload?.email?.trim().toLowerCase();
      const password = payload?.password;
      if (email !== demoAdmin.email || password !== demoAdmin.password) {
        return reject('Use the demo admin credentials to access the local dashboard.', 401);
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.adminToken, demoAdmin.token);
      }

      return withDelay({ token: demoAdmin.token, user: { email: demoAdmin.email } });
    }

    if (path === '/inquiries') {
      const remote = await tryRemote('POST', path, { payload });
      if (remote) return remote;

      const inquiry = {
        _id: `inq-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'new',
        ...payload,
      };
      saveInquiries([inquiry, ...getStoredInquiries()]);
      return withDelay(inquiry);
    }

    if (path === '/tours') {
      const remote = await tryRemote('POST', path, { payload, auth: true });
      if (remote) {
        saveTours([remote.data, ...getStoredTours().filter(item => item._id !== remote.data?._id)]);
        return remote;
      }

      if (!isLocalEnvironment()) {
        return reject('Tour changes could not be saved because the API is not connected.', 503);
      }

      const tour = normalizeTour({
        _id: `tour-${Date.now()}`,
        featured: true,
        reviews: 0,
        rating: 5,
        ...payload,
      });
      saveTours([tour, ...getStoredTours()]);
      return withDelay(tour);
    }

    if (path === '/upload') {
      const remote = await tryRemote('POST', path, { payload, auth: true, isFormData: true });
      if (remote) return remote;

      if (!isLocalEnvironment()) {
        return reject('Image upload is unavailable because the API is not connected.', 503);
      }

      const file = payload?.get?.('image');
      if (!file) return reject('No image selected.', 400);
      return withDelay({
        url: URL.createObjectURL(file),
        originalName: file.name,
      });
    }

    if (path === '/settings') {
      const remote = await tryRemote('POST', path, { payload, auth: true });
      if (remote) {
        const merged = mergeSettings(remote.data || {});
        saveSettings(merged);
        return { data: merged };
      }

      if (!isLocalEnvironment()) {
        return reject('Settings were not saved to the server. Please check the API and database connection.', 503);
      }

      const settings = saveSettings(payload);
      return withDelay(settings);
    }

    return reject(`Unsupported POST ${path}`, 404);
  },

  async delete(path) {
    const remote = await tryRemote('DELETE', path, { auth: true });
    if (remote) {
      if (path.startsWith('/tours/')) {
        const id = path.split('/').pop();
        saveTours(getStoredTours().filter(item => item._id !== id));
      }
      return remote;
    }

    if (!isLocalEnvironment()) {
      return reject('Delete action could not be completed because the API is not connected.', 503);
    }

    if (!path.startsWith('/tours/')) return reject(`Unsupported DELETE ${path}`, 404);
    const id = path.split('/').pop();
    saveTours(getStoredTours().filter(item => item._id !== id));
    return withDelay({ success: true });
  },
};
