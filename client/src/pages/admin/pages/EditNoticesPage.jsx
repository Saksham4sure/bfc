import { useState } from 'react'
import {
  Bell,
  Calendar,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  FileText,
  MapPin,
  Clock,
  Pin,
} from 'lucide-react'
import { useCMS } from '../../../context/CMSContext'

export default function EditNoticesPage() {
  const { cms, updatePage, resetPage } = useCMS()
  const [formData, setFormData] = useState(cms.notices || {})
  const [activeTab, setActiveTab] = useState('notices')
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showAddNotice, setShowAddNotice] = useState(false)
  const [showAddEvent, setShowAddEvent] = useState(false)

  // New Notice form
  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'Admissions',
    content: '',
    important: false,
    fileUrl: '',
    createdAt: new Date().toISOString().split('T')[0],
  })

  // New Event form
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    location: 'College Auditorium',
    description: '',
  })

  const handleSave = () => {
    updatePage('notices', formData)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleReset = () => {
    if (window.confirm('Reset Notices & Events to defaults?')) {
      resetPage('notices')
      setTimeout(() => setFormData(cms.notices), 100)
    }
  }

  // Notice Actions
  const handleAddNotice = (e) => {
    e.preventDefault()
    if (!newNotice.title) return
    const updated = [
      {
        id: `not-${Date.now()}`,
        ...newNotice,
      },
      ...(formData.items || []),
    ]
    setFormData({ ...formData, items: updated })
    setShowAddNotice(false)
    setNewNotice({
      title: '',
      category: 'Admissions',
      content: '',
      important: false,
      fileUrl: '',
      createdAt: new Date().toISOString().split('T')[0],
    })
  }

  const deleteNotice = (id) => {
    const updated = formData.items.filter((n) => n.id !== id)
    setFormData({ ...formData, items: updated })
  }

  const toggleNoticeImportant = (id) => {
    const updated = formData.items.map((n) =>
      n.id === id ? { ...n, important: !n.important } : n
    )
    setFormData({ ...formData, items: updated })
  }

  // Event Actions
  const handleAddEvent = (e) => {
    e.preventDefault()
    if (!newEvent.title) return
    const updated = [
      {
        id: `ev-${Date.now()}`,
        ...newEvent,
      },
      ...(formData.events || []),
    ]
    setFormData({ ...formData, events: updated })
    setShowAddEvent(false)
    setNewEvent({
      title: '',
      date: new Date().toISOString().split('T')[0],
      location: 'College Auditorium',
      description: '',
    })
  }

  const deleteEvent = (id) => {
    const updated = formData.events.filter((e) => e.id !== id)
    setFormData({ ...formData, events: updated })
  }

  return (
    <div className="space-y-6">
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1CA24B]">
            <span>Page CMS</span>
            <span>&bull;</span>
            <span>Bulletin &amp; News</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
            <span>Notices &amp; Events Page Content</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#1CA24B] font-bold">
              /notices
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Publish circulars, board examination routines, and schedule academic calendar events.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/notices"
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
          <div className="font-semibold">Notices and Events updated successfully!</div>
        </div>
      )}

      {/* Header Intro */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#1CA24B]" />
          Notice Board Header
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label className="block text-xs font-semibold text-slate-700 mb-1">Headline Title</label>
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
        </div>
      </div>

      {/* Tabs Switcher: Notices vs Events */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('notices')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'notices'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notices &amp; Circulars ({formData.items?.length || 0})</span>
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'events'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Events Calendar ({formData.events?.length || 0})</span>
        </button>
      </div>

      {/* TAB 1: Notices List */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Published Bulletin Notices</h3>
            <button
              onClick={() => setShowAddNotice(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Post New Notice
            </button>
          </div>

          {/* Add Notice Modal Form */}
          {showAddNotice && (
            <div className="bg-white p-6 rounded-2xl border border-[#1CA24B]/30 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">Create New Notice</h4>
                <button
                  onClick={() => setShowAddNotice(false)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleAddNotice} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Title *</label>
                    <input
                      type="text"
                      required
                      value={newNotice.title}
                      onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                      placeholder="e.g. Science Entrance Examination Details"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                    <select
                      value={newNotice.category}
                      onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                    >
                      <option value="Admissions">Admissions</option>
                      <option value="Examination">Examination</option>
                      <option value="Events">Events</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Notice Content</label>
                  <textarea
                    rows={4}
                    required
                    value={newNotice.content}
                    onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                    placeholder="Provide full description of circular or instructions..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Attachment File URL (Optional)</label>
                    <input
                      type="url"
                      value={newNotice.fileUrl}
                      onChange={(e) => setNewNotice({ ...newNotice, fileUrl: e.target.value })}
                      placeholder="https://example.com/files/routine.pdf"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-5">
                    <input
                      type="checkbox"
                      id="important-flag"
                      checked={newNotice.important}
                      onChange={(e) => setNewNotice({ ...newNotice, important: e.target.checked })}
                      className="w-4 h-4 text-[#1CA24B] rounded"
                    />
                    <label htmlFor="important-flag" className="text-xs font-semibold text-slate-700 cursor-pointer">
                      Mark as Important Notice (Red highlight)
                    </label>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddNotice(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs font-bold rounded-xl shadow-xs"
                  >
                    Publish Notice
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Notices Grid */}
          <div className="space-y-3">
            {formData.items?.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {item.category}
                    </span>
                    {item.important && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">
                        Important
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400">{item.createdAt}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.content}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleNoticeImportant(item.id)}
                    className={`p-2 rounded-lg border text-xs font-semibold cursor-pointer ${
                      item.important
                        ? 'border-red-200 bg-red-50 text-red-600'
                        : 'border-slate-200 text-slate-400 hover:text-slate-600'
                    }`}
                    title="Toggle Important"
                  >
                    <Pin className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteNotice(item.id)}
                    className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-200 cursor-pointer"
                    title="Delete notice"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Events List */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Upcoming College Events</h3>
            <button
              onClick={() => setShowAddEvent(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Event
            </button>
          </div>

          {/* Add Event Form */}
          {showAddEvent && (
            <div className="bg-white p-6 rounded-2xl border border-[#1CA24B]/30 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">Schedule New Event</h4>
                <button
                  onClick={() => setShowAddEvent(false)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleAddEvent} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Event Title *</label>
                    <input
                      type="text"
                      required
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="e.g. Science Exhibition & Robotics Fair"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Event Date</label>
                    <input
                      type="date"
                      required
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location / Venue</label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    placeholder="e.g. College Sports Ground"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Event Description</label>
                  <textarea
                    rows={3}
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Details about participation and schedule..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddEvent(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs font-bold rounded-xl shadow-xs"
                  >
                    Save Event
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.events?.map((ev) => (
              <div key={ev.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 relative shadow-xs">
                <button
                  onClick={() => deleteEvent(ev.id)}
                  className="absolute top-4 right-4 text-slate-300 hover:text-red-500 cursor-pointer"
                  title="Remove event"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-[#1CA24B] text-xs font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{ev.date}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{ev.title}</h4>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{ev.location}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{ev.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Save Bar */}
      <div className="sticky bottom-6 bg-slate-900 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between z-20">
        <div className="text-xs text-slate-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1CA24B] animate-pulse"></span>
          <span>Editing Notices &amp; News CMS</span>
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
