import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const languages = [
  ['en', 'English', 'GB'],
  ['ar', 'العربية', 'EG'],
  ['es', 'Español', 'ES'],
  ['fr', 'Français', 'FR'],
  ['de', 'Deutsch', 'DE'],
  ['it', 'Italiano', 'IT'],
  ['pt', 'Português', 'PT'],
  ['ru', 'Русский', 'RU'],
  ['tr', 'Türkçe', 'TR'],
  ['zh', '中文', 'CN'],
  ['ja', '日本語', 'JP'],
  ['ko', '한국어', 'KR'],
  ['hi', 'हिन्दी', 'IN'],
  ['nl', 'Nederlands', 'NL'],
  ['pl', 'Polski', 'PL'],
  ['id', 'Bahasa Indonesia', 'ID']
];

const base = {
  nav: {
    home: 'Home',
    tours: 'Tours',
    cruises: 'Nile Cruises',
    dayTrips: 'Day Trips',
    destinations: 'Destinations',
    blog: 'Travel Guide',
    about: 'About',
    tailor: 'Tailor My Trip'
  },
  hero: {
    eyebrow: 'Private journeys. Local experts. Real Egypt.',
    title: 'Discover the Egypt most travelers never see.',
    text: 'Handcrafted private tours, Nile cruises and tailor-made journeys with 24/7 local support.',
    cta: 'Explore Tours',
    secondary: 'Design My Trip'
  },
  common: {
    from: 'From',
    person: '/ person',
    viewTour: 'View Tour',
    featured: 'Featured journeys',
    why: 'Why travel with us',
    reviews: 'Traveler stories',
    blog: 'Travel inspiration',
    contact: 'Talk to an Egypt expert',
    readGuide: 'Read guide',
    bookNow: 'Book now'
  },
  homePage: {
    countdownEyebrow: 'Special departures',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    whereToGo: 'Where do you want to go?',
    travelStyle: 'Travel style',
    tripLength: 'Trip length',
    findTrip: 'Find my trip',
    allEgypt: 'All Egypt',
    classicEgypt: 'Classic Egypt',
    nileCruise: 'Nile Cruise',
    luxury: 'Luxury',
    adventure: 'Adventure',
    family: 'Family',
    featuredEyebrow: 'Handpicked by our Egypt experts',
    viewAllTours: 'View all tours',
    reviewsEyebrow: 'Real guests, real journeys',
    reviewsText: 'A few words from travelers who explored Egypt with us.',
    blogEyebrow: 'Plan smarter',
    blogText: 'Practical Egypt travel advice from people on the ground.',
    allArticles: 'All articles',
    faqEyebrow: 'Good to know',
    finalEyebrow: 'Your Egypt story starts here'
  },
  toursPage: {
    eyebrow: 'Explore Egypt',
    title: 'Egypt Tours & Travel Packages',
    intro: 'Private, flexible journeys designed by local experts. Every itinerary can be adapted to you.',
    searchPlaceholder: 'Search by tour or destination',
    recommended: 'Recommended',
    priceLow: 'Price: low to high',
    topRated: 'Top rated',
    journeysCount: 'journeys',
    pricesNote: 'All prices shown per person in USD',
    emptyTitle: 'No journeys found',
    emptyText: 'Try a different destination or search term.'
  },
  tourDetails: {
    back: 'Back to tours',
    privateTour: 'Private Tour',
    reviews: 'reviews',
    overviewEyebrow: 'Journey overview',
    overviewTitle: 'A deeper way to experience Egypt',
    overviewText: 'This private journey blends iconic sights with a relaxed local rhythm. Your guide and operations team can adapt timing and optional experiences to suit your pace.',
    highlights: 'Highlights',
    itinerary: 'Day-by-day itinerary',
    day: 'Day',
    included: 'Included',
    notIncluded: 'Not included',
    guide: 'Private licensed guide',
    transfers: 'Air-conditioned transfers',
    accommodation: 'Accommodation as listed',
    assist: 'Meet & assist service',
    flights: 'International flights',
    expenses: 'Personal expenses',
    insurance: 'Travel insurance',
    activities: 'Optional activities',
    planEyebrow: 'Plan this journey',
    requestTitle: 'Request your trip',
    requestText: "Tell us when you're travelling. We'll confirm availability and personalise the details.",
    travelDate: 'Travel date',
    travelers: 'Travelers',
    travelerOne: '1 traveler',
    travelerTwo: '2 travelers',
    travelerThree: '3 travelers',
    travelerFour: '4 travelers',
    travelerFive: '5+ travelers',
    yourName: 'Your name',
    yourContact: 'Email or WhatsApp',
    requestAvailability: 'Request availability',
    whatsappNow: 'Prefer WhatsApp? Chat now',
    noPayment: 'No payment required to request availability.'
  }
};

