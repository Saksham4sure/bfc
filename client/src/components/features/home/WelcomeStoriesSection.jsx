import { Link } from 'react-router-dom'
import { ArrowRight, Quote, Sparkles } from 'lucide-react'

export default function WelcomeStoriesSection({ stories = [] }) {
  if (!stories || stories.length === 0) return null

  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {stories.map((story, index) => {
          const theme = story.theme || 'text-left-image-right'
          const paragraphs = Array.isArray(story.paragraphs)
            ? story.paragraphs
            : typeof story.paragraphs === 'string'
            ? story.paragraphs.split('\n\n').filter(Boolean)
            : []

          // Theme 1: Text Left & Image Right
          if (theme === 'text-left-image-right') {
            return (
              <div
                key={story.id || index}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors"
              >
                <div className="lg:col-span-7 space-y-5">
                  {story.indicator && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1CA24B]"></span>
                      <span>{story.indicator}</span>
                    </div>
                  )}

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {story.title}
                  </h2>

                  <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                    {paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {story.buttonText && (
                    <div className="pt-2">
                      <Link
                        to={story.buttonLink || '/about'}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#1CA24B]/20 transition-all hover:translate-x-1"
                      >
                        <span>{story.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-5">
                  <div className="relative rounded-3xl overflow-hidden aspect-4/3 sm:aspect-5/4 shadow-sm border border-slate-200 group">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            )
          }

          // Theme 2: Image Left & Text Right
          if (theme === 'image-left-text-right') {
            return (
              <div
                key={story.id || index}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors"
              >
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="relative rounded-3xl overflow-hidden aspect-4/3 sm:aspect-5/4 shadow-sm border border-slate-200 group">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
                  {story.indicator && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1CA24B]"></span>
                      <span>{story.indicator}</span>
                    </div>
                  )}

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {story.title}
                  </h2>

                  <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                    {paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {story.buttonText && (
                    <div className="pt-2">
                      <Link
                        to={story.buttonLink || '/about'}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#1CA24B]/20 transition-all hover:translate-x-1"
                      >
                        <span>{story.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )
          }

          // Theme 3: Dark Card
          if (theme === 'dark-hero-card') {
            return (
              <div
                key={story.id || index}
                className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
                  <div className="lg:col-span-7 space-y-5">
                    {story.indicator && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1CA24B]"></span>
                        <span>{story.indicator}</span>
                      </div>
                    )}

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                      {story.title}
                    </h2>

                    <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                      {paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>

                    {story.buttonText && (
                      <div className="pt-2">
                        <Link
                          to={story.buttonLink || '/about'}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#1CA24B]/20 transition-all"
                        >
                          <span>{story.buttonText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-5">
                    <div className="rounded-2xl overflow-hidden aspect-4/3 shadow-md border border-slate-800 group">
                      <img
                        src={story.imageUrl}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          // Theme 4: Executive / Principal's Message Style (Clean White & Quote)
          if (theme === 'quote-executive') {
            return (
              <div
                key={story.id || index}
                className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs relative overflow-hidden"
              >
                <Quote className="w-20 h-20 text-slate-100 absolute -bottom-4 right-4 pointer-events-none" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  <div className="lg:col-span-4 flex flex-col items-center text-center space-y-3">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-sm border border-slate-200 shrink-0">
                      <img
                        src={story.imageUrl}
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {story.indicator && (
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                        {story.indicator}
                      </span>
                    )}
                  </div>

                  <div className="lg:col-span-8 space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                      {story.title}
                    </h2>
                    <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed italic">
                      {paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>&ldquo;{p}&rdquo;</p>
                      ))}
                    </div>

                    {story.buttonText && (
                      <div className="pt-2 not-italic">
                        <Link
                          to={story.buttonLink || '/about'}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#1CA24B]/20 transition-all"
                        >
                          <span>{story.buttonText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          }

          // Theme 5: Centered Spotlight / Magazine Banner
          return (
            <div
              key={story.id || index}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-colors"
            >
              <div className="aspect-21/9 sm:aspect-3/1 w-full relative overflow-hidden bg-slate-900">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/30 to-transparent flex items-end p-6 sm:p-10">
                  {story.indicator && (
                    <span className="px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-xs text-xs font-semibold uppercase tracking-wider border border-white/10">
                      {story.indicator}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-8 sm:p-12 space-y-4 max-w-4xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {story.title}
                </h2>
                <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed text-left sm:text-center">
                  {paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {story.buttonText && (
                  <div className="pt-4 flex justify-center">
                    <Link
                      to={story.buttonLink || '/about'}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#1CA24B]/20 transition-all"
                    >
                      <span>{story.buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
