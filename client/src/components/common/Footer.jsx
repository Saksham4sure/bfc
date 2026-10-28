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
  Send,
  ExternalLink,
} from 'lucide-react'
import { COLLEGE_INFO, DEFAULT_NAV_LINKS } from '../../utils/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 relative">
      {/* Top Engaging Call-To-Action Banner */}
      <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-[#1CA24B]"></span>
                <span>Admissions Open &bull; Academic Session 2026/2027</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Begin Your Educational Journey at Bright Future
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                Offering world-class schooling from Grade 1 to 10 and renowned +2 Science, Management, Humanities &amp; Law streams in Satdobato, Lalitpur.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#1CA24B]/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Apply Online Today</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-colors"
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
                className="w-14 h-14 object-contain rounded-2xl p-1 bg-white shadow-lg shrink-0 group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="block text-xl font-black text-white tracking-tight leading-tight">
                  {COLLEGE_INFO.name}
                </span>
                <span className="block text-xs font-semibold text-slate-400 tracking-wider uppercase">
                  Satdobato, Lalitpur
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {COLLEGE_INFO.tagline}. Dedicated to academic rigor, character building, modern laboratories, and competitive entrance preparation.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                {COLLEGE_INFO.accreditation}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
                <Award className="w-3.5 h-3.5 text-slate-400" />
                Est. {COLLEGE_INFO.established}
              </span>
            </div>

            {/* Timings Highlight Pill */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="text-slate-400 font-medium">Campus &amp; Office Hours:</div>
                <div className="text-white font-bold">{COLLEGE_INFO.openingHours} (Sun - Fri)</div>
              </div>
            </div>
          </div>

          {/* Col 2: Academic Streams (2.5 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              Programs
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/academics" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">&rsaquo;</span>
                  <span>Secondary (Grades 1-10)</span>
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">&rsaquo;</span>
                  <span>+2 Science Stream</span>
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">&rsaquo;</span>
                  <span>+2 Management Stream</span>
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">&rsaquo;</span>
                  <span>+2 Humanities &amp; Law</span>
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">&rsaquo;</span>
                  <span>Science Practical Labs</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">&rsaquo;</span>
                  <span>Robotics &amp; Tech Center</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {DEFAULT_NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-slate-600 group-hover:text-white">&bull;</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Detailed Contact Hub (3.5 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Contact Information
            </h3>

            <div className="space-y-3.5 text-xs text-slate-300">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Campus Location</div>
                  <div className="text-white font-semibold text-sm">{COLLEGE_INFO.address}</div>
                </div>
              </div>

              {/* Telephone / Landlines */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Telephone / Landline Desk</div>
                  <div className="text-white font-semibold text-xs space-x-2">
                    <a href="tel:01-5434319" className="hover:text-white transition-colors">01-5434319</a>
                    <span>&bull;</span>
                    <a href="tel:01-5454894" className="hover:text-white transition-colors">01-5454894</a>
                    <span>&bull;</span>
                    <a href="tel:01-5444807" className="hover:text-white transition-colors">01-5444807</a>
                  </div>
                </div>
              </div>

              {/* Mobile Hotlines */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Direct Mobile / Admissions Hotlines</div>
                  <div className="text-slate-200 font-semibold text-xs space-y-0.5 mt-0.5">
                    <div className="space-x-2">
                      <a href="tel:9851153747" className="hover:text-white">9851153747</a>
                      <span>&bull;</span>
                      <a href="tel:9851153746" className="hover:text-white">9851153746</a>
                    </div>
                    <div className="space-x-2 text-slate-300">
                      <a href="tel:9851020251" className="hover:text-white">9851020251</a>
                      <span>&bull;</span>
                      <a href="tel:9843042785" className="hover:text-white">9843042785</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Official Inquiries Email</div>
                  <a href={`mailto:${COLLEGE_INFO.email}`} className="text-white hover:text-slate-200 font-semibold text-xs transition-colors">
                    {COLLEGE_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>&copy; {currentYear} {COLLEGE_INFO.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
              <span>Satdobato, Lalitpur, Nepal</span>
            </span>
            <span className="text-slate-700">|</span>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">
              Counseling Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