const arabic = {
  nav: {
    home: 'الرئيسية',
    tours: 'الرحلات',
    cruises: 'رحلات النيل',
    dayTrips: 'الرحلات اليومية',
    destinations: 'الوجهات',
    blog: 'دليل السفر',
    about: 'من نحن',
    tailor: 'صمم رحلتك'
  },
  hero: {
    eyebrow: 'رحلات خاصة. خبراء محليون. مصر الحقيقية.',
    title: 'اكتشف مصر التي لا يراها معظم المسافرين.',
    text: 'رحلات خاصة، كروز نيلية، وبرامج مصممة حسب الطلب مع دعم محلي على مدار الساعة.',
    cta: 'استكشف الرحلات',
    secondary: 'صمم رحلتي'
  },
  common: {
    from: 'ابتداء من',
    person: '/ للفرد',
    viewTour: 'عرض الرحلة',
    featured: 'رحلات مميزة',
    why: 'لماذا تسافر معنا',
    reviews: 'آراء المسافرين',
    blog: 'إلهام السفر',
    contact: 'تحدث مع خبير سفر',
    readGuide: 'اقرأ الدليل',
    bookNow: 'احجز الآن'
  },
  homePage: {
    countdownEyebrow: 'عروض خاصة',
    days: 'أيام',
    hours: 'ساعات',
    minutes: 'دقائق',
    seconds: 'ثواني',
    whereToGo: 'إلى أين تريد الذهاب؟',
    travelStyle: 'نوع الرحلة',
    tripLength: 'مدة الرحلة',
    findTrip: 'ابحث عن رحلتي',
    allEgypt: 'كل مصر',
    classicEgypt: 'مصر الكلاسيكية',
    nileCruise: 'كروز نيلي',
    luxury: 'فاخر',
    adventure: 'مغامرة',
    family: 'عائلية',
    featuredEyebrow: 'مختارة بعناية من خبرائنا في مصر',
    viewAllTours: 'عرض كل الرحلات',
    reviewsEyebrow: 'ضيوف حقيقيون، رحلات حقيقية',
    reviewsText: 'بعض الكلمات من مسافرين اكتشفوا مصر معنا.',
    blogEyebrow: 'خطط بذكاء',
    blogText: 'نصائح عملية للسفر إلى مصر من خبراء على الأرض.',
    allArticles: 'كل المقالات',
    faqEyebrow: 'معلومات مهمة',
    finalEyebrow: 'رحلتك إلى مصر تبدأ هنا'
  },
  toursPage: {
    eyebrow: 'استكشف مصر',
    title: 'رحلات مصر والباقات السياحية',
    intro: 'رحلات خاصة ومرنة يصممها خبراء محليون. يمكن تعديل كل برنامج ليناسبك.',
    searchPlaceholder: 'ابحث باسم الرحلة أو الوجهة',
    recommended: 'موصى به',
    priceLow: 'السعر: من الأقل إلى الأعلى',
    topRated: 'الأعلى تقييما',
    journeysCount: 'رحلة',
    pricesNote: 'كل الأسعار المعروضة للفرد بالدولار',
    emptyTitle: 'لا توجد رحلات',
    emptyText: 'جرّب وجهة أخرى أو كلمة بحث مختلفة.'
  },
  tourDetails: {
    back: 'العودة إلى الرحلات',
    privateTour: 'رحلة خاصة',
    reviews: 'تقييم',
    overviewEyebrow: 'نظرة عامة',
    overviewTitle: 'طريقة أعمق لاكتشاف مصر',
    overviewText: 'تمزج هذه الرحلة الخاصة بين المعالم الشهيرة وإيقاع محلي مريح. يمكن للمرشد وفريق التشغيل تعديل التوقيت والأنشطة الاختيارية بما يناسب سرعتك.',
    highlights: 'أبرز المميزات',
    itinerary: 'البرنامج يومًا بيوم',
    day: 'اليوم',
    included: 'يشمل',
    notIncluded: 'لا يشمل',
    guide: 'مرشد سياحي خاص معتمد',
    transfers: 'تنقلات مكيفة',
    accommodation: 'الإقامة حسب البرنامج',
    assist: 'خدمة الاستقبال والمساعدة',
    flights: 'الطيران الدولي',
    expenses: 'المصاريف الشخصية',
    insurance: 'تأمين السفر',
    activities: 'الأنشطة الاختيارية',
    planEyebrow: 'خطط لهذه الرحلة',
    requestTitle: 'اطلب رحلتك',
    requestText: 'أخبرنا بموعد سفرك وسنؤكد التوفر ونخصص التفاصيل لك.',
    travelDate: 'تاريخ السفر',
    travelers: 'المسافرون',
    travelerOne: 'مسافر واحد',
    travelerTwo: 'مسافران',
    travelerThree: '3 مسافرين',
    travelerFour: '4 مسافرين',
    travelerFive: '5+ مسافرين',
    yourName: 'اسمك',
    yourContact: 'البريد أو واتساب',
    requestAvailability: 'اطلب التوفر',
    whatsappNow: 'تفضل واتساب؟ تحدث الآن',
    noPayment: 'لا يلزم أي دفع لطلب التوفر.'
  }
};

const translations = {
  en: base,
  ar: arabic
};

const resources = Object.fromEntries(
  languages.map(([code]) => [
    code,
    {
      translation: {
        ...base,
        ...(translations[code] || {})
      }
    }
  ])
);

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('ste_lang') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
