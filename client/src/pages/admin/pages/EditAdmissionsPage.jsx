import { useState } from 'react'
import {
  FileCheck,
  CheckCircle2,
  Clock,
  Check,
  X,
  ExternalLink,
  Save,
  RotateCcw,
  User,
  Mail,
  Phone,
} from 'lucide-react'
import { useCMS } from '../../../context/CMSContext'

export default function EditAdmissionsPage() {
  const { cms, updatePage, resetPage } = useCMS()
  const [formData, setFormData] = useState(cms.admissions || {})
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = () => {
    updatePage('admissions', formData)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleReset = () => {
    if (window.confirm('Reset Admissions Page content to defaults?')) {
      resetPage('admissions')
      setTimeout(() => setFormData(cms.admissions), 100)
    }
  }

  const handleStatusChange = (appId, newStatus) => {
    const updated = (formData.applications || []).map((app) =>
      app.id === appId ? { ...app, status: newStatus } : app
    )
    setFormData({ ...formData, applications: updated })
  }

  const applications = formData.applications || []

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-zinc-500">
            <span>Page CMS</span>
            <span>&bull;</span>
            <span>Admissions</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">
            Admissions Page &amp; Student Applications
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Configure application status, intake details, and review incoming applicants.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/admissions"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live</span>
          </a>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-medium flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-zinc-700 shrink-0" />
          <span>Admissions configuration saved successfully.</span>
        </div>
      )}

      {/* Header Settings */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-4">
        <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-zinc-600" />
          Application Settings &amp; Deadlines
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Badge</label>
            <input
              type="text"
              value={formData.header?.badge || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  header: { ...formData.header, badge: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Headline Title</label>
            <input
              type="text"
              value={formData.header?.title || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  header: { ...formData.header, title: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-800">
            <input
              type="checkbox"
              checked={formData.header?.isOpen ?? true}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  header: { ...formData.header, isOpen: e.target.checked },
                })
              }
              className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-0"
            />
            <span>Accept Online Admissions (Toggle Open/Closed status on public site)</span>
          </label>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-900">
            Received Student Applications ({applications.length})
          </h3>
        </div>

        <div className="space-y-3">
          {applications.map((app) => (
            <div key={app.id} className="bg-white p-5 rounded-2xl border border-zinc-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{app.fullName}</span>
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-zinc-400" />
                      {app.email}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-zinc-400" />
                      {app.phone}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={app.status || 'PENDING'}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    className="px-2.5 py-1 rounded-md text-xs font-semibold border border-zinc-200 bg-zinc-50 text-zinc-800"
                  >
                    <option value="PENDING">Pending Review</option>
                    <option value="REVIEWED">Under Review</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="REJECTED">Declined</option>
                  </select>
                </div>
              </div>

              <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-150 text-xs text-zinc-600">
                <span className="font-semibold text-zinc-800">Target Program: {app.program}</span>
                {app.gpaScore && <span className="ml-2 font-mono text-zinc-500">(GPA: {app.gpaScore})</span>}
                {app.message && <p className="mt-1 text-zinc-500 italic">&ldquo;{app.message}&rdquo;</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
