import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'
import { COLLEGE_INFO } from '../utils/constants'

// Initial defaults for all pages
export const DEFAULT_PAGE_DATA = {
  home: {
    heroSliderTheme: 'awwwards-cinematic',
    heroSlides: [
      {
        id: 's-1',
        badge: 'Admissions Open 2026/2027',
        title: 'Empowering Young Minds For A Brighter Tomorrow',
        subtitle: 'Nurturing intellectual curiosity, personal integrity, and creative potential through comprehensive schooling and higher secondary excellence in Nepal.',
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=85',
        buttonText: 'Enroll Online Today',
        buttonLink: '/admissions',
        isActive: true,
      },
      {
        id: 's-2',
        badge: 'Premier Academic Pathways',
        title: '+2 Science, Management & Humanities',
        subtitle: 'Modern laboratory facilities, experienced faculty mentors, and competitive entrance preparation for future medical and engineering careers.',
        imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1920&q=85',
        buttonText: 'Explore Academics',
        buttonLink: '/academics',
        isActive: true,
      },
      {
        id: 's-3',
        badge: 'Campus Life & Innovation',
        title: 'Excellence in Academics, Sports & Research',
        subtitle: 'Fostering analytical thinkers through science research symposia, athletic tournaments, and leadership development programs.',
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=85',
        buttonText: 'Campus Gallery',
        buttonLink: '/gallery',
        isActive: true,
      },
    ],
    stats: [
      { id: 'stat-1', number: '20+', label: 'Years of Excellence' },
      { id: 'stat-2', number: '100%', label: 'Board Pass Rate' },
      { id: 'stat-3', number: '50+', label: 'Faculty Members' },
      { id: 'stat-4', number: '2500+', label: 'Graduated Alumni' },
    ],
    aboutSection: {
      badge: `About ${COLLEGE_INFO.shortName}`,
      title: 'Committed to Academic & Personal Growth',
      description: 'We empower learners through modern pedagogy, comprehensive lab practicals, and structured student development.',
      pillars: [
        {
          id: 'pil-1',
          icon: 'BookOpen',
          title: 'Structured Curriculum',
          desc: 'Rigorous national framework for Science, Management, Humanities, and School foundation.',
        },
        {
          id: 'pil-2',
          icon: 'Users',
          title: 'Dedicated Mentors',
          desc: 'Experienced faculty providing individualized academic support and guidance.',
        },
        {
          id: 'pil-3',
          icon: 'Award',
          title: 'Modern Science & Tech',
          desc: 'Well-equipped laboratories for practical inquiry in Physics, Chemistry, and Computing.',
        },
        {
          id: 'pil-4',
          icon: 'ShieldCheck',
          title: 'Character & Values',
          desc: 'Encouraging integrity, mutual respect, civic responsibility, and leadership.',
        },
      ],
    },
    noticesSection: {
      badge: 'Bulletin Board',
      title: 'Latest Notices',
      viewAllText: 'View all notices',
      maxDisplay: 3,
    },
    ctaBanner: {
      title: 'Admissions Open for 2026/2027',
      description: 'Submit your admission application online or contact our counseling desk for guidance.',
      buttonText: 'Apply Now',
      buttonLink: '/admissions',
    },
    welcomeStories: [
      {
        id: 'story-1',
        indicator: 'Welcome to Bright Future',
        title: 'A Premier Institution for Schooling & +2 Academic Excellence in Satdobato, Lalitpur',
        paragraphs: [
          'Welcome to Bright Future School / College (BFC), where modern academic pedagogy blends seamlessly with personal integrity, critical thinking, and innovation. Located in Satdobato, Lalitpur, our institution offers an inclusive environment from School Level (Grade 1-10) to prestigious +2 Science, Management, and Humanities & Law programs.',
          'With well-equipped modern science labs, dedicated entrance preparation mentoring, and an expansive curriculum, we empower students to thrive in university examinations, medical and engineering boards, and global careers.',
        ],
        imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
        theme: 'text-left-image-right',
        buttonText: 'Explore Campus Life',
        buttonLink: '/about',
      },
      {
        id: 'story-2',
        indicator: "Principal's Desk & Message",
        title: 'Nurturing Global Innovators, Visionary Leaders & Lifelong Scholars',
        paragraphs: [
          'Education at Bright Future goes far beyond rote memorization. We inspire students to question, explore, experiment, and lead with empathy. Every learner is paired with dedicated mentor guidance and hands-on laboratory discovery.',
          'We warmly invite parents and prospective students to visit our campus in Satdobato, Lalitpur, and discover our vibrant academic culture.',
        ],
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
        theme: 'image-left-text-right',
        buttonText: 'Read Our Vision',
        buttonLink: '/about',
      },
    ],
  },

  about: {
    header: {
      badge: 'About Our Institution',
      title: 'Shaping the Future with Knowledge & Values',
      description: `Founded in ${COLLEGE_INFO.established}, ${COLLEGE_INFO.name} has grown into a premier educational sanctuary offering progressive education from school foundation to higher secondary excellence.`,
    },
    vision: {
      title: 'Our Vision',
      description: 'To be a center of educational innovation and academic leadership, nurturing visionary citizens who contribute meaningfully to national development and the global community.',
    },
    mission: {
      title: 'Our Mission',
      description: 'To provide accessible, high-standard education blending academic rigor, digital fluency, moral uprightness, and extracurricular leadership.',
    },
    coreValues: [
      { id: 'val-1', title: 'Academic Integrity', desc: 'Promoting honesty, originality, and intellectual rigor.' },
      { id: 'val-2', title: 'Inclusivity', desc: 'Cultivating a supportive environment for students of all backgrounds.' },
      { id: 'val-3', title: 'Innovation', desc: 'Embracing contemporary technologies and dynamic teaching methods.' },
      { id: 'val-4', title: 'Leadership', desc: 'Empowering students to take initiative with empathy and purpose.' },
    ],
  },

  academics: {
    header: {
      badge: 'Academic Programs',
      title: 'Curriculum Tailored for Future Pioneers',
      description: "Explore our diverse academic pathways designed to challenge intellect and unlock students' maximum potential.",
    },
    programs: [
      {
        id: 'prog-1',
        level: 'Secondary School (Grade 9 & 10)',
        description: 'Comprehensive curriculum focused on foundational sciences, mathematics, social studies, and language arts preparing students for SEE.',
        features: [
          'Modern Science & Computer Labs',
          'Remedial & Advanced Classes',
          'Co-curricular sports & arts',
        ],
      },
      {
        id: 'prog-2',
        level: '+2 Science Stream',
        description: 'Rigorous pre-university program tailored for future doctors, engineers, researchers, and technologists.',
        features: [
          'Physics, Chemistry, Biology & Mathematics',
          'Medical & Engineering Entrance Preparation Support',
          'Research project mentorship',
        ],
      },
      {
        id: 'prog-3',
        level: '+2 Management Stream',
        description: 'Dynamic commercial program focusing on business acumen, financial literacy, economics, and hotel management.',
        features: [
          'Accountancy, Economics & Business Studies',
          'Computer Science / Hotel Management lab',
          'Case studies & field visits',
        ],
      },
      {
        id: 'prog-4',
        level: '+2 Humanities & Law',
        description: 'Fosters critical thinking, civic understanding, jurisprudence, sociology, and mass communication.',
        features: [
          'Moot Court sessions',
          'Constitutional studies & civic forums',
          'Creative writing & journalism projects',
        ],
      },
    ],
  },

  admissions: {
    header: {
      badge: 'Admissions 2026/2027',
      title: 'Online Admission Application',
      description: 'Fill out the form below to begin your admission process at Bright Future School/College.',
      isOpen: true,
      session: '2026/2027',
    },
    programs: [
      'School Level (Grades 1-10)',
      '+2 Science',
      '+2 Management',
      '+2 Humanities & Law',
    ],
    applications: [
      {
        id: 'app-1',
        fullName: 'Aayush Sharma',
        email: 'aayush.sharma@example.com',
        phone: '+977 9841234567',
        program: '+2 Science',
        previousSchool: 'Kathmandu Model School',
        gpaScore: '3.85',
        message: 'Interested in robotics club and medical entrance batch.',
        status: 'ACCEPTED',
        createdAt: '2026-10-12',
      },
      {
        id: 'app-2',
        fullName: 'Pooja Thapa',
        email: 'pooja.t@example.com',
        phone: '+977 9812345678',
        program: '+2 Management',
        previousSchool: 'Ideal High School',
        gpaScore: '3.60',
        message: 'Looking forward to business studies and economics.',
        status: 'REVIEWED',
        createdAt: '2026-10-14',
      },
      {
        id: 'app-3',
        fullName: 'Rohan Shrestha',
        email: 'rohan.s@example.com',
        phone: '+977 9801122334',
        program: '+2 Humanities & Law',
        previousSchool: 'Valley Public School',
        gpaScore: '3.40',
        message: 'Passionate about constitutional law and debate.',
        status: 'PENDING',
        createdAt: '2026-10-16',
      },
    ],
  },

  notices: {
    header: {
      badge: 'Official Bulletin',
      title: 'Notices & Circulars',
    },
    items: [
      {
        id: 'not-1',
        title: 'Admissions Open for Academic Session 2026/2027',
        category: 'Admissions',
        content: 'Registration for entrance examination in Grade XI Science and Management has begun. Collect forms from the counter or apply online.',
        createdAt: '2026-10-01',
        important: true,
        fileUrl: '',
      },
      {
        id: 'not-2',
        title: 'Terminal Examination Routine Announced',
        category: 'Examination',
        content: 'Students can collect admit cards and verify exam routines from their respective department desks.',
        createdAt: '2026-09-25',
        important: false,
        fileUrl: '',
      },
      {
        id: 'not-3',
        title: 'Science & Robotics Exhibition 2026',
        category: 'Events',
        content: 'All science club students are requested to finalize project proposals by this Friday.',
        createdAt: '2026-09-20',
        important: false,
        fileUrl: '',
      },
    ],
    events: [
      {
        id: 'ev-1',
        title: 'Daily standup & Assembly',
        category: 'Work',
        date: '2026-10-07',
        timeRange: '09 AM - 10 AM',
        location: 'Main Assembly Hall',
        description: 'Morning department briefing and daily academic objectives.',
      },
      {
        id: 'ev-2',
        title: 'Weekly Review',
        category: 'Work',
        date: '2026-10-08',
        timeRange: '10 AM - 12 PM',
        location: 'Conference Room 1',
        description: 'Weekly review of curriculum delivery and student performance boards.',
      },
      {
        id: 'ev-3',
        title: 'Check Up to Doctor',
        category: 'Personal',
        date: '2026-10-09',
        timeRange: '09 AM - 10 AM',
        location: 'Campus Health Clinic',
        description: 'Routine medical wellness checks and athletic medical screenings.',
      },
      {
        id: 'ev-4',
        title: 'Bazaar & Project Fair',
        category: 'Events',
        date: '2026-10-09',
        timeRange: '10 AM - 12 PM',
        location: 'Central Lawn & Courtyard',
        description: 'Annual college bazaar, STEM exhibits, and business stalls.',
      },
      {
        id: 'ev-5',
        title: 'Agencies Birthday & Foundation Day',
        category: 'Events',
        date: '2026-10-07',
        timeRange: '11 AM - 01 PM',
        location: 'Auditorium Hall A',
        description: 'Annual Institutional Milestone commemoration and award honors.',
      },
      {
        id: 'ev-6',
        title: 'Lunch Break',
        category: 'Breaks',
        date: '2026-10-09',
        timeRange: '12 PM - 01 PM',
        location: 'Campus Dining Hall',
        description: 'Community lunch and informal peer discussions.',
      },
    ],
  },

  gallery: {
    header: {
      badge: 'Campus Life',
      title: 'Photo & Media Gallery',
      description: 'Explore the vibrant spirit, academic laboratories, athletic events, and cultural milestones of Bright Future.',
    },
    items: [
      {
        id: 'img-1',
        title: 'Main Academic Block & Central Courtyard',
        category: 'Campus',
        url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'img-2',
        title: 'Advanced Science Practical Laboratory',
        category: 'Laboratory',
        url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'img-3',
        title: 'Annual Inter-College Sports Meet',
        category: 'Sports',
        url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'img-4',
        title: 'High-Speed Computing & Digital Resource Center',
        category: 'Campus',
        url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'img-5',
        title: 'Robotics & STEM Project Demonstrations',
        category: 'Laboratory',
        url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'img-6',
        title: 'Cultural Festival & Musical Performances',
        category: 'Events',
        url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },

  faculty: {
    header: {
      badge: 'Faculty & Mentors',
      title: 'Our Dedicated Educators',
      description: 'Learn from highly qualified faculty members and academic advisors committed to student achievement.',
    },
    items: [
      {
        id: 'fac-1',
        name: 'Dr. Ramesh Adhikari',
        designation: 'Principal & Head of Academics',
        department: 'Administration',
        email: 'principal@brightfuture.edu.np',
        phone: '+977 1-4XXXXXX',
        bio: 'Over 22 years of educational leadership and curriculum design.',
      },
      {
        id: 'fac-2',
        name: 'Prof. Sunita Shrestha',
        designation: 'Senior Faculty & Coordinator',
        department: 'Science Department',
        email: 'sunita.s@brightfuture.edu.np',
        phone: '+977 1-4XXXXXX',
        bio: 'Specialist in Organic Chemistry and pre-medical counseling.',
      },
      {
        id: 'fac-3',
        name: 'Bikram Thapa',
        designation: 'Program Coordinator',
        department: 'Management Department',
        email: 'b.thapa@brightfuture.edu.np',
        phone: '+977 1-4XXXXXX',
        bio: 'Expertise in financial accounting and business entrepreneurship.',
      },
    ],
  },

  contact: {
    header: {
      badge: 'Get In Touch',
      title: 'We Are Here to Assist You',
      description: 'Have questions about admissions, academic programs, or campus visits? Reach out to our administration desk.',
    },
    info: {
      address: COLLEGE_INFO.address,
      phone: COLLEGE_INFO.phone,
      mobilePhones: COLLEGE_INFO.mobilePhones,
      landlines: COLLEGE_INFO.landlines,
      email: COLLEGE_INFO.email,
      hours: 'Sunday – Friday: 5:00 AM – 5:00 PM',
      saturday: 'Saturday: Closed',
    },
    inquiries: [
      {
        id: 'inq-1',
        name: 'Suresh Bhattarai',
        email: 'suresh.b@gmail.com',
        subject: 'Inquiry regarding +2 Science admission deadlines',
        message: 'Could you please let me know if scholarship entrance forms are still accepted this week?',
        date: '2026-10-15',
        isRead: false,
      },
      {
        id: 'inq-2',
        name: 'Anita Gurung',
        email: 'anita.g@yahoo.com',
        subject: 'Hostel facility and transportation inquiry',
        message: 'We are looking for safe bus routes from Bhaktapur and details regarding girls hostel accommodations.',
        date: '2026-10-13',
        isRead: true,
      },
    ],
  },
}

const CMSContext = createContext(null)

export function CMSProvider({ children }) {
  const [cms, setCms] = useState(() => {
    // 1. Try to load saved pages from localStorage
    const initial = { ...DEFAULT_PAGE_DATA }
    for (const key of Object.keys(DEFAULT_PAGE_DATA)) {
      try {
        const stored = localStorage.getItem(`bfc_cms_page_${key}`)
        if (stored) {
          const parsed = JSON.parse(stored)
          initial[key] = { ...DEFAULT_PAGE_DATA[key], ...parsed }
        }
      } catch (err) {
        console.warn(`Error loading localStorage for ${key}:`, err)
      }
    }
    return initial
  })

  // Try to load any remote CMS data from backend on startup
  useEffect(() => {
    let isMounted = true
    async function fetchRemotePages() {
      try {
        const res = await api.get('/pages')
        if (isMounted && res?.data?.pages) {
          const remotePages = res.data.pages
          setCms((prev) => {
            const next = { ...prev }
            for (const [slug, content] of Object.entries(remotePages)) {
              if (content && typeof content === 'object') {
                next[slug] = { ...DEFAULT_PAGE_DATA[slug], ...content }
                localStorage.setItem(`bfc_cms_page_${slug}`, JSON.stringify(next[slug]))
              }
            }
            return next
          })
        }
      } catch {
        // Backend DB unavailable, smooth fallback to local state
      }
    }
    fetchRemotePages()
    return () => {
      isMounted = false
    }
  }, [])

  /**
   * Update full content for a page
   */
  const updatePage = async (pageKey, pageContent) => {
    setCms((prev) => {
      const updated = {
        ...prev,
        [pageKey]: pageContent,
      }
      localStorage.setItem(`bfc_cms_page_${pageKey}`, JSON.stringify(pageContent))
      return updated
    })

    // Sync to backend API if available
    try {
      await api.put(`/pages/${pageKey}`, pageContent)
    } catch {
      // Backend may be offline, localStorage persists the update
    }
  }

  /**
   * Update a specific section inside a page (e.g. 'heroSlides', 'stats', 'aboutSection')
   */
  const updatePageSection = async (pageKey, sectionKey, sectionData) => {
    const currentPage = cms[pageKey] || DEFAULT_PAGE_DATA[pageKey] || {}
    const updatedPage = {
      ...currentPage,
      [sectionKey]: sectionData,
    }
    await updatePage(pageKey, updatedPage)
  }

  /**
   * Reset a page to default template values
   */
  const resetPage = async (pageKey) => {
    if (DEFAULT_PAGE_DATA[pageKey]) {
      const defaultContent = DEFAULT_PAGE_DATA[pageKey]
      await updatePage(pageKey, defaultContent)
    }
  }

  /**
   * Add a new student admission application
   */
  const submitAdmissionApplication = async (newApplication) => {
    const currentApps = cms.admissions?.applications || []
    const updatedApps = [
      {
        id: `app-${Date.now()}`,
        status: 'PENDING',
        createdAt: new Date().toISOString().split('T')[0],
        ...newApplication,
      },
      ...currentApps,
    ]
    await updatePageSection('admissions', 'applications', updatedApps)
  }

  /**
   * Add a new contact inquiry
   */
  const submitContactInquiry = async (newInquiry) => {
    const currentInquiries = cms.contact?.inquiries || []
    const updatedInquiries = [
      {
        id: `inq-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        isRead: false,
        ...newInquiry,
      },
      ...currentInquiries,
    ]
    await updatePageSection('contact', 'inquiries', updatedInquiries)
  }

  return (
    <CMSContext.Provider
      value={{
        cms,
        updatePage,
        updatePageSection,
        resetPage,
        submitAdmissionApplication,
        submitContactInquiry,
      }}
    >
      {children}
    </CMSContext.Provider>
  )
}

export function useCMS() {
  const context = useContext(CMSContext)
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider')
  }
  return context
}

export default CMSContext
