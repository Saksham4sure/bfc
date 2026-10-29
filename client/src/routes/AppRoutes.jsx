import { Routes, Route, Navigate } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'
import AdminLayout from '../layouts/AdminLayout'

// Public Pages
import HomePage from '../pages/public/HomePage'
import AboutPage from '../pages/public/AboutPage'
import AcademicsPage from '../pages/public/AcademicsPage'
import AdmissionsPage from '../pages/public/AdmissionsPage'
import NoticesPage from '../pages/public/NoticesPage'
import GalleryPage from '../pages/public/GalleryPage'
import ContactPage from '../pages/public/ContactPage'
import NotFoundPage from '../pages/public/NotFoundPage'

// Admin Pages
import AdminLoginPage from '../pages/admin/AdminLoginPage'
import AdminDashboardPage from '../pages/admin/AdminDashboardPage'
import ManageNavbarPage from '../pages/admin/ManageNavbarPage'
import ManageSettingsPage from '../pages/admin/ManageSettingsPage'

// Custom Page CMS Editors
import EditHomePage from '../pages/admin/pages/EditHomePage'
import EditAboutPage from '../pages/admin/pages/EditAboutPage'
import EditAcademicsPage from '../pages/admin/pages/EditAcademicsPage'
import EditAdmissionsPage from '../pages/admin/pages/EditAdmissionsPage'
import EditNoticesPage from '../pages/admin/pages/EditNoticesPage'
import EditGalleryPage from '../pages/admin/pages/EditGalleryPage'
import EditFacultyPage from '../pages/admin/pages/EditFacultyPage'
import EditContactPage from '../pages/admin/pages/EditContactPage'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Facing Pages */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="academics" element={<AcademicsPage />} />
        <Route path="admissions" element={<AdmissionsPage />} />
        <Route path="notices" element={<NoticesPage />} />
        <Route path="events" element={<NoticesPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      {/* Admin Authentication */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Admin Panel (Custom Page CMS Portal) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />

        {/* Page-by-Page Custom CMS Routes */}
        <Route path="pages/home" element={<EditHomePage />} />
        <Route path="pages/about" element={<EditAboutPage />} />
        <Route path="pages/academics" element={<EditAcademicsPage />} />
        <Route path="pages/admissions" element={<EditAdmissionsPage />} />
        <Route path="pages/notices" element={<EditNoticesPage />} />
        <Route path="pages/gallery" element={<EditGalleryPage />} />
        <Route path="pages/faculty" element={<EditFacultyPage />} />
        <Route path="pages/contact" element={<EditContactPage />} />

        {/* Site-wide Configuration */}
        <Route path="navbar" element={<ManageNavbarPage />} />
        <Route path="settings" element={<ManageSettingsPage />} />

        {/* Backward-compatible redirects */}
        <Route path="sliders" element={<Navigate to="/admin/pages/home" replace />} />
        <Route path="notices" element={<Navigate to="/admin/pages/notices" replace />} />
        <Route path="events" element={<Navigate to="/admin/pages/notices" replace />} />
        <Route path="gallery" element={<Navigate to="/admin/pages/gallery" replace />} />
        <Route path="faculty" element={<Navigate to="/admin/pages/faculty" replace />} />
        <Route path="inquiries" element={<Navigate to="/admin/pages/contact" replace />} />
      </Route>

      {/* Fallback 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
