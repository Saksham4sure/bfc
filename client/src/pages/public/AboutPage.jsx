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
    <div className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {header.badge && (
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#1CA24B]">
              {header.badge}
            </span>
          )}
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2 mb-4">
            {header.title || 'Shaping the Future with Knowledge & Values'}
          </h1>
          {header.description && (
            <p className="text-slate-600 leading-relaxed">
              {header.description}
            </p>
          )}
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-5">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              {vision.title || 'Our Vision'}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {vision.description}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-5">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              {mission.title || 'Our Mission'}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {mission.description}
            </p>
          </div>
        </div>

        {/* Core Values */}
        {coreValues.length > 0 && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((val, idx) => (
                <div key={val.id || idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1CA24B] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">{val.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-normal">{val.desc}</p>
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
