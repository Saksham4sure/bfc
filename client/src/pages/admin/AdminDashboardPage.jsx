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
  Layers,
  Sparkles,
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
      desc: 'Institutional overview, Vision statement, Mission card, and 4 Core Values.',
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
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-xl border border-slate-800">
        <div className="max-w-2xl relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1CA24B]"></span>
            <span>Custom Page-Centric CMS</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Manage Website by Page
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Select any page below or from the sidebar navbar to customize its exact content, sections, images, and text.
          </p>
        </div>
      </div>

      {/* Pages Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">Available Page Editors</h3>
          <span className="text-xs text-slate-500 font-medium">8 Custom CMS Pages</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pages.map((p, idx) => {
            const Icon = p.icon
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-[#1CA24B] group-hover:text-white flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <a
                      href={p.publicPath}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                      title="View Live Page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 group-hover:text-[#1CA24B] transition-colors">
                    {p.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                    {p.desc}
                  </p>

                  <div
                    className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg mt-3 inline-block"
                    dangerouslySetInnerHTML={{ __html: p.badge }}
                  />
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={p.path}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#1CA24B] group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Edit Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
