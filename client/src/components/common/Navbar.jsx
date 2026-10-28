import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  GraduationCap,
  Menu,
  X,
  PhoneCall,
  Clock,
  ChevronDown,
  ArrowRight,
  MapPin,
  Mail,
} from 'lucide-react'
import { COLLEGE_INFO, DEFAULT_NAV_LINKS } from '../../utils/constants'
import api from '../../services/api'

export default function Navbar() {
  const [navItems, setNavItems] = useState(DEFAULT_NAV_LINKS)
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState({})
  const location = useLocation()
  const dropdownRef = useRef(null)

  // Fetch dynamic navigation configured from admin panel
  useEffect(() => {
    let isMounted = true
    async function fetchNav() {
      try {
        const response = await api.get('/nav')
        if (isMounted && response?.data?.navItems?.length > 0) {
          setNavItems(response.data.navItems)
        }
      } catch (err) {
        // Fallback to default structure
      }
    }
    fetchNav()
    return () => {
      isMounted = false
    }
  }, [])

  // Close dropdowns on route changes
  useEffect(() => {
    setIsOpen(false)
    setOpenDropdown(null)
  }, [location.pathname])

  // Click outside listener for desktop dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleMobileSub = (id) => {
    setMobileExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      {/* Top Info Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 sm:gap-6 text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#1CA24B]" />
              {COLLEGE_INFO.address}
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="flex items-center gap-1.5 font-medium">
              <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
              {COLLEGE_INFO.phone}
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {COLLEGE_INFO.openingHours}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1CA24B]"></span>
              Admissions Open 2026/27
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="hidden sm:inline text-xs text-slate-400">
              {COLLEGE_INFO.accreditation}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav ref={dropdownRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand with bfc.png */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/bfc.png"
              alt="Bright Future College Logo"
              className="w-13 h-13 object-contain rounded-xl shrink-0 drop-shadow-xs group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="block text-lg font-black tracking-tight text-slate-900 group-hover:text-[#1CA24B] transition-colors leading-tight">
                {COLLEGE_INFO.shortName}
              </span>
              <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                School &amp; College &bull; Lalitpur
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0
              const isDropdownActive = openDropdown === item.id

              if (hasChildren) {
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.id)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown(isDropdownActive ? null : item.id)
                      }
                      className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        isDropdownActive
                          ? 'text-[#1CA24B] bg-slate-50'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-150 ${
                          isDropdownActive ? 'rotate-180 text-[#1CA24B]' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {/* Minimal Dropdown Card */}
                    {isDropdownActive && (
                      <div className="absolute left-0 top-full pt-1 w-64 z-50">
                        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-1.5">
                          <div className="space-y-0.5">
                            {item.children.map((child) => (
                              <Link
                                key={child.id || child.path}
                                to={child.path || '/academics'}
                                className="block px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 hover:text-[#1CA24B]"
                              >
                                <div className="text-sm font-medium leading-snug">
                                  {child.label}
                                </div>
                                {child.description && (
                                  <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                                    {child.description}
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <NavLink
                  key={item.id || item.path}
                  to={item.path || '/'}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-[#1CA24B] font-semibold bg-slate-50'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            })}
          </div>

          {/* Action CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/admissions"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-[#1CA24B] hover:bg-[#16843c] transition-colors"
            >
              <span>Apply Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-200 py-3 space-y-1">
            {navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0
              const isExpanded = mobileExpanded[item.id]

              if (hasChildren) {
                return (
                  <div key={item.id} className="rounded-lg">
                    <button
                      type="button"
                      onClick={() => toggleMobileSub(item.id)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          isExpanded ? 'rotate-180 text-[#1CA24B]' : ''
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-slate-200 ml-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.id || child.path}
                            to={child.path || '/academics'}
                            onClick={() => setIsOpen(false)}
                            className="block px-2 py-1.5 text-xs font-medium text-slate-600 hover:text-[#1CA24B]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <NavLink
                  key={item.id || item.path}
                  to={item.path || '/'}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm font-medium ${
                      isActive
                        ? 'text-[#1CA24B] font-semibold bg-slate-50'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            })}

            <div className="pt-2">
              <Link
                to="/admissions"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-[#1CA24B] hover:bg-[#16843c]"
              >
                <span>Apply Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
