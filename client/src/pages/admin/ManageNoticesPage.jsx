import { useState } from 'react'
import { Plus, Trash2, Edit2, Bell, CheckCircle } from 'lucide-react'

export default function ManageNoticesPage() {
  const [notices, setNotices] = useState([
    {
      id: '1',
      title: 'Terminal Examination Routine Announced',
      category: 'Exam Routine',
      date: '2026-10-15',
      isPublished: true,
    },
    {
      id: '2',
      title: 'Admissions Open for Grade XI (Science & Management)',
      category: 'Admissions',
      date: '2026-10-12',
      isPublished: true,
    },
    {
      id: '3',
      title: 'Annual Sports Meet 2026 Registrations',
      category: 'Sports',
      date: '2026-10-08',
      isPublished: true,
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    title: '',
    category: 'General',
    content: '',
  })

  const handleAdd = (e) => {
    e.preventDefault()
    setNotices([
      {
        id: String(Date.now()),
        title: form.title,
        category: form.category,
        date: new Date().toISOString().split('T')[0],
        isPublished: true,
      },
      ...notices,
    ])
    setShowModal(false)
    setForm({ title: '', category: 'General', content: '' })
  }

  const handleDelete = (id) => {
    setNotices(notices.filter((n) => n.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">Manage Notices</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Publish, edit, and organize notices displayed on the public notice board.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold cursor-pointer transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add New Notice
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200 uppercase font-mono tracking-wider">
            <tr>
              <th className="px-6 py-3.5">Title</th>
              <th className="px-6 py-3.5">Category</th>
              <th className="px-6 py-3.5">Date</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {notices.map((notice) => (
              <tr key={notice.id} className="hover:bg-zinc-50/60">
                <td className="px-6 py-4 font-semibold text-zinc-900 flex items-center gap-3">
                  <Bell className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>{notice.title}</span>
                </td>
                <td className="px-6 py-4 text-zinc-600">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-100">
                    {notice.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-500 font-mono text-[11px]">{notice.date}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 text-[11px] text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded">
                    <CheckCircle className="w-3 h-3 text-zinc-600" /> Published
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(notice.id)}
                    className="p-1.5 text-zinc-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-zinc-200">
            <h3 className="text-base font-bold text-zinc-900 mb-1">Add Notice</h3>
            <form onSubmit={handleAdd} className="space-y-3.5 mt-3">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">Notice Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">Category</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg"
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
