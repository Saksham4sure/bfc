import { useState } from 'react'
import {
  Users,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  Mail,
  Phone,
} from 'lucide-react'
import { useCMS } from '../../../context/CMSContext'

export default function EditFacultyPage() {
  const { cms, updatePage, resetPage } = useCMS()
  const [formData, setFormData] = useState(cms.faculty || {})
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    designation: '',
    department: 'Science',
    email: '',
    phone: '',
    bio: '',
  })

  const handleSave = () => {
    updatePage('faculty', formData)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleReset = () => {
    if (window.confirm('Reset Faculty Page content to defaults?')) {
      resetPage('faculty')
      setTimeout(() => setFormData(cms.faculty), 100)
    }
  }

  const deleteFaculty = (id) => {
    const updated = (formData.items || []).filter((f) => f.id !== id)
    setFormData({ ...formData, items: updated })
  }

  const handleAdd = (e) => {
    e.preventDefault()
    if (!newFaculty.name) return
    const facultyToAdd = {
      id: `fac-${Date.now()}`,
      ...newFaculty,
    }
    setFormData({
      ...formData,
      items: [...(formData.items || []), facultyToAdd],
    })
    setShowAddModal(false)
    setNewFaculty({
      name: '',
      designation: '',
      department: 'Science',
      email: '',
      phone: '',
      bio: '',
    })
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-zinc-500">
            <span>Page CMS</span>
            <span>&bull;</span>
            <span>Faculty &amp; Staff</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">
            Faculty &amp; Academic Leadership
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage principal, coordinators, department chairs, and educators.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/about"
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
          <span>Faculty list updated successfully.</span>
        </div>
      )}

      {/* Faculty List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-900">
            Faculty Members ({(formData.items || []).length})
          </h3>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-semibold cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Faculty Member
          </button>
        </div>

        {showAddModal && (
          <div className="bg-white p-5 rounded-2xl border border-zinc-300 space-y-3">
            <h4 className="text-xs font-bold uppercase text-zinc-900">New Faculty Member</h4>
            <form onSubmit={handleAdd} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newFaculty.name}
                    onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                    className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">Designation</label>
                  <input
                    type="text"
                    value={newFaculty.designation}
                    onChange={(e) => setNewFaculty({ ...newFaculty, designation: e.target.value })}
                    className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">Department</label>
                  <input
                    type="text"
                    value={newFaculty.department}
                    onChange={(e) => setNewFaculty({ ...newFaculty, department: e.target.value })}
                    className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    value={newFaculty.email}
                    onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                    className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">Bio</label>
                <textarea
                  rows={2}
                  value={newFaculty.bio}
                  onChange={(e) => setNewFaculty({ ...newFaculty, bio: e.target.value })}
                  className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 border border-zinc-200 rounded-lg text-xs text-zinc-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-zinc-900 text-white text-xs font-semibold rounded-lg"
                >
                  Save Faculty
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(formData.items || []).map((fac) => (
            <div key={fac.id} className="bg-white rounded-xl border border-zinc-200 p-4 space-y-2 relative">
              <button
                onClick={() => deleteFaculty(fac.id)}
                className="absolute top-3 right-3 text-zinc-400 hover:text-red-500 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500">{fac.department}</span>
                <h4 className="text-sm font-bold text-zinc-900">{fac.name}</h4>
                <p className="text-xs text-zinc-600 font-medium">{fac.designation}</p>
              </div>
              {fac.bio && <p className="text-xs text-zinc-500 line-clamp-2">{fac.bio}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
