import { useState } from 'react'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { useCMS } from '../../context/CMSContext'

export default function AdmissionsPage() {
  const { cms, submitAdmissionApplication } = useCMS()
  const admissions = cms.admissions || {}
  const header = admissions.header || {}
  const programOptions = admissions.programs || [
    'School Level (Grades 1-10)',
    '+2 Science',
    '+2 Management',
    '+2 Humanities & Law',
  ]

  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    program: programOptions[0] || '+2 Science',
    previousSchool: '',
    gpaScore: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    submitAdmissionApplication(formData)
    setSubmitted(true)
  }

  return (
    <div className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {header.badge && (
            <span className="text-xs uppercase font-bold tracking-wider text-zinc-500">
              {header.badge}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 mt-2 mb-4 tracking-tight">
            {header.title || 'Online Admission Application'}
          </h1>
          {header.description && (
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              {header.description}
            </p>
          )}

          {header.isOpen === false && (
            <div className="mt-4 p-3 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-semibold inline-flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-zinc-500" />
              <span>Admissions are currently closed for online submission. Please contact our counseling desk.</span>
            </div>
          )}
        </div>

        <div className="bg-zinc-50/70 p-8 sm:p-10 rounded-3xl border border-zinc-200">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-14 h-14 rounded-full bg-zinc-900 text-white flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-2">Application Received!</h2>
              <p className="text-zinc-600 max-w-md mx-auto text-sm leading-relaxed">
                Thank you for applying to Bright Future School/College. Our admissions team will review your application and reach out within 2 business days.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 rounded-full bg-zinc-900 text-white text-xs sm:text-sm font-semibold hover:bg-zinc-800 cursor-pointer"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                    Applicant Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 text-sm"
                    placeholder="e.g. Aayush Sharma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 text-sm"
                    placeholder="e.g. applicant@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 text-sm"
                    placeholder="e.g. +977 9841234567"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                    Target Academic Program *
                  </label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 text-sm"
                  >
                    {programOptions.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                    Previous School / Institution
                  </label>
                  <input
                    type="text"
                    value={formData.previousSchool}
                    onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 text-sm"
                    placeholder="Previous school attended"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                    GPA / Score
                  </label>
                  <input
                    type="text"
                    value={formData.gpaScore}
                    onChange={(e) => setFormData({ ...formData, gpaScore: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 text-sm"
                    placeholder="e.g. 3.85 GPA"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1.5">
                  Additional Information or Questions
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 text-sm leading-relaxed"
                  placeholder="Share any special interests, scholarships, or questions..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={header.isOpen === false}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
