import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Home,
  Info,
  GraduationCap,
  FileCheck,
  Bell,
  Image,
  Users,
  Phone,
  Menu as MenuIcon,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  Shield,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const MENU_GROUPS = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Page CMS (Live Editor)',
    items: [
      { name: 'Home Page', path: '/admin/pages/home', icon: Home, publicUrl: '/' },
      { name: 'About Us Page', path: '/admin/pages/about', icon: Info, publicUrl: '/about' },
      { name: 'Academics Page', path: '/admin/pages/academics', icon: GraduationCap, publicUrl: '/academics' },
      { name: 'Admissions Page', path: '/admin/pages/admissions', icon: FileCheck, publicUrl: '/admissions' },
      { name: 'Notices & News', path: '/admin/pages/notices', icon: Bell, publicUrl: '/notices' },
      { name: 'Photo Gallery', path: '/admin/pages/gallery', icon: Image, publicUrl: '/gallery' },
      { name: 'Faculty & Staff', path: '/admin/pages/faculty', icon: Users, publicUrl: '/about' },
      { name: 'Contact Page', path: '/admin/pages/contact', icon: Phone, publicUrl: '/contact' },
    ],
  },
  {
    title: 'Configuration',
    items: [
      { name: 'Site Settings', path: '/admin/settings', icon: Settings },
    ],
  },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  // Find active item for dynamic header breadcrumb & live preview link
  let currentItem = null
  for (const group of MENU_GROUPS) {
    for (const item of group.items) {
      if (
        location.pathname === item.path ||
        (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path))
      ) {
        currentItem = item
        break
      }
    }
    if (currentItem) break
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex">
      {/* Sidebar - Minimal Monochrome Design */}
      <aside className="w-64 bg-zinc-950 text-zinc-400 flex flex-col shrink-0 border-r border-zinc-900 select-none">
        <div className="h-16 px-6 flex items-center gap-3 border-b border-zinc-900">
          <img
            src="/bfc.png"
            alt="BFC Logo"
            className="w-9 h-9 object-contain rounded-lg bg-zinc-900 p-0.5 border border-zinc-800 shrink-0"
          />
          <div>
            <div className="text-sm font-bold text-white tracking-tight leading-tight">Bright Future</div>
            <div className="text-[11px] text-zinc-500 font-medium">Content Management</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3.5 space-y-6 grow overflow-y-auto custom-scrollbar">
          {MENU_GROUPS.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                {group.title}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-zinc-800 text-white font-semibold shadow-xs'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0 text-zinc-400" />
                    <span className="grow truncate">{item.name}</span>
                    {item.publicUrl && (
                      <ChevronRight className="w-3 h-3 opacity-30 shrink-0" />
                    )}
                  </NavLink>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Quick Link to Website & User Profile */}
        <div className="p-3.5 border-t border-zinc-900 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-lg transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Public Site</span>
            </span>
            <span className="text-[10px] font-mono text-zinc-600">/</span>
          </Link>

          <div className="px-3 py-2.5 bg-zinc-900/70 border border-zinc-850 rounded-xl flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <div className="text-xs font-semibold text-zinc-200 truncate">
                {user?.name || 'Administrator'}
              </div>
              <div className="text-[11px] text-zinc-500 truncate">
                {user?.email || 'admin@brightfuture.edu.np'}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="grow flex flex-col min-w-0">
        {/* Minimal Header */}
        <header className="h-16 bg-white border-b border-zinc-200 px-6 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-sm sm:text-base font-bold text-zinc-900">
              {currentItem?.name ? currentItem.name : 'Admin Portal'}
            </h1>
            {currentItem?.publicUrl && (
              <a
                href={currentItem.publicUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-600 hover:text-zinc-900 text-xs font-medium transition-colors"
              >
                <span>Live View ({currentItem.publicUrl})</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs font-medium text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
              <span>Minimal CMS Mode</span>
            </div>
          </div>
        </header>

        <main className="p-6 sm:p-8 grow overflow-y-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
