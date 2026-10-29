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

// Static, robust navigation links (Not dynamic as requested)
export const STATIC_NAV_LINKS = [
  { id: '1', label: 'Home', path: '/' },
  { id: '2', label: 'About Us', path: '/about' },
  {
    id: '3',
    label: 'Academics',
    path: '/academics',
    children: [
      { id: '3-1', label: 'School Level (Grades 1-10)', path: '/academics', description: 'Comprehensive foundational schooling' },
      { id: '3-2', label: '+2 Science Stream', path: '/academics', description: 'Pre-medical & engineering excellence' },
      { id: '3-3', label: '+2 Management Stream', path: '/academics', description: 'Business studies & accountancy' },
      { id: '3-4', label: '+2 Humanities & Law', path: '/academics', description: 'Jurisprudence & civic leadership' },
    ],
  },
  { id: '4', label: 'Admissions', path: '/admissions' },
  { id: '5', label: 'Notices & Events', path: '/notices' },
  { id: '6', label: 'Campus Gallery', path: '/gallery' },
  { id: '7', label: 'Contact', path: '/contact' },
]

export const DEFAULT_NAV_LINKS = STATIC_NAV_LINKS
