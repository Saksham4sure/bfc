# Bright Future School / College Web Platform & Dynamic CMS

A dynamic, full-stack college website and administration management system for **Bright Future School/College**.

---

## 🎨 Brand Identity
- **Main Theme Color**: `#1CA24B` (Brand Emerald Green)
- **Palette**: `#1CA24B` (primary), `#16843c` (hover/dark), `#e8f7ee` (subtle emerald tint), `#0b2414` (forest dark)
- **Public Security**: Direct admin links and portal shortcuts are hidden from the user-facing interface. Admin access is available via direct route (`/admin/login`).

---

## 🛠 Tech Stack

### Frontend (`client/`)
- **Core**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Routing**: React Router DOM (`react-router-dom` v7)
- **Homepage Slider**: Swiper (`swiper/react` with Autoplay, Navigation, Pagination, EffectFade)
- **Animations**: GSAP
- **Icons**: Lucide React (`lucide-react`)

### Backend (`server/`)
- **Runtime & Framework**: Node.js (ESM) + Express
- **Database & ORM**: PostgreSQL + Prisma ORM (`@prisma/client`)
- **Authentication & Security**: JSON Web Tokens (`jsonwebtoken`) + Password Hashing (`bcrypt`) + CORS (`cors`)
- **File & Media Storage**: Multer (Memory Storage) + Cloudinary API (`cloudinary`)
- **Architecture**: Controller pattern (`*.controller.js`) and Route modularization (`*.routes.js`)

---

## 🌟 Dynamic Features Configured

1. **Top Homepage Swiper Slider (`HeroSlider.jsx`)**:
   - Fade effect, autoplays smoothly with branded `#1CA24B` pagination bullets and navigation arrows.
   - Dynamic API: `GET /api/sliders` (Public), `POST / PUT / DELETE /api/sliders` (Admin).
   - Admin Management Page: `/admin/sliders` ([ManageSlidersPage.jsx](file:///home/sunfyre/Documents/bfc-proj/client/src/pages/admin/ManageSlidersPage.jsx)).

2. **Dynamic Navbar with Multi-Link Nested Dropdowns (`Navbar.jsx`)**:
   - Customizable menu with parent items and child dropdown links (e.g. "Programs & Academics" with sub-links for School, +2 Science, +2 Management, +2 Humanities & Law).
   - Dynamic API: `GET /api/nav` (Public), `POST / PUT / DELETE /api/nav` (Admin).
   - Admin Management Page: `/admin/navbar` ([ManageNavbarPage.jsx](file:///home/sunfyre/Documents/bfc-proj/client/src/pages/admin/ManageNavbarPage.jsx)).

3. **Notice Board & Events Calendar**:
   - Published student circulars, examination routines, and admissions announcements.

4. **Photo Gallery & Faculty Directory**:
   - Cloudinary & Multer cloud media storage sync.

---

## 📂 Project Structure

```text
bfc-proj/
├── client/                     # Frontend Vite + React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Navbar (Dynamic with dropdowns), Footer (No admin links)
│   │   │   └── features/
│   │   │       └── home/       # HeroSlider.jsx (Swiper slider)
│   │   ├── context/            # AuthContext (JWT & state management)
│   │   ├── layouts/            # RootLayout (Public) & AdminLayout (CMS Portal)
│   │   ├── pages/
│   │   │   ├── public/         # HomePage, About, Academics, Admissions, Notices, Gallery, Contact, NotFound
│   │   │   └── admin/          # AdminLoginPage, AdminDashboardPage, ManageSlidersPage, ManageNavbarPage, ManageNoticesPage, ManageEventsPage, ManageGalleryPage, ManageFacultyPage, ManageSettingsPage
│   │   ├── routes/             # AppRoutes.jsx
│   │   ├── services/           # api.js (Fetch wrapper with Bearer token)
│   │   ├── utils/              # constants.js (College details, navigation links, theme)
│   │   ├── App.jsx
│   │   ├── index.css           # Tailwind CSS & Swiper CSS imports, #1CA24B theme variables
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
└── server/                     # Backend Express + Prisma application
    ├── prisma/
    │   └── schema.prisma       # Prisma models: User, NavItem, HeroSlide, Notice, Event, GalleryItem, Faculty, AdmissionApplication, ContactInquiry, SiteSetting
    ├── src/
    │   ├── config/             # db.js (Prisma Client), cloudinary.js
    │   ├── controllers/        # auth.controller.js, nav.controller.js, slider.controller.js, notice.controller.js, event.controller.js, gallery.controller.js, faculty.controller.js, admission.controller.js, inquiry.controller.js, settings.controller.js
    │   ├── middlewares/        # auth.middleware.js, upload.middleware.js, error.middleware.js
    │   ├── routes/             # auth.routes.js, nav.routes.js, slider.routes.js, notice.routes.js, event.routes.js, gallery.routes.js, faculty.routes.js, admission.routes.js, inquiry.routes.js, settings.routes.js
    │   ├── utils/              # jwt.js, apiResponse.js
    │   ├── prisma/             # seed.js (Default Super Admin & settings seeder)
    │   ├── app.js              # Express app, middleware mounting, API endpoints
    │   └── server.js           # Server bootstrap & graceful shutdown
    ├── .env.example
    └── package.json
```

---

## 🚀 Getting Started

### 1. Backend Setup (`server/`)

```bash
cd server

# 1. Setup environment variables
cp .env.example .env
# Edit .env with your PostgreSQL credentials & Cloudinary keys

# 2. Generate Prisma Client
npm run prisma:generate

# 3. Apply database migrations (when PostgreSQL is connected)
npm run prisma:migrate

# 4. Seed initial Super Admin and defaults (Optional)
npm run seed

# 5. Start development server
npm run dev
```

### 2. Frontend Setup (`client/`)

```bash
cd client

# 1. Setup environment variables
cp .env.example .env

# 2. Start Vite development server
npm run dev
```

---

## 🔑 Default Seed Admin Credentials
- **Email**: `admin@brightfuture.edu.np`
- **Password**: `admin123`
- **Admin Access URL**: `http://localhost:5173/admin/login`
*(Note: Direct login links are not displayed to public visitors on the website)*
