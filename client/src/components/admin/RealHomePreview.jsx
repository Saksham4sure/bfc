import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Award,
  Users,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Star,
  Lightbulb,
  Compass,
  Heart,
  MapPin,
  PhoneCall,
  Clock,
  Phone,
  Mail,
  ChevronDown,
} from 'lucide-react'
import HeroSlider from '../features/home/HeroSlider'
import WelcomeStoriesSection from '../features/home/WelcomeStoriesSection'
import { COLLEGE_INFO, STATIC_NAV_LINKS } from '../../utils/constants'

const ICON_MAP = {
  BookOpen,
  Award,
  Users,
  ShieldCheck,
  Star,
  Lightbulb,
  Compass,
  Heart,
}

/**
 * RealHomePreview renders the EXACT real Home Page components
 * utilizing live draft data from the admin inputs in real time.
 */
export default function RealHomePreview({ data = {}, focusSection = 'all' }) {
  const homeData = data || {}
  const stats = homeData.stats || []
  const welcomeStories = homeData.welcomeStories || []
  const aboutSection = homeData.aboutSection || {}
  const pillars = aboutSection.pillars || []
  const noticesSection = homeData.noticesSection || {}
  const ctaBanner = homeData.ctaBanner || {}
  const heroSlides = homeData.heroSlides || []
  const heroSliderTheme = homeData.heroSliderTheme || 'awwwards-cinematic'

  const sampleNotices = [
    {
      id: 'n1',
      title: 'Terminal Examination Routine Announced',
      category: 'Examination',
      content: 'Students can collect admit cards and verify exam routines from department desks.',
      createdAt: '2026-10-15',
      important: true,
    },
    {
      id: 'n2',
      title: 'Admissions Open for Grade XI (Science & Management)',
      category: 'Admissions',
      content: 'Registration for entrance examination in Grade XI has begun. Apply online or at the desk.',
      createdAt: '2026-10-12',
      important: false,
    },
    {
      id: 'n3',
      title: 'Annual Sports & Athletic Meet 2026',
      category: 'Events',
      content: 'Inter-house tournaments and athletic registrations are open this week.',
      createdAt: '2026-10-08',
      important: false,
    },
  ]

  return (
    <div className="w-full bg-white text-zinc-900 select-none">
      {/* -------------------------------------------------------------
       * Real Top Info Bar (Preview)
       * ------------------------------------------------------------- */}
      <div className="bg-zinc-950 text-zinc-400 text-xs py-2 px-4 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 sm:gap-6 text-zinc-400 text-[11px]">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              {COLLEGE_INFO.address}
            </span>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <span className="flex items-center gap-1.5 font-medium">
              <PhoneCall className="w-3.5 h-3.5 text-zinc-400" />
              {COLLEGE_INFO.phone}
            </span>
            <span className="hidden md:inline text-zinc-700">|</span>
            <span className="hidden md:flex items-center gap-1 text-zinc-400">
              <Clock className="w-3.5 h-3.5" />
              {COLLEGE_INFO.openingHours}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-300 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1CA24B]"></span>
              Admissions Open 2026/27
            </span>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
       * Real Navbar (Preview)
       * ------------------------------------------------------------- */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <img
              src="/bfc.png"
              alt="BFC Logo"
              className="w-12 h-12 object-contain rounded-xl shrink-0 drop-shadow-2xs"
            />
            <div>
              <span className="block text-lg font-black tracking-tight text-zinc-900 leading-tight">
                {COLLEGE_INFO.shortName}
              </span>
              <span className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                School &amp; College &bull; Lalitpur
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {STATIC_NAV_LINKS.map((link) => (
              <span
                key={link.id}
                className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-700 hover:text-zinc-950 cursor-pointer"
              >
                {link.label}
              </span>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-zinc-950 cursor-pointer shadow-xs">
              <span>Apply Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
       * 1. Real Hero Slider with Live Theme & Slides
       * ------------------------------------------------------------- */}
      <section id="preview-hero">
        <HeroSlider
          customSlides={heroSlides}
          themeOverride={heroSliderTheme}
          inPreview={true}
        />
      </section>

      {/* -------------------------------------------------------------
       * 2. Real Welcome & Feature Stories
       * ------------------------------------------------------------- */}
      <section id="preview-stories">
        <WelcomeStoriesSection stories={welcomeStories} />
      </section>

      {/* -------------------------------------------------------------
       * 3. Real Key Statistics Bar
       * ------------------------------------------------------------- */}
      {stats.length > 0 && (
        <section id="preview-stats" className="bg-white border-b border-zinc-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-2 md:grid-cols-${Math.min(stats.length, 4)} gap-6 text-center`}>
              {stats.map((stat, idx) => (
                <div key={stat.id || idx}>
                  <div className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-xs font-semibold text-zinc-500 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------
       * 4. Real Core Academic Pillars
       * ------------------------------------------------------------- */}
      <section id="preview-pillars" className="py-20 bg-zinc-50/70 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            {aboutSection.badge && (
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                {aboutSection.badge}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 mt-2 mb-3 tracking-tight">
              {aboutSection.title || 'Committed to Academic & Personal Growth'}
            </h2>
            {aboutSection.description && (
              <p className="text-zinc-600 text-sm leading-relaxed">
                {aboutSection.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((feature, i) => {
              const Icon = ICON_MAP[feature.icon] || BookOpen
              return (
                <div
                  key={feature.id || i}
                  className="p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-800 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
       * 5. Real Notices & Circulars Feed Preview
       * ------------------------------------------------------------- */}
      <section id="preview-notices" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                {noticesSection.badge || 'Bulletin Board'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 mt-1 tracking-tight">
                {noticesSection.title || 'Latest Notices & Events'}
              </h2>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-800 cursor-pointer">
              <span>{noticesSection.viewAllText || 'View all notices & events'}</span>
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleNotices.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-white p-6 rounded-2xl border border-zinc-200 flex flex-col justify-between hover:border-zinc-300 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono bg-zinc-100 text-zinc-700">
                      {item.category}
                    </span>
                    {item.important && (
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-900 text-white uppercase">
                        Important
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-600 mb-4 leading-relaxed line-clamp-3">
                    {item.content}
                  </p>
                </div>
                <div className="text-xs text-zinc-400 pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <span className="font-mono">{item.createdAt}</span>
                  <span className="text-zinc-900 font-semibold cursor-pointer">Read &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
       * 6. Real Call To Action Banner
       * ------------------------------------------------------------- */}
      {ctaBanner.title && (
        <section id="preview-cta" className="bg-zinc-950 text-white py-14 border-t border-zinc-850">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                {ctaBanner.title}
              </h2>
              {ctaBanner.description && (
                <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-lg leading-relaxed">
                  {ctaBanner.description}
                </p>
              )}
            </div>
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 text-xs sm:text-sm font-bold shadow-md cursor-pointer shrink-0">
              <span>{ctaBanner.buttonText || 'Apply Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------
       * Real Footer (Preview)
       * ------------------------------------------------------------- */}
      <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <img src="/bfc.png" alt="Logo" className="w-6 h-6 object-contain rounded bg-white p-0.5" />
            <span>&copy; 2026 {COLLEGE_INFO.name}. All rights reserved.</span>
          </div>
          <div className="text-zinc-400 font-mono text-[11px]">
            Satdobato, Lalitpur &bull; Phone: 01-5434319
          </div>
        </div>
      </footer>
    </div>
  )
}
