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
    <div className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {header.badge && (
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#1CA24B]">
              {header.badge}
            </span>
          )}
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2 mb-4">
            {header.title || 'Online Admission Application'}
          </h1>
          {header.description && (
            <p className="text-slate-600">
              {header.description}
            </p>
          )}

          {header.isOpen === false && (
            <div className="mt-4 p-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold inline-flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-slate-500" />
              <span>Admissions are currently closed for online submission. Please contact our counseling desk.</span>
            </div>
          )}
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xs">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#1CA24B] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Received!</h2>
              <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                Thank you for applying to Bright Future School/College. Our admissions team will review your application and reach out within 2 business days.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 rounded-xl bg-[#1CA24B] text-white text-sm font-bold hover:bg-[#16843c] cursor-pointer"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
                    Applicant Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1CA24B]/30 text-sm"
                    placeholder="e.g. Aayush Sharma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1CA24B]/30 text-sm"
                    placeholder="name@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1CA24B]/30 text-sm"
                    placeholder="+977 98XXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
                    Applying For Program *
                  </label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1CA24B]/30 text-sm bg-white"
                  >
                    {programOptions.map((prog, idx) => (
                      <option key={idx} value={prog}>
                        {prog}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
                    Previous School / Institution
                  </label>
                  <input
                    type="text"
                    value={formData.previousSchool}
                    onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1CA24B]/30 text-sm"
                    placeholder="Previous school name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
                    SEE / Previous GPA Score
                  </label>
                  <input
                    type="text"
                    value={formData.gpaScore}
                    onChange={(e) => setFormData({ ...formData, gpaScore: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1CA24B]/30 text-sm"
                    placeholder="e.g. 3.85"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">
                  Additional Notes or Questions
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1CA24B]/30 text-sm"
                  placeholder="Tell us about your interests, extracurriculars, or queries..."
                />
              </div>

              <button
                type="submit"
                disabled={header.isOpen === false}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-[#1CA24B]/20 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Submit Application
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
