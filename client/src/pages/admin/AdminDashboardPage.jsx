import {
  Home,
  Info,
  GraduationCap,
  FileCheck,
  Bell,
  Image,
  Users,
  Phone,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCMS } from '../../context/CMSContext'

export default function AdminDashboardPage() {
  const { cms } = useCMS()

  const pages = [
    {
      name: 'Home Page',
      path: '/admin/pages/home',
      publicPath: '/',
      icon: Home,
      desc: 'Hero slider banners, counter stats, core pillars, notices bulletin, and bottom CTA banner.',
      badge: `${cms.home?.heroSlides?.length || 0} Slides &bull; ${cms.home?.stats?.length || 0} Stats`,
    },
    {
      name: 'About Us Page',
      path: '/admin/pages/about',
      publicPath: '/about',
      icon: Info,
      desc: 'Institutional overview, Vision statement, Mission card, and Core Values.',
      badge: `${cms.about?.coreValues?.length || 0} Core Values`,
    },
    {
      name: 'Academics Page',
      path: '/admin/pages/academics',
      publicPath: '/academics',
      icon: GraduationCap,
      desc: 'Secondary School, +2 Science, +2 Management, +2 Humanities and highlights.',
      badge: `${cms.academics?.programs?.length || 0} Academic Streams`,
    },
    {
      name: 'Admissions Page',
      path: '/admin/pages/admissions',
      publicPath: '/admissions',
      icon: FileCheck,
      desc: 'Registration criteria, open/closed status, and incoming student applications.',
      badge: `${cms.admissions?.applications?.length || 0} Applications Received`,
    },
    {
      name: 'Notices & News',
      path: '/admin/pages/notices',
      publicPath: '/notices',
      icon: Bell,
      desc: 'Bulletin circulars, routine announcements, and scheduled events calendar.',
      badge: `${cms.notices?.items?.length || 0} Notices &bull; ${cms.notices?.events?.length || 0} Events`,
    },
    {
      name: 'Photo Gallery',
      path: '/admin/pages/gallery',
      publicPath: '/gallery',
      icon: Image,
      desc: 'Campus life photo albums, science laboratories, athletic sports, and events.',
      badge: `${cms.gallery?.items?.length || 0} Photos`,
    },
    {
      name: 'Faculty & Staff',
      path: '/admin/pages/faculty',
      publicPath: '/about',
      icon: Users,
      desc: 'Leadership directory, department heads, coordinators, and teacher bios.',
      badge: `${cms.faculty?.items?.length || 0} Staff Members`,
    },
    {
      name: 'Contact Page',
      path: '/admin/pages/contact',
      publicPath: '/contact',
      icon: Phone,
      desc: 'Campus location, telephone, inquiry email, office hours, and received messages.',
      badge: `${cms.contact?.inquiries?.length || 0} Inquiries Received`,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Minimal Header Banner */}
      <div className="bg-zinc-950 text-white rounded-2xl p-6 sm:p-8 border border-zinc-900 shadow-sm">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-400 text-xs font-mono border border-zinc-800">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
            <span>SYSTEM DASHBOARD</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Page Content Management
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            Select any section below to update live content, configure sliders, and preview changes on desktop or mobile.
          </p>
        </div>
      </div>

      {/* Pages Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-zinc-900">Custom Page Editors</h3>
          <span className="text-xs text-zinc-500 font-mono">8 Pages Configured</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {pages.map((p, idx) => {
            const Icon = p.icon
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-zinc-200 p-5 flex flex-col justify-between hover:border-zinc-400 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-zinc-100 text-zinc-700 flex items-center justify-center transition-colors group-hover:bg-zinc-900 group-hover:text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                    <a
                      href={p.publicPath}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 text-zinc-400 hover:text-zinc-700 transition-colors"
                      title="View Live Page"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <h4 className="text-sm font-bold text-zinc-900">
                    {p.name}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed line-clamp-2">
                    {p.desc}
                  </p>

                  <div
                    className="text-[10px] font-mono text-zinc-600 bg-zinc-50 border border-zinc-150 px-2 py-0.5 rounded mt-3 inline-block"
                    dangerouslySetInnerHTML={{ __html: p.badge }}
                  />
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <Link
                    to={p.path}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-900 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Open Editor</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
