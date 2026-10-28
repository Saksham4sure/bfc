import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="py-24 text-center px-4">
      <span className="text-6xl font-black text-slate-900">404</span>
      <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">Page Not Found</h1>
      <p className="text-slate-600 max-w-md mx-auto mb-8 text-sm">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1CA24B] text-white text-sm font-semibold hover:bg-[#16843c] transition-colors"
        >
          <Home className="w-4 h-4" /> Go to Homepage
        </Link>
      </div>
    </div>
  )
}
