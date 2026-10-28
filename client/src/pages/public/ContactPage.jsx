import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Smartphone } from 'lucide-react'
import { useCMS } from '../../context/CMSContext'

export default function ContactPage() {
  const { cms, submitContactInquiry } = useCMS()
  const contact = cms.contact || {}
  const header = contact.header || {}
  const info = contact.info || {}

  const [sent, setSent] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    submitContactInquiry(formData)
    setSent(true)
  }

  return (
    <div className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          {header.badge && (
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#1CA24B]">
              {header.badge}
            </span>
          )}
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2 mb-3">
            {header.title || 'We Are Here to Assist You'}
          </h1>
          {header.description && (
            <p className="text-slate-600">
              {header.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details Card */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Contact Information</h2>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase">Campus Location</h3>
                <p className="text-sm font-medium text-slate-800 mt-0.5">{info.address || 'Satdobato, Lalitpur, Nepal'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase">Landlines (Administration)</h3>
                <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1">
                  {(info.landlines || ['01-5434319', '01-5454894', '01-5444807']).map((tel) => (
                    <a
                      key={tel}
                      href={`tel:${tel.replace(/-/g, '')}`}
                      className="text-xs font-semibold text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded transition-colors"
                    >
                      {tel}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase">Mobile &amp; Hotline</h3>
                <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1">
                  {(info.mobilePhones || ['9851153747', '9851153746', '9851020251', '9843042785']).map((mob) => (
                    <a
                      key={mob}
                      href={`tel:${mob}`}
                      className="text-xs font-semibold text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded transition-colors"
                    >
                      {mob}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase">Email Address</h3>
                <a
                  href={`mailto:${info.email || 'info@bfc.edu.np'}`}
                  className="text-sm font-medium text-slate-800 hover:text-slate-950 mt-0.5 block transition-colors"
                >
                  {info.email || 'info@bfc.edu.np'}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase">Office Hours</h3>
                <p className="text-sm font-medium text-slate-800 mt-0.5">{info.hours || '5:00 AM - 5:00 PM'}</p>
                {info.saturday && (
                  <p className="text-xs text-slate-400">{info.saturday}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#1CA24B] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Message Sent Successfully!</h2>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you for writing to us. Our desk officers will respond to your query as soon as possible.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-[#1CA24B] text-white text-sm font-bold hover:bg-[#16843c] cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1CA24B]/30 text-sm"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1CA24B]/30 text-sm"
                      placeholder="e.g. john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1CA24B]/30 text-sm"
                    placeholder="Inquiry regarding +2 Science admission"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
                    Message Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1CA24B]/30 text-sm"
                    placeholder="Type your message here..."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white font-bold text-sm shadow-md shadow-[#1CA24B]/20 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
