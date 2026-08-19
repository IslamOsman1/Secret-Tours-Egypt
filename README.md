# Secret Tours Egypt

A frontend-only tourism website inspired by the content structure and travel-first browsing patterns of modern Egypt tour sites, with a distinct Secret Tours Egypt visual system.

## Stack
- Frontend: React + Vite + React Router + i18next
- Storage: browser `localStorage` for demo tours, inquiries and admin data
- Recommended hosting: Vercel, Netlify or any static hosting for the `client` build

## Included
- Responsive premium travel homepage
- Tour listing, filters and tour detail pages
- Nile cruise / day trip category routes
- Tailor-made trip request form
- About, Contact and Travel Guide pages
- Floating WhatsApp action
- SEO title/description handling
- 16-language interface with RTL Arabic support
- Admin login and dashboard
- Tour create/list/delete workflow stored locally in the browser
- Inquiry manager with locally saved form submissions
- Local media preview/upload simulation
- General website settings UI for demo purposes

## Languages
English, Arabic, Spanish, French, German, Italian, Portuguese, Russian, Turkish, Chinese, Japanese, Korean, Hindi, Dutch, Polish and Indonesian.

## Local setup
1. `npm run install:client`
2. Copy `.env.example` to `.env`
3. `npm run dev`

Website: `http://localhost:5173`
Admin: `http://localhost:5173/admin`

## Demo admin access
- Email: `admin@secrettoursegypt.com`
- Password: `admin123`

## Notes
- Tours, inquiries and admin state are stored in the current browser only.
- Clearing browser storage resets demo content back to the bundled sample data.
- For the current frontend-only deployment on Vercel, only `VITE_WHATSAPP_NUMBER` is actively used.
- The MongoDB / JWT / Cloudinary variables in `.env.example` are kept in one place for future backend reconnection.
- Replace the sample phone/email/company registration details and demo Unsplash images with the company's real data before launch.
