import { BookOpen, Check } from 'lucide-react'
import { useCMS } from '../../context/CMSContext'

export default function AcademicsPage() {
  const { cms } = useCMS()
  const academics = cms.academics || {}
  const header = academics.header || {}
  const programs = academics.programs || []

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {header.badge && (
            <span className="text-xs uppercase font-bold tracking-wider text-zinc-500">
              {header.badge}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 mt-2 mb-4 tracking-tight">
            {header.title || 'Curriculum Tailored for Future Pioneers'}
          </h1>
          {header.description && (
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              {header.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((prog, idx) => (
            <div
              key={prog.id || idx}
              className="bg-zinc-50/70 p-8 rounded-2xl border border-zinc-200 hover:border-zinc-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center mb-5">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-2">{prog.level}</h2>
              <p className="text-zinc-600 text-sm mb-6 leading-relaxed">{prog.description}</p>
              {prog.features && prog.features.length > 0 && (
                <>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                    Key Highlights
                  </h3>
                  <ul className="space-y-2">
                    {prog.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-700">
                        <Check className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
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
