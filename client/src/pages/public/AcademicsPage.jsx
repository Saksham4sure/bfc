import { BookOpen, Check } from 'lucide-react'
import { useCMS } from '../../context/CMSContext'

export default function AcademicsPage() {
  const { cms } = useCMS()
  const academics = cms.academics || {}
  const header = academics.header || {}
  const programs = academics.programs || []

  return (
    <div className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {header.badge && (
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#1CA24B]">
              {header.badge}
            </span>
          )}
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2 mb-4">
            {header.title || 'Curriculum Tailored for Future Pioneers'}
          </h1>
          {header.description && (
            <p className="text-slate-600">
              {header.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((prog, idx) => (
            <div
              key={prog.id || idx}
              className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#1CA24B]/30 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-5">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">{prog.level}</h2>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">{prog.description}</p>
              {prog.features && prog.features.length > 0 && (
                <>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Key Highlights
                  </h3>
                  <ul className="space-y-2.5">
                    {prog.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5 text-sm text-slate-700">
                        <Check className="w-4 h-4 text-slate-500 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
