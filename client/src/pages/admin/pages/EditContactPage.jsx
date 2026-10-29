import { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  Inbox,
  Check,
} from 'lucide-react'
import { useCMS } from '../../../context/CMSContext'

export default function EditContactPage() {
  const { cms, updatePage, resetPage } = useCMS()
  const [formData, setFormData] = useState(cms.contact || {})
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = () => {
    updatePage('contact', formData)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleReset = () => {
    if (window.confirm('Reset Contact Page content to defaults?')) {
      resetPage('contact')
      setTimeout(() => setFormData(cms.contact), 100)
    }
  }

  const handleInfoChange = (field, value) => {
    setFormData({
      ...formData,
      info: { ...(formData.info || {}), [field]: value },
    })
  }

  const toggleInquiryRead = (id) => {
    const updated = (formData.inquiries || []).map((inq) =>
      inq.id === id ? { ...inq, isRead: !inq.isRead } : inq
    )
    setFormData({ ...formData, inquiries: updated })
  }

  const inquiries = formData.inquiries || []

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-zinc-500">
            <span>Page CMS</span>
            <span>&bull;</span>
            <span>Contact &amp; Inquiries</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">
            Contact Details &amp; User Inquiries
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage official address, telephone numbers, hours, and inbox messages.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/contact"
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
          <span>Contact info updated successfully.</span>
        </div>
      )}

      {/* Campus Info Configuration */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-4">
        <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-zinc-600" />
          Campus Location &amp; Hotlines
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Address</label>
            <input
              type="text"
              value={formData.info?.address || ''}
              onChange={(e) => handleInfoChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Email</label>
            <input
              type="email"
              value={formData.info?.email || ''}
              onChange={(e) => handleInfoChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Phone Desk</label>
            <input
              type="text"
              value={formData.info?.phone || ''}
              onChange={(e) => handleInfoChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Office Hours</label>
            <input
              type="text"
              value={formData.info?.hours || ''}
              onChange={(e) => handleInfoChange('hours', e.target.value)}
              className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs"
            />
          </div>
        </div>
      </div>

      {/* Inquiries Inbox */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
            <Inbox className="w-4 h-4 text-zinc-600" />
            <span>User Inquiries ({inquiries.length})</span>
          </h3>
        </div>

        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
                inq.isRead ? 'bg-white border-zinc-200' : 'bg-zinc-50 border-zinc-300 font-medium'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold text-zinc-900">{inq.subject}</h4>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                    <span>{inq.name} ({inq.email})</span>
                    <span>&bull;</span>
                    <span className="font-mono">{inq.date}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleInquiryRead(inq.id)}
                  className="px-2.5 py-1 rounded-md text-xs font-medium border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 cursor-pointer self-start sm:self-auto"
                >
                  {inq.isRead ? 'Mark as Unread' : 'Mark as Read'}
                </button>
              </div>

              <p className="mt-2 text-xs text-zinc-600 leading-relaxed">{inq.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
