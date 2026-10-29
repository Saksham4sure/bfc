import { useState } from 'react'
import { Save, CheckCircle2 } from 'lucide-react'
import { COLLEGE_INFO } from '../../utils/constants'

export default function ManageSettingsPage() {
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    name: COLLEGE_INFO.name,
    tagline: COLLEGE_INFO.tagline,
    email: COLLEGE_INFO.email,
    phone: COLLEGE_INFO.phone,
    address: COLLEGE_INFO.address,
    accreditation: COLLEGE_INFO.accreditation,
    admissionsOpen: true,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">Site Configuration</h2>
        <p className="text-xs text-zinc-500 mt-0.5">
          Update global institution details, contact parameters, and admissions status.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200">
        {saved && (
          <div className="mb-6 p-3 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-zinc-700" />
            <span>Settings saved successfully.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                Institution Name
              </label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full px-3.5 py-2 border border-zinc-200 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                Institution Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2 border border-zinc-200 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                Official Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2 border border-zinc-200 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2 border border-zinc-200 rounded-lg text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
              Physical Address
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3.5 py-2 border border-zinc-200 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
              Accreditation &amp; Affiliation
            </label>
            <input
              type="text"
              value={settings.accreditation}
              onChange={(e) => setSettings({ ...settings, accreditation: e.target.value })}
              className="w-full px-3.5 py-2 border border-zinc-200 rounded-lg text-sm"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
