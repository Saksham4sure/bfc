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
  Clock,
  MapPin,
  Tag,
} from 'lucide-react'
import { useCMS } from '../../../context/CMSContext'

export default function EditNoticesPage() {
  const { cms, updatePage, resetPage } = useCMS()
  const [formData, setFormData] = useState(cms.notices || {})
  const [activeTab, setActiveTab] = useState('events') // 'events' | 'notices'
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showAddNotice, setShowAddNotice] = useState(false)
  const [showAddEvent, setShowAddEvent] = useState(false)

  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'General',
    content: '',
    important: false,
    createdAt: new Date().toISOString().split('T')[0],
  })

  const [newEvent, setNewEvent] = useState({
    title: '',
    category: 'Work',
    date: '2026-10-15',
    timeRange: '10 AM - 12 PM',
    location: 'Main Auditorium',
    description: '',
  })

  const handleSave = () => {
    updatePage('notices', formData)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleReset = () => {
    if (window.confirm('Reset Notices & Events Page content to defaults?')) {
      resetPage('notices')
      setTimeout(() => setFormData(cms.notices), 100)
    }
  }

  // --- Notice Actions ---
  const handleNoticeChange = (index, field, value) => {
    const updated = [...(formData.items || [])]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, items: updated })
  }

  const deleteNotice = (id) => {
    const updated = (formData.items || []).filter((n) => n.id !== id)
    setFormData({ ...formData, items: updated })
  }

  const handleAddNotice = (e) => {
    e.preventDefault()
    if (!newNotice.title) return
    const noticeToAdd = {
      id: `not-${Date.now()}`,
      ...newNotice,
    }
    setFormData({
      ...formData,
      items: [noticeToAdd, ...(formData.items || [])],
    })
    setShowAddNotice(false)
    setNewNotice({
      title: '',
      category: 'General',
      content: '',
      important: false,
      createdAt: new Date().toISOString().split('T')[0],
    })
  }

  // --- Event Actions ---
  const handleEventChange = (index, field, value) => {
    const updated = [...(formData.events || [])]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, events: updated })
  }

  const deleteEvent = (id) => {
    const updated = (formData.events || []).filter((e) => e.id !== id)
    setFormData({ ...formData, events: updated })
  }

  const handleAddEvent = (e) => {
    e.preventDefault()
    if (!newEvent.title) return
    const eventToAdd = {
      id: `ev-${Date.now()}`,
      ...newEvent,
    }
    setFormData({
      ...formData,
      events: [eventToAdd, ...(formData.events || [])],
    })
    setShowAddEvent(false)
    setNewEvent({
      title: '',
      category: 'Work',
      date: '2026-10-15',
      timeRange: '10 AM - 12 PM',
      location: 'Main Auditorium',
      description: '',
    })
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-zinc-500">
            <span>Page CMS</span>
            <span>&bull;</span>
            <span>Notices &amp; Events</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">
            Notices &amp; Calendar Events
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage interactive schedule events, circulars, and announcements.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/notices"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Page</span>
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
          <span>Notices &amp; Events updated successfully.</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-2">
        <button
          onClick={() => setActiveTab('events')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            activeTab === 'events'
              ? 'bg-zinc-900 text-white'
              : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Calendar Events ({(formData.events || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            activeTab === 'notices'
              ? 'bg-zinc-900 text-white'
              : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Official Circulars ({(formData.items || []).length})</span>
        </button>
      </div>

      {/* =========================================================
       * TAB 1: CALENDAR EVENTS
       * ========================================================= */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-zinc-900">
                Scheduled Calendar Events ({(formData.events || []).length})
              </h3>
              <p className="text-xs text-zinc-500">
                Shown inside the interactive weekly and monthly calendar.
              </p>
            </div>
            <button
              onClick={() => setShowAddEvent(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-semibold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Calendar Event
            </button>
          </div>

          {showAddEvent && (
            <div className="bg-white p-5 rounded-2xl border border-zinc-300 space-y-3">
              <h4 className="text-xs font-bold uppercase text-zinc-900">Add New Event</h4>
              <form onSubmit={handleAddEvent} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                      Category
                    </label>
                    <select
                      value={newEvent.category}
                      onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                      className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs bg-white"
                    >
                      <option value="Work">Work / Academic</option>
                      <option value="Personal">Personal</option>
                      <option value="Breaks">Breaks</option>
                      <option value="Events">Events / Sports</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                      Time Range
                    </label>
                    <input
                      type="text"
                      value={newEvent.timeRange}
                      onChange={(e) => setNewEvent({ ...newEvent, timeRange: e.target.value })}
                      placeholder="e.g. 10 AM - 12 PM"
                      className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddEvent(false)}
                    className="px-3 py-1.5 border border-zinc-200 rounded-lg text-xs text-zinc-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-zinc-900 text-white text-xs font-semibold rounded-lg"
                  >
                    Save Event
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-3">
            {(formData.events || []).map((ev, index) => (
              <div
                key={ev.id || index}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 space-y-2 relative"
              >
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 font-bold text-zinc-700">
                      {ev.category}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">{ev.date}</span>
                    <span>&bull;</span>
                    <span className="text-xs text-zinc-500 font-mono">{ev.timeRange}</span>
                  </div>
                  <button
                    onClick={() => deleteEvent(ev.id)}
                    className="p-1 text-zinc-400 hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-zinc-400">Title</label>
                    <input
                      type="text"
                      value={ev.title}
                      onChange={(e) => handleEventChange(index, 'title', e.target.value)}
                      className="w-full px-2.5 py-1 border border-zinc-200 rounded-lg text-xs font-bold text-zinc-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-zinc-400">Location</label>
                    <input
                      type="text"
                      value={ev.location || ''}
                      onChange={(e) => handleEventChange(index, 'location', e.target.value)}
                      className="w-full px-2.5 py-1 border border-zinc-200 rounded-lg text-xs text-zinc-700"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
       * TAB 2: OFFICIAL NOTICES
       * ========================================================= */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-900">
              Published Circulars ({(formData.items || []).length})
            </h3>
            <button
              onClick={() => setShowAddNotice(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-semibold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Circular
            </button>
          </div>

          {showAddNotice && (
            <div className="bg-white p-5 rounded-2xl border border-zinc-300 space-y-3">
              <h4 className="text-xs font-bold uppercase text-zinc-900">Add Circular</h4>
              <form onSubmit={handleAddNotice} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">Category</label>
                    <input
                      type="text"
                      value={newNotice.category}
                      onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                      className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">Date</label>
                    <input
                      type="date"
                      value={newNotice.createdAt}
                      onChange={(e) => setNewNotice({ ...newNotice, createdAt: e.target.value })}
                      className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">Content</label>
                  <textarea
                    rows={2}
                    value={newNotice.content}
                    onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                    className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddNotice(false)}
                    className="px-3 py-1.5 text-xs text-zinc-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-zinc-900 text-white text-xs font-semibold rounded-lg"
                  >
                    Save Circular
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-3">
            {(formData.items || []).map((notice, index) => (
              <div key={notice.id || index} className="bg-white p-4 rounded-2xl border border-zinc-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono bg-zinc-100 px-2 py-0.5 rounded text-zinc-700">
                    {notice.category}
                  </span>
                  <button
                    onClick={() => deleteNotice(notice.id)}
                    className="p-1 text-zinc-400 hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  value={notice.title}
                  onChange={(e) => handleNoticeChange(index, 'title', e.target.value)}
                  className="w-full px-2.5 py-1 border border-zinc-200 rounded-lg text-xs font-bold text-zinc-900"
                />
                <textarea
                  rows={2}
                  value={notice.content}
                  onChange={(e) => handleNoticeChange(index, 'content', e.target.value)}
                  className="w-full px-2.5 py-1 border border-zinc-200 rounded-lg text-xs text-zinc-600"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
