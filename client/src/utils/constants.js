export const COLLEGE_INFO = {
  name: 'Bright Future School / College',
  shortName: 'Bright Future',
  tagline: 'Empowering Young Minds for a Brighter Tomorrow',
  established: '2005',
  logo: '/bfc.png',
  address: 'Satdobato, Lalitpur, Nepal',
  email: 'info@bfc.edu.np',
  phone: '01-5434319 / 9851153747',
  mobilePhones: ['9851153747', '9851153746', '9851020251', '9843042785'],
  landlines: ['01-5434319', '01-5454894', '01-5444807'],
  openingHours: '5:00 AM - 5:00 PM',
  accreditation: 'Affiliated with National Examination Board (NEB)',
  themeColor: '#1CA24B',
}

export const DEFAULT_NAV_LINKS = [
  { id: '1', label: 'Home', path: '/', order: 0 },
  { id: '2', label: 'About Us', path: '/about', order: 1 },
  {
    id: '3',
    label: 'Programs & Academics',
    path: '/academics',
    order: 2,
    children: [
      { id: '3-1', label: 'School Level (Grades 1-10)', path: '/academics', description: 'Foundational secondary schooling' },
      { id: '3-2', label: '+2 Science Stream', path: '/academics', description: 'Pre-medical & engineering' },
      { id: '3-3', label: '+2 Management Stream', path: '/academics', description: 'Business & accountancy' },
      { id: '3-4', label: '+2 Humanities & Law', path: '/academics', description: 'Jurisprudence & civic studies' },
    ],
  },
  { id: '4', label: 'Admissions', path: '/admissions', order: 3 },
  { id: '5', label: 'Notices', path: '/notices', order: 4 },
  { id: '6', label: 'Campus Gallery', path: '/gallery', order: 5 },
  { id: '7', label: 'Contact', path: '/contact', order: 6 },
]

export const ADMIN_NAV_LINKS = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: 'LayoutDashboard' },
  { name: 'Home Page', path: '/admin/pages/home', icon: 'Home' },
  { name: 'About Us Page', path: '/admin/pages/about', icon: 'Info' },
  { name: 'Academics Page', path: '/admin/pages/academics', icon: 'GraduationCap' },
  { name: 'Admissions Page', path: '/admin/pages/admissions', icon: 'FileCheck' },
  { name: 'Notices & News', path: '/admin/pages/notices', icon: 'Bell' },
  { name: 'Photo Gallery', path: '/admin/pages/gallery', icon: 'Image' },
  { name: 'Faculty & Staff', path: '/admin/pages/faculty', icon: 'Users' },
  { name: 'Contact Page', path: '/admin/pages/contact', icon: 'Phone' },
  { name: 'Dynamic Navbar', path: '/admin/navbar', icon: 'Menu' },
  { name: 'Site Settings', path: '/admin/settings', icon: 'Settings' },
]
