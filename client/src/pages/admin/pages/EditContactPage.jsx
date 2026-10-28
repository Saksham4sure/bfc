import { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Trash2,
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
  const [filterRead, setFilterRead] = useState('ALL')

  const handleSave = () => {
    updatePage('contact', formData)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleReset = () => {
    if (window.confirm('Reset Contact Page to defaults?')) {
      resetPage('contact')
      setTimeout(() => setFormData(cms.contact), 100)
    }
  }

  const toggleReadStatus = (id) => {
    const updated = formData.inquiries.map((inq) =>
      inq.id === id ? { ...inq, isRead: !inq.isRead } : inq
    )
    setFormData({ ...formData, inquiries: updated })
  }

  const deleteInquiry = (id) => {
    if (window.confirm('Delete this inquiry?')) {
      const updated = formData.inquiries.filter((inq) => inq.id !== id)
      setFormData({ ...formData, inquiries: updated })
    }
  }

  const filteredInquiries = (formData.inquiries || []).filter((inq) => {
    if (filterRead === 'UNREAD') return !inq.isRead
    if (filterRead === 'READ') return inq.isRead
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1CA24B]">
            <span>Page CMS</span>
            <span>&bull;</span>
            <span>Contact &amp; Inquiries</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
            <span>Contact Page Content</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#1CA24B] font-bold">
              /contact
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Update institutional address, contact phone, inquiries email, and inspect incoming messages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/contact"
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
          <div className="font-semibold">Contact Page and details updated successfully!</div>
        </div>
      )}

      {/* Header Intro */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Phone className="w-4 h-4 text-[#1CA24B]" />
          Contact Page Header
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

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Description / Subtitle</label>
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

      {/* Contact Parameters */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#1CA24B]" />
          Campus Contact &amp; Office Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Campus Physical Address</label>
            <input
              type="text"
              value={formData.info?.address || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  info: { ...formData.info, address: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Phone / Summary</label>
            <input
              type="text"
              value={formData.info?.phone || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  info: { ...formData.info, phone: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Landlines (comma-separated)</label>
            <input
              type="text"
              value={
                Array.isArray(formData.info?.landlines)
                  ? formData.info.landlines.join(', ')
                  : formData.info?.landlines || ''
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  info: {
                    ...formData.info,
                    landlines: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  },
                })
              }
              placeholder="01-5434319, 01-5454894, 01-5444807"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile / Hotline Numbers (comma-separated)</label>
            <input
              type="text"
              value={
                Array.isArray(formData.info?.mobilePhones)
                  ? formData.info.mobilePhones.join(', ')
                  : formData.info?.mobilePhones || ''
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  info: {
                    ...formData.info,
                    mobilePhones: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  },
                })
              }
              placeholder="9851153747, 9851153746, 9851020251, 9843042785"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Official Email Address</label>
            <input
              type="email"
              value={formData.info?.email || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  info: { ...formData.info, email: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Office Hours</label>
            <input
              type="text"
              value={formData.info?.hours || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  info: { ...formData.info, hours: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>
        </div>
      </div>

      {/* Received Inquiries Inbox */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Inbox className="w-5 h-5 text-[#1CA24B]" />
              Visitor Inquiries Inbox ({formData.inquiries?.length || 0})
            </h3>
            <p className="text-xs text-slate-500">
              Messages submitted online through the contact form on /contact.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {['ALL', 'UNREAD', 'READ'].map((f) => (
              <button
                key={f}
                onClick={() => setFilterRead(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filterRead === f
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredInquiries.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
              No inquiries found matching selected filter.
            </div>
          ) : (
            filteredInquiries.map((inq) => (
              <div
                key={inq.id}
                className={`p-5 rounded-2xl border transition-all ${
                  inq.isRead ? 'bg-slate-50/50 border-slate-200' : 'bg-emerald-50/30 border-emerald-200/80'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{inq.name}</span>
                      <span className="text-xs text-slate-400">&bull; {inq.email}</span>
                      <span className="text-[11px] text-slate-400">&bull; {inq.date}</span>
                      {!inq.isRead && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#1CA24B] text-[10px] font-extrabold">
                          NEW
                        </span>
                      )}
                    </div>
                    <h5 className="text-xs font-bold text-slate-800">{inq.subject}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">{inq.message}</p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => toggleReadStatus(inq.id)}
                      className="px-2.5 py-1 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                    >
                      {inq.isRead ? 'Mark Unread' : 'Mark Read'}
                    </button>
                    <button
                      onClick={() => deleteInquiry(inq.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Floating Save Bar */}
      <div className="sticky bottom-6 bg-slate-900 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between z-20">
        <div className="text-xs text-slate-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1CA24B] animate-pulse"></span>
          <span>Editing Contact Page CMS</span>
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
