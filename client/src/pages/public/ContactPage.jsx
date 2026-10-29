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
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          {header.badge && (
            <span className="text-xs uppercase font-bold tracking-wider text-zinc-500">
              {header.badge}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 mt-2 mb-3 tracking-tight">
            {header.title || 'We Are Here to Assist You'}
          </h1>
          {header.description && (
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              {header.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details Card */}
          <div className="bg-zinc-50/70 p-8 rounded-3xl border border-zinc-200 space-y-6">
            <h2 className="text-lg font-bold text-zinc-900 mb-2">Campus Details</h2>

            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[11px] font-bold text-zinc-400 uppercase">Campus Location</h3>
                <p className="text-xs font-semibold text-zinc-800 mt-0.5">{info.address || 'Satdobato, Lalitpur, Nepal'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[11px] font-bold text-zinc-400 uppercase">Landlines (Administration)</h3>
                <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1 font-mono">
                  {(info.landlines || ['01-5434319', '01-5454894', '01-5444807']).map((tel) => (
                    <a
                      key={tel}
                      href={`tel:${tel.replace(/-/g, '')}`}
                      className="text-xs font-medium text-zinc-800 hover:text-black bg-zinc-200/60 px-2 py-0.5 rounded transition-colors"
                    >
                      {tel}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center shrink-0">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[11px] font-bold text-zinc-400 uppercase">Mobile Hotlines</h3>
                <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1 font-mono">
                  {(info.mobilePhones || ['9851153747', '9851153746', '9851020251', '9843042785']).map((mob) => (
                    <a
                      key={mob}
                      href={`tel:${mob}`}
                      className="text-xs font-medium text-zinc-800 hover:text-black bg-zinc-200/60 px-2 py-0.5 rounded transition-colors"
                    >
                      {mob}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[11px] font-bold text-zinc-400 uppercase">Inquiry Email</h3>
                <a
                  href={`mailto:${info.email || 'info@brightfuture.edu.np'}`}
                  className="text-xs font-medium text-zinc-800 hover:text-black font-mono block mt-0.5"
                >
                  {info.email || 'info@brightfuture.edu.np'}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[11px] font-bold text-zinc-400 uppercase">Office Hours</h3>
                <p className="text-xs text-zinc-700 mt-0.5">{info.hours || 'Sunday – Friday: 5:00 AM – 5:00 PM'}</p>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-2 bg-zinc-50/70 p-8 rounded-3xl border border-zinc-200">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 rounded-full bg-zinc-900 text-white flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-zinc-900 mb-2">Message Dispatched!</h2>
                <p className="text-zinc-600 max-w-md mx-auto text-sm leading-relaxed">
                  Thank you for contacting Bright Future School &amp; College. Our counseling team will review your message and reply promptly.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-zinc-900 text-white text-xs sm:text-sm font-semibold hover:bg-zinc-800 cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                    Inquiry Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    placeholder="e.g. +2 Science scholarship entrance query"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm leading-relaxed focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    placeholder="Type your inquiry message here..."
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
