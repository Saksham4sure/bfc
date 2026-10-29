import { Link } from 'react-router-dom'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
} from 'lucide-react'
import { COLLEGE_INFO, DEFAULT_NAV_LINKS } from '../../utils/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 relative">
      {/* Top Call-To-Action Banner - Minimal Dark */}
      <div className="border-b border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                <span>Admissions Open &bull; Academic Session 2026/2027</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Begin Your Educational Journey at Bright Future
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
                Offering schooling from Grade 1 to 10 and renowned +2 Science, Management, Humanities &amp; Law streams in Satdobato, Lalitpur.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Apply Online Today</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs sm:text-sm font-semibold border border-zinc-700 transition-colors"
              >
                <span>Inquire Desk</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand Info & Identity (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src="/bfc.png"
                alt="Bright Future College Logo"
                className="w-12 h-12 object-contain rounded-xl p-1 bg-white shadow-md shrink-0 group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="block text-lg font-black text-white tracking-tight leading-tight">
                  {COLLEGE_INFO.name}
                </span>
                <span className="block text-xs font-semibold text-zinc-500 tracking-wider uppercase">
                  Satdobato, Lalitpur
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {COLLEGE_INFO.tagline}. Dedicated to academic rigor, character building, modern laboratories, and competitive entrance preparation.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-semibold text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                {COLLEGE_INFO.accreditation}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-semibold text-zinc-400">
                <Award className="w-3.5 h-3.5 text-zinc-400" />
                Est. {COLLEGE_INFO.established}
              </span>
            </div>

            {/* Timings Highlight Pill */}
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="text-zinc-500 font-medium">Campus &amp; Office Hours:</div>
                <div className="text-white font-semibold">{COLLEGE_INFO.openingHours} (Sun - Fri)</div>
              </div>
            </div>
          </div>

          {/* Col 2: Academic Streams (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-zinc-850 pb-2 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
              Programs
            </h3>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link to="/academics" className="hover:text-white transition-colors">
                  Secondary (Grades 1-10)
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-white transition-colors">
                  +2 Science Stream
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-white transition-colors">
                  +2 Management Stream
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-white transition-colors">
                  +2 Humanities &amp; Law
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors">
                  Science &amp; Tech Labs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-zinc-850 pb-2">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              {DEFAULT_NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Hub (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-zinc-850 pb-2 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              Contact Desk
            </h3>

            <div className="space-y-3 text-xs text-zinc-400">
              <div>
                <div className="text-[10px] uppercase font-bold text-zinc-500">Location</div>
                <div className="text-zinc-200 font-medium">{COLLEGE_INFO.address}</div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-bold text-zinc-500">Landlines</div>
                <div className="text-zinc-300 font-mono space-x-2">
                  <a href="tel:01-5434319" className="hover:text-white">01-5434319</a>
                  <span>&bull;</span>
                  <a href="tel:01-5454894" className="hover:text-white">01-5454894</a>
                  <span>&bull;</span>
                  <a href="tel:01-5444807" className="hover:text-white">01-5444807</a>
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-bold text-zinc-500">Admissions Mobile Hotlines</div>
                <div className="text-zinc-300 font-mono space-x-2">
                  <a href="tel:9851153747" className="hover:text-white">9851153747</a>
                  <span>&bull;</span>
                  <a href="tel:9851153746" className="hover:text-white">9851153746</a>
                  <span>&bull;</span>
                  <a href="tel:9851020251" className="hover:text-white">9851020251</a>
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-bold text-zinc-500">Official Inquiries</div>
                <a href={`mailto:${COLLEGE_INFO.email}`} className="text-zinc-200 hover:text-white font-mono">
                  {COLLEGE_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            <span>&copy; {currentYear} {COLLEGE_INFO.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-zinc-500 flex items-center gap-1.5">
              <span>Satdobato, Lalitpur, Nepal</span>
            </span>
            <span className="text-zinc-800">|</span>
            <Link to="/contact" className="hover:text-zinc-300 transition-colors">
              Counseling Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
