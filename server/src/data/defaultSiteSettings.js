const defaultSiteSettings = {
  companyName: 'Secret Tours Egypt',
  whatsapp: '+20 100 000 0000',
  publicEmail: 'hello@secrettoursegypt.com',
  officeLocation: 'Cairo & Luxor, Egypt',
  currency: 'USD',
  footerDescription: 'Private Egypt tours, Nile cruises and tailor-made journeys created by local experts.',
  footerMap: {
    enabled: true,
    title: 'Find us on the map',
    embedUrl: 'https://www.google.com/maps?q=Luxor%2C%20Egypt&z=13&output=embed'
  },
  countdown: {
    enabled: true,
    title: 'Limited-time Egypt departures',
    subtitle: 'Reserve selected journeys before this offer closes.',
    endDate: '2026-12-31T23:59',
    ctaLabel: 'Book now',
    selectedTourIds: []
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
      { question: 'How do I start a tailor-made trip?', answer: 'Use the tailor-made form with your dates, group size and interests. The team can then prepare a personalized proposal for you.' }
    ],
    testimonials: [
      { name: 'Sofia M.', country: 'Spain', rating: 5, text: 'The organization was flawless from airport pickup to our final Nile cruise day. Our guide made ancient Egypt feel alive.' },
      { name: 'Daniel K.', country: 'Germany', rating: 5, text: 'Fast WhatsApp support, excellent hotels and a very flexible itinerary. Secret Tours Egypt felt personal rather than mass-market.' },
      { name: 'Aiko T.', country: 'Japan', rating: 5, text: 'We traveled as a family and felt comfortable the entire time. The private guide and driver were exceptional.' }
    ],
    blogPosts: [
      { slug: 'best-time-to-visit-egypt', title: 'Best Time to Visit Egypt: A Month-by-Month Guide', date: 'August 2026', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85', excerpt: 'Weather, crowds, Nile cruises and the best months for every travel style.' },
      { slug: 'first-trip-to-egypt', title: '12 Things to Know Before Your First Egypt Trip', date: 'July 2026', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1200&q=85', excerpt: 'Simple advice about transport, tipping, clothing, cash and sightseeing.' },
      { slug: 'nile-cruise-guide', title: 'How to Choose the Right Nile Cruise', date: 'June 2026', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85', excerpt: 'Understand cruise classes, routes, cabin types and what is usually included.' }
    ]
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
      { title: '24/7 support', text: 'A local contact is available throughout the trip whenever you need help.' }
    ]
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
    successText: 'Message saved successfully. You can review it from the admin dashboard.'
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
      '24/7 local support while in Egypt'
    ],
    successTitle: 'Request received',
    successText: 'Thanks! A Secret Tours Egypt specialist will contact you shortly.'
  },
  blogPage: {
    heroEyebrow: 'Travel smarter',
    heroTitle: 'Egypt Travel Guide',
    heroText: 'Local tips, practical planning and inspiration for your next Egyptian adventure.'
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
      { name: 'Western Desert', text: 'Oases, white desert formations and unforgettable stargazing.', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1000&q=85' }
    ]
  }
};

export default defaultSiteSettings;
