import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const languages = [
  ['en','English','🇬🇧'], ['ar','العربية','🇪🇬'], ['es','Español','🇪🇸'], ['fr','Français','🇫🇷'],
  ['de','Deutsch','🇩🇪'], ['it','Italiano','🇮🇹'], ['pt','Português','🇵🇹'], ['ru','Русский','🇷🇺'],
  ['tr','Türkçe','🇹🇷'], ['zh','中文','🇨🇳'], ['ja','日本語','🇯🇵'], ['ko','한국어','🇰🇷'],
  ['hi','हिन्दी','🇮🇳'], ['nl','Nederlands','🇳🇱'], ['pl','Polski','🇵🇱'], ['id','Bahasa Indonesia','🇮🇩']
];

const base = {
  nav: { home: 'Home', tours: 'Tours', cruises: 'Nile Cruises', dayTrips: 'Day Trips', destinations: 'Destinations', blog: 'Travel Guide', about: 'About', tailor: 'Tailor My Trip' },
  hero: { eyebrow: 'Private journeys. Local experts. Real Egypt.', title: 'Discover the Egypt most travelers never see.', text: 'Handcrafted private tours, Nile cruises and tailor-made journeys with 24/7 local support.', cta: 'Explore Tours', secondary: 'Design My Trip' },
  common: { from: 'From', person: '/ person', viewTour: 'View Tour', featured: 'Featured journeys', why: 'Why travel with us', reviews: 'Traveler stories', blog: 'Travel inspiration', contact: 'Talk to an Egypt expert' }
};

const translations = {
  en: base,
  ar: { nav: { home:'الرئيسية',tours:'البرامج السياحية',cruises:'رحلات النيل',dayTrips:'رحلات اليوم الواحد',destinations:'الوجهات',blog:'دليل السفر',about:'من نحن',tailor:'صمّم رحلتك' }, hero:{eyebrow:'رحلات خاصة. خبراء محليون. مصر الحقيقية.',title:'اكتشف مصر التي لا يراها معظم المسافرين.',text:'برامج سياحية خاصة ورحلات نيلية وتجارب مصممة حسب طلبك مع دعم محلي 24/7.',cta:'استكشف الرحلات',secondary:'صمّم رحلتي'}, common:{from:'ابتداءً من',person:'/ للفرد',viewTour:'عرض الرحلة',featured:'رحلات مميزة',why:'لماذا تسافر معنا',reviews:'آراء المسافرين',blog:'دليل وإلهام للسفر',contact:'تحدث مع خبير سياحي'} },
  es: { hero:{title:'Descubre el Egipto que la mayoría de viajeros nunca ve.',text:'Tours privados, cruceros por el Nilo y viajes a medida con asistencia local 24/7.'} },
  fr: { hero:{title:"Découvrez l’Égypte que la plupart des voyageurs ne voient jamais.",text:'Circuits privés, croisières sur le Nil et voyages sur mesure avec assistance locale 24h/24.'} },
  de: { hero:{title:'Entdecke das Ägypten, das die meisten Reisenden nie sehen.',text:'Private Touren, Nilkreuzfahrten und maßgeschneiderte Reisen mit lokalem 24/7-Support.'} },
  it: { hero:{title:"Scopri l'Egitto che la maggior parte dei viaggiatori non vede mai.",text:'Tour privati, crociere sul Nilo e viaggi su misura con assistenza locale 24/7.'} },
  pt: { hero:{title:'Descubra o Egito que a maioria dos viajantes nunca vê.',text:'Passeios privados, cruzeiros no Nilo e viagens personalizadas com suporte local 24/7.'} },
  ru: { hero:{title:'Откройте Египет, который большинство путешественников не видит.',text:'Частные туры, круизы по Нилу и индивидуальные маршруты с местной поддержкой 24/7.'} },
  tr: { hero:{title:'Çoğu gezginin hiç görmediği Mısır’ı keşfedin.',text:'Özel turlar, Nil gezileri ve 7/24 yerel destekle size özel seyahatler.'} },
  zh: { hero:{title:'探索大多数旅行者从未见过的埃及。',text:'私人旅行、尼罗河游轮和定制行程，并提供全天候本地支持。'} },
  ja: { hero:{title:'多くの旅行者がまだ知らないエジプトを発見。',text:'プライベートツアー、ナイルクルーズ、オーダーメイド旅行を24時間の現地サポートで。'} },
  ko: { hero:{title:'대부분의 여행자가 보지 못한 이집트를 만나보세요.',text:'프라이빗 투어, 나일 크루즈, 맞춤 여행과 24시간 현지 지원.'} },
  hi: { hero:{title:'उस मिस्र को खोजें जिसे अधिकांश यात्री कभी नहीं देख पाते।',text:'निजी टूर, नील क्रूज़ और 24/7 स्थानीय सहायता के साथ कस्टम यात्राएँ।'} },
  nl: { hero:{title:'Ontdek het Egypte dat de meeste reizigers nooit zien.',text:'Privétours, Nijlcruises en reizen op maat met 24/7 lokale ondersteuning.'} },
  pl: { hero:{title:'Odkryj Egipt, którego większość podróżnych nigdy nie zobaczy.',text:'Prywatne wycieczki, rejsy po Nilu i podróże szyte na miarę z lokalnym wsparciem 24/7.'} },
  id: { hero:{title:'Temukan Mesir yang jarang dilihat kebanyakan wisatawan.',text:'Tur privat, pelayaran Sungai Nil, dan perjalanan khusus dengan dukungan lokal 24/7.'} }
};

const resources = Object.fromEntries(languages.map(([code]) => [code, { translation: { ...base, ...(translations[code] || {}) } }]));

i18n.use(initReactI18next).init({ resources, lng: localStorage.getItem('ste_lang') || 'en', fallbackLng: 'en', interpolation: { escapeValue: false } });

export default i18n;
