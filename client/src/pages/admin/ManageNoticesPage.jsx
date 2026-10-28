import { useState } from 'react'
import { Plus, Trash2, Edit3, Bell, CheckCircle } from 'lucide-react'

export default function ManageNoticesPage() {
  const [showModal, setShowModal] = useState(false)
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'Admission Open for Grade XI (Science & Management)',
      category: 'Admissions',
      date: '2026-10-01',
      published: true,
    },
    {
      id: 2,
      title: 'First Terminal Examination Schedule Announced',
      category: 'Examination',
      date: '2026-09-28',
      published: true,
    },
    {
      id: 3,
      title: 'Annual Sports & Cultural Week Upcoming',
      category: 'Events',
      date: '2026-09-20',
      published: true,
    },
  ])

  const [form, setForm] = useState({ title: '', category: 'General', content: '' })

  const handleAddNotice = (e) => {
    e.preventDefault()
    setNotices([
      {
        id: Date.now(),
        title: form.title,
        category: form.category,
        date: new Date().toISOString().split('T')[0],
        published: true,
      },
      ...notices,
    ])
    setForm({ title: '', category: 'General', content: '' })
    setShowModal(false)
  }

  const handleDelete = (id) => {
    setNotices(notices.filter((n) => n.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manage Notices</h2>
          <p className="text-sm text-slate-500">
            Publish, edit, and organize notices displayed on the public notice board.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-sm font-semibold shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Notice
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 text-xs uppercase tracking-wider font-semibold">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {notices.map((notice) => (
              <tr key={notice.id} className="hover:bg-slate-50/60">
                <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                  <Bell className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{notice.title}</span>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <span className="px-2.5 py-1 rounded-full text-xs bg-slate-100 font-medium">
                    {notice.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 text-xs">{notice.date}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" /> Published
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => handleDelete(notice.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                    title="Delete notice"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Post New Notice</h3>
            <form onSubmit={handleAddNotice} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Terminal Exam Routine"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                >
                  <option>General</option>
                  <option>Admissions</option>
                  <option>Examination</option>
                  <option>Holiday</option>
                  <option>Events</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Notice Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Details of the announcement..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#1CA24B] text-white text-sm font-semibold hover:bg-[#16843c] cursor-pointer"
                >
                  Save Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
