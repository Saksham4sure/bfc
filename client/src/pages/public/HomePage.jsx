import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
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
} from 'lucide-react'
import HeroSlider from '../../components/features/home/HeroSlider'
import WelcomeStoriesSection from '../../components/features/home/WelcomeStoriesSection'
import { useCMS } from '../../context/CMSContext'

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

export default function HomePage() {
  const { cms } = useCMS()
  const homeData = cms.home || {}
  const noticesData = cms.notices || {}

  const stats = homeData.stats || []
  const welcomeStories = homeData.welcomeStories || []
  const aboutSection = homeData.aboutSection || {}
  const pillars = aboutSection.pillars || []
  const noticesSection = homeData.noticesSection || {}
  const ctaBanner = homeData.ctaBanner || {}

  const maxDisplay = noticesSection.maxDisplay || 3
  const latestNotices = (noticesData.items || []).slice(0, maxDisplay)

  const introRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current?.children || [], {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
      })
    }, introRef)

    return () => ctx.revert()
  }, [pillars])

  return (
    <div>
      {/* 1. Dynamic Hero Swiper Slider (Awwwards Animations & Themes) */}
      <HeroSlider />

      {/* 2. Dynamic Welcome & Feature Stories (Minimal Themes) */}
      <WelcomeStoriesSection stories={welcomeStories} />

      {/* 3. Key Statistics Bar (Minimal Monochrome Counter) */}
      {stats.length > 0 && (
        <section className="bg-white border-b border-zinc-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-2 md:grid-cols-${Math.min(stats.length, 4)} gap-6 text-center`}>
              {stats.map((stat, idx) => (
                <div key={stat.id || idx}>
                  <div className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">{stat.number}</div>
                  <div className="text-xs font-semibold text-zinc-500 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Core Academic Pillars (Minimal Grid) */}
      <section ref={introRef} className="py-20 bg-zinc-50/70 border-b border-zinc-200">
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

          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {pillars.map((feature, i) => {
              const Icon = ICON_MAP[feature.icon] || BookOpen
              return (
                <div
                  key={feature.id || i}
                  className="p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-800 group-hover:bg-zinc-900 group-hover:text-white flex items-center justify-center mb-4 transition-colors">
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

      {/* 5. Dynamic Notices Section (Minimal Bulletin) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                {noticesSection.badge || 'Bulletin Board'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 mt-1 tracking-tight">
                {noticesSection.title || 'Latest Notices'}
              </h2>
            </div>
            <Link
              to="/notices"
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-800 hover:text-zinc-950 mt-3 sm:mt-0"
            >
              <span>{noticesSection.viewAllText || 'View all notices'}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNotices.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-white p-6 rounded-2xl border border-zinc-200 flex flex-col justify-between hover:border-zinc-300 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono bg-zinc-100 text-zinc-700">
                      {item.category || 'General'}
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
                  <Link
                    to="/notices"
                    className="text-zinc-900 font-semibold hover:underline"
                  >
                    Read &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Dynamic Call To Action Banner (Minimal Dark) */}
      {ctaBanner.title && (
        <section className="bg-zinc-950 text-white py-14 border-t border-zinc-850">
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
            <Link
              to={ctaBanner.buttonLink || '/admissions'}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 text-xs sm:text-sm font-bold transition-all shrink-0"
            >
              <span>{ctaBanner.buttonText || 'Apply Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
