import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  PhoneCall,
  Clock,
  ChevronDown,
  ArrowRight,
  MapPin,
} from 'lucide-react'
import { COLLEGE_INFO, STATIC_NAV_LINKS } from '../../utils/constants'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState({})
  const location = useLocation()
  const dropdownRef = useRef(null)

  // Purely static navigation links (not dynamic)
  const navItems = STATIC_NAV_LINKS

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
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
      {/* Top Info Bar - Clean Minimal Dark */}
      <div className="bg-zinc-950 text-zinc-400 text-xs py-2 px-4 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 sm:gap-6 text-zinc-400">
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
            <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1CA24B]"></span>
              Admissions Open 2026/27
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
              className="w-12 h-12 object-contain rounded-xl shrink-0 drop-shadow-2xs group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="block text-lg font-black tracking-tight text-zinc-900 group-hover:text-zinc-700 transition-colors leading-tight">
                {COLLEGE_INFO.shortName}
              </span>
              <span className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
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
                      className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                        isDropdownActive
                          ? 'text-zinc-950 bg-zinc-100'
                          : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-150 ${
                          isDropdownActive ? 'rotate-180 text-zinc-900' : 'text-zinc-400'
                        }`}
                      />
                    </button>

                    {/* Minimal Dropdown Card */}
                    {isDropdownActive && (
                      <div className="absolute left-0 top-full pt-1.5 w-60 z-50 animate-in fade-in zoom-in-95 duration-100">
                        <div className="bg-white rounded-xl shadow-xl border border-zinc-200 p-1.5">
                          <div className="space-y-0.5">
                            {item.children.map((child) => (
                              <Link
                                key={child.id || child.path}
                                to={child.path || '/academics'}
                                className="block px-3 py-2 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-700 hover:text-zinc-950"
                              >
                                <div className="text-xs font-bold leading-snug">
                                  {child.label}
                                </div>
                                {child.description && (
                                  <div className="text-[10px] text-zinc-400 mt-0.5 truncate">
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
                    `px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                      isActive
                        ? 'text-zinc-950 font-bold bg-zinc-100'
                        : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            })}
          </div>

          {/* Minimal Action CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 transition-colors shadow-xs"
            >
              <span>Apply Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-zinc-200 py-3 space-y-1">
            {navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0
              const isExpanded = mobileExpanded[item.id]

              if (hasChildren) {
                return (
                  <div key={item.id} className="rounded-lg">
                    <button
                      type="button"
                      onClick={() => toggleMobileSub(item.id)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-wider text-zinc-800 hover:bg-zinc-50 rounded-lg"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 transition-transform ${
                          isExpanded ? 'rotate-180 text-zinc-900' : ''
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-zinc-200 ml-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.id || child.path}
                            to={child.path || '/academics'}
                            onClick={() => setIsOpen(false)}
                            className="block px-2 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-950"
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
                    `block px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider ${
                      isActive
                        ? 'text-zinc-950 font-bold bg-zinc-100'
                        : 'text-zinc-800 hover:bg-zinc-50'
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
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800"
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
