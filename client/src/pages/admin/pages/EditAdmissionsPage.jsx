import { useState } from 'react'
import {
  FileText,
  Users,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  ExternalLink,
  Search,
  Filter,
  Check,
  X,
  Mail,
  Phone,
} from 'lucide-react'
import { useCMS } from '../../../context/CMSContext'

export default function EditAdmissionsPage() {
  const { cms, updatePage, resetPage } = useCMS()
  const [formData, setFormData] = useState(cms.admissions || {})
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterProgram, setFilterProgram] = useState('ALL')
  const [filterStatus, setFilterStatus] = useState('ALL')

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
    const updated = formData.applications.map((app) =>
      app.id === appId ? { ...app, status: newStatus } : app
    )
    setFormData({ ...formData, applications: updated })
  }

  const deleteApplication = (appId) => {
    if (window.confirm('Delete this admission application?')) {
      const updated = formData.applications.filter((app) => app.id !== appId)
      setFormData({ ...formData, applications: updated })
    }
  }

  const filteredApplications = (formData.applications || []).filter((app) => {
    const matchesSearch =
      app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone?.includes(searchTerm)
    const matchesProg = filterProgram === 'ALL' || app.program === filterProgram
    const matchesStatus = filterStatus === 'ALL' || app.status === filterStatus
    return matchesSearch && matchesProg && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1CA24B]">
            <span>Page CMS</span>
            <span>&bull;</span>
            <span>Admissions Portal</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
            <span>Admissions Page Content</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#1CA24B] font-bold">
              /admissions
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Edit admissions banner, registration status, session years, and manage incoming student applications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/admissions"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Page</span>
          </a>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs font-bold shadow-md shadow-[#1CA24B]/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Changes</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="font-semibold">Admissions Page updated successfully!</div>
        </div>
      )}

      {/* Header & Status Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#1CA24B]" />
          Admissions Status &amp; Page Header
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Tag</label>
            <input
              type="text"
              value={formData.header?.badge || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  header: { ...formData.header, badge: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Academic Session Year</label>
            <input
              type="text"
              value={formData.header?.session || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  header: { ...formData.header, session: e.target.value },
                })
              }
              placeholder="2026/2027"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Admissions Status</label>
            <select
              value={formData.header?.isOpen ? 'open' : 'closed'}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  header: { ...formData.header, isOpen: e.target.value === 'open' },
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white font-semibold text-[#1CA24B]"
            >
              <option value="open">🟢 Admissions Open</option>
              <option value="closed">🔴 Admissions Closed</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Page Headline Title</label>
          <input
            type="text"
            value={formData.header?.title || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                header: { ...formData.header, title: e.target.value },
              })
            }
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Introductory Instructions</label>
          <textarea
            rows={2}
            value={formData.header?.description || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                header: { ...formData.header, description: e.target.value },
              })
            }
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
          />
        </div>
      </div>

      {/* Received Student Applications Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#1CA24B]" />
              Submitted Student Applications ({formData.applications?.length || 0})
            </h3>
            <p className="text-xs text-slate-500">
              Applications submitted online by students on the admissions form.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search applicant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 border border-slate-300 rounded-xl text-xs w-44"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded-xl text-xs bg-white"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="REVIEWED">Reviewed</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {/* Applications Table */}
        <div className="border border-slate-200 rounded-xl overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Applicant Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Program</th>
                <th className="px-4 py-3">Prev. School &amp; GPA</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                    No applications found.
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-bold text-slate-900">
                      <div>{app.fullName}</div>
                      {app.message && (
                        <div className="text-[11px] font-normal text-slate-500 mt-0.5 line-clamp-1 italic">
                          "{app.message}"
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{app.email}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{app.phone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#1CA24B] font-semibold">
                        {app.program}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <div>{app.previousSchool || 'N/A'}</div>
                      <div className="text-[11px] font-bold text-slate-900">GPA: {app.gpaScore || 'N/A'}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{app.createdAt}</td>
                    <td className="px-4 py-3">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`px-2 py-1 rounded-md text-[11px] font-bold border ${
                          app.status === 'ACCEPTED'
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                            : app.status === 'REJECTED'
                            ? 'bg-red-50 border-red-300 text-red-800'
                            : 'bg-slate-100 border-slate-300 text-slate-700'
                        }`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="REVIEWED">REVIEWED</option>
                        <option value="ACCEPTED">ACCEPTED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => deleteApplication(app.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"
                        title="Delete application"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Save Bar */}
      <div className="sticky bottom-6 bg-slate-900 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between z-20">
        <div className="text-xs text-slate-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1CA24B] animate-pulse"></span>
          <span>Editing Admissions Page CMS</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-white px-3 py-1.5 transition-colors cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-[#1CA24B]/30"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
