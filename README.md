# SmileCare Web App ("Healthy Smile, Happy Life")

A production-ready responsive web application for SmileCare dental clinic, engineered with React, Vite, TypeScript, Tailwind CSS, Framer Motion, and Lucide React. Pixel-accurately crafted based on the Stitch UI Design System ("SmileCare Frost") with soft clinical glassmorphism, luminous teal palettes, mint backgrounds, and 3D dental visuals.

---

## 🚀 Running the App Locally

### 1. Installation
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 🏥 Central Clinic Configuration (`src/config/clinic.ts`)
- **Direct Phone / WhatsApp:** `08470077778` (`tel:08470077778`)
- **WhatsApp Link:** [https://wa.me/918470077778?text=Hello%20SmileCare%2C%20I%20want%20to%20book%20an%20appointment](https://wa.me/918470077778?text=Hello%20SmileCare%2C%20I%20want%20to%20book%20an%20appointment)
- **Toll-Free Helpline:** `1800 4123 0923` (`tel:180041230923`)
- **Google Maps Location:** [https://maps.app.goo.gl/bxXdSkQpnSMLRGr77](https://maps.app.goo.gl/bxXdSkQpnSMLRGr77)
- **Address:** 742 Evergreen Terrace, Suite 300, Medical Arts Pavilion, San Francisco, CA 94102
- **Working Hours:** Mon–Sat: 9:00 AM – 8:00 PM; Sun: 10:00 AM – 4:00 PM (Emergency Only)

---

## 📱 Routes & Pages
| Route | Page | Key Features |
|---|---|---|
| `/` | **Splash / Onboarding** | 3-slide carousel, 3D floating tooth animation, Get Started, Sign In modal trigger |
| `/home` | **Home** | Global live search, 4 quick action tiles, promotional hero, upcoming booking card from localStorage, popular treatments, top doctors |
| `/about` | **About Us** | Animated counters (15+ Years, 10K+ Patients, 25+ Specialists, 4.9 Rating), doctor profile modals, clinic photo lightbox |
| `/services` | **Treatments Catalog** | Live search + category filter chips, favorites toggle with persistence, Web Share API, pricing & duration |
| `/services/:id` | **Treatment Details** | Duration/sessions/results pillars, about treatment, highlights checklist, sticky "Book This Treatment" button |
| `/why-us` | **Why Choose Us** | 6 feature cards, interactive before/after drag slider (Day 0 vs Day 28), clinic comparison table |
| `/testimonials` | **Patient Reviews** | Rating breakdown bars, filter chips, video story player modals, "Write a Review" form modal with instant list update |
| `/blog` | **Oral Health Blog** | Category filter chips, search, bookmark toggle, Editor's Pick banner, newsletter signup |
| `/blog/:slug` | **Guide Article Detail** | Live reading progress bar, author credentials, social share, bookmarks, related guides |
| `/contact` | **Contact & Location** | 5 quick cards, contact form with validation + "Send via WhatsApp", embedded Google Maps card, live "Open Now/Closed" badge, FAQ accordion |
| `/book` | **Book Appointment** | Multi-step booking: doctor picker, horizontal date scroller (past dates disabled), time slot picker, type toggle, fee summary |
| `/booking-success` | **Booking Confirmation** | Confetti celebration, checkmark animation, .ics calendar file download, directions, call clinic |
| `/appointments` | **My Appointments** | Upcoming & history tabs, working Reschedule modal with date/time pickers, Cancel confirmation dialog |
| `/offers` | **Special Offers** | Discount packages, copy-to-clipboard coupon code buttons, direct booking links |
| `/messages` | **Care Concierge** | Interactive dental assistant chatbot with simulated instant responses + direct WhatsApp handoff |
| `/profile` | **Patient Records** | Editable profile info, saved favorite services, bookmarked guides, switch account / logout |
| `*` | **404 Page** | Friendly dental-themed not found page with home navigation |

---

## 🎨 Design System Tokens
- **Primary Teal:** `#006a65`, `#1FA8A0`, `#2BB5AA`
- **Surface Canvas:** `#f7f9ff`, `#E6F7F6`, `#CFEFEC`
- **Headings & Navy:** `#011e30`, `#0F2A3D`
- **Secondary Mint:** `#78f4e7`, `#006f67`
- **Glassmorphism:** `rgba(255, 255, 255, 0.85)` with `backdrop-blur-xl` and 1px translucent borders
- **Border Radius:** `16px` to `24px` (`rounded-2xl`, `rounded-3xl`, `rounded-full`)
- **Typography:** `Plus Jakarta Sans` & `Inter`
