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
    title: 'Page CMS (Edit By Page)',
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
    title: 'Site Configuration',
    items: [
      { name: 'Dynamic Navbar', path: '/admin/navbar', icon: MenuIcon },
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
      if (location.pathname === item.path || (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path))) {
        currentItem = item
        break
      }
    }
    if (currentItem) break
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
        <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800">
          <img
            src="/bfc.png"
            alt="BFC Logo"
            className="w-10 h-10 object-contain rounded-xl bg-white p-0.5 shadow-md shadow-[#1CA24B]/20 shrink-0"
          />
          <div>
            <div className="text-sm font-extrabold text-white leading-tight">Bright Future</div>
            <div className="text-[11px] text-emerald-400 font-medium">Custom Page CMS</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-6 grow overflow-y-auto">
          {MENU_GROUPS.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                {group.title}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#1CA24B] text-white shadow-md shadow-[#1CA24B]/20'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="grow">{item.name}</span>
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
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Public Website</span>
          </Link>

          <div className="px-3 py-2 bg-slate-800/60 rounded-xl flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <div className="text-xs font-semibold text-white truncate">
                {user?.name || 'Super Admin'}
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {user?.email || 'admin@brightfuture.edu.np'}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="grow flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-extrabold text-slate-800">
              {currentItem?.name ? `Editing: ${currentItem.name}` : 'Admin Management Portal'}
            </h1>
            {currentItem?.publicUrl && (
              <a
                href={currentItem.publicUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 hover:text-[#1CA24B] hover:bg-emerald-50 text-xs font-semibold transition-colors"
              >
                <span>Live View ({currentItem.publicUrl})</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs font-medium text-emerald-800 bg-[#e8f7ee] px-3 py-1 rounded-full border border-[#1CA24B]/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1CA24B]"></span>
              <span>Theme: #1CA24B</span>
            </div>
          </div>
        </header>

        <main className="p-8 grow overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
