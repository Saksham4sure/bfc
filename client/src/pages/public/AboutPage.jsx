import { Target, Eye, CheckCircle2 } from 'lucide-react'
import { useCMS } from '../../context/CMSContext'

export default function AboutPage() {
  const { cms } = useCMS()
  const about = cms.about || {}
  const header = about.header || {}
  const vision = about.vision || {}
  const mission = about.mission || {}
  const coreValues = about.coreValues || []

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
            {header.title || 'Shaping the Future with Knowledge & Values'}
          </h1>
          {header.description && (
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              {header.description}
            </p>
          )}
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-zinc-50/70 p-8 rounded-2xl border border-zinc-200">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center mb-5">
              <Eye className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 mb-2">
              {vision.title || 'Our Vision'}
            </h2>
            <p className="text-zinc-600 text-sm leading-relaxed">
              {vision.description}
            </p>
          </div>

          <div className="bg-zinc-50/70 p-8 rounded-2xl border border-zinc-200">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center mb-5">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 mb-2">
              {mission.title || 'Our Mission'}
            </h2>
            <p className="text-zinc-600 text-sm leading-relaxed">
              {mission.description}
            </p>
          </div>
        </div>

        {/* Core Values */}
        {coreValues.length > 0 && (
          <div className="bg-white p-8 rounded-2xl border border-zinc-200">
            <h2 className="text-xl font-bold text-zinc-900 mb-6">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((val, idx) => (
                <div key={val.id || idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-zinc-800 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-zinc-900 text-sm">{val.title}</h3>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
