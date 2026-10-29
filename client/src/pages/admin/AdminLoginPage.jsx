import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Authentication failed. Try admin@brightfuture.edu.np / admin123'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl text-zinc-100">
        <div className="text-center mb-8">
          <img
            src="/bfc.png"
            alt="BFC Logo"
            className="w-14 h-14 object-contain rounded-xl p-1 bg-white mx-auto mb-4 shadow-md"
          />
          <h1 className="text-xl font-bold tracking-tight text-white">BFC Admin Portal</h1>
          <p className="text-zinc-400 text-xs mt-1">Institutional Content Management</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@brightfuture.edu.np"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-200 disabled:opacity-50 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer mt-4"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-zinc-800/80 text-center text-xs text-zinc-500">
          Default credentials: admin@brightfuture.edu.np / admin123
        </div>
      </div>
    </div>
  )
}
