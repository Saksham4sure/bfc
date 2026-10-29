import { Link } from 'react-router-dom'
import { ArrowRight, Quote } from 'lucide-react'

export default function WelcomeStoriesSection({ stories = [] }) {
  if (!stories || stories.length === 0) return null

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {stories.map((story, index) => {
          const theme = story.theme || 'text-left-image-right'
          const paragraphs = Array.isArray(story.paragraphs)
            ? story.paragraphs
            : typeof story.paragraphs === 'string'
            ? story.paragraphs.split('\n\n').filter(Boolean)
            : []

          // Theme 1: Text Left & Image Right (Minimalist Modern)
          if (theme === 'text-left-image-right') {
            return (
              <div
                key={story.id || index}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-zinc-50/50 p-8 sm:p-12 rounded-3xl border border-zinc-200/80 hover:border-zinc-300 transition-colors"
              >
                <div className="lg:col-span-7 space-y-5">
                  {story.indicator && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-zinc-700 text-xs font-semibold border border-zinc-200 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1CA24B]"></span>
                      <span>{story.indicator}</span>
                    </div>
                  )}

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
                    {story.title}
                  </h2>

                  <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                    {paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {story.buttonText && (
                    <div className="pt-2">
                      <Link
                        to={story.buttonLink || '/about'}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>{story.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-5">
                  <div className="relative rounded-3xl overflow-hidden aspect-4/3 sm:aspect-5/4 shadow-sm border border-zinc-200 group">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-zinc-50/50 p-8 sm:p-12 rounded-3xl border border-zinc-200/80 hover:border-zinc-300 transition-colors"
              >
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="relative rounded-3xl overflow-hidden aspect-4/3 sm:aspect-5/4 shadow-sm border border-zinc-200 group">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
                  {story.indicator && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-zinc-700 text-xs font-semibold border border-zinc-200 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1CA24B]"></span>
                      <span>{story.indicator}</span>
                    </div>
                  )}

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
                    {story.title}
                  </h2>

                  <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                    {paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {story.buttonText && (
                    <div className="pt-2">
                      <Link
                        to={story.buttonLink || '/about'}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
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

          // Theme 3: Minimal Dark Card
          if (theme === 'dark-hero-card') {
            return (
              <div
                key={story.id || index}
                className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-12 border border-zinc-800 shadow-xl relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
                  <div className="lg:col-span-7 space-y-5">
                    {story.indicator && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 text-zinc-300 text-xs font-medium border border-zinc-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                        <span>{story.indicator}</span>
                      </div>
                    )}

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                      {story.title}
                    </h2>

                    <div className="space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
                      {paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>

                    {story.buttonText && (
                      <div className="pt-2">
                        <Link
                          to={story.buttonLink || '/about'}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 text-xs sm:text-sm font-bold hover:bg-zinc-200 transition-all"
                        >
                          <span>{story.buttonText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-5">
                    <div className="rounded-2xl overflow-hidden aspect-4/3 shadow-md border border-zinc-800 group">
                      <img
                        src={story.imageUrl}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          // Theme 4: Executive / Clean White Quote Style
          if (theme === 'quote-executive') {
            return (
              <div
                key={story.id || index}
                className="bg-white rounded-3xl p-8 sm:p-12 border border-zinc-200 shadow-xs relative overflow-hidden"
              >
                <Quote className="w-20 h-20 text-zinc-100 absolute -bottom-4 right-4 pointer-events-none" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  <div className="lg:col-span-4 flex flex-col items-center text-center space-y-3">
                    <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden shadow-sm border border-zinc-200 shrink-0">
                      <img
                        src={story.imageUrl}
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {story.indicator && (
                      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block">
                        {story.indicator}
                      </span>
                    )}
                  </div>

                  <div className="lg:col-span-8 space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 leading-tight">
                      {story.title}
                    </h2>
                    <div className="space-y-3 text-zinc-700 text-sm sm:text-base leading-relaxed italic">
                      {paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>&ldquo;{p}&rdquo;</p>
                      ))}
                    </div>

                    {story.buttonText && (
                      <div className="pt-2 not-italic">
                        <Link
                          to={story.buttonLink || '/about'}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold transition-all"
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

          // Theme 5: Panoramic Spotlight
          return (
            <div
              key={story.id || index}
              className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-xs hover:border-zinc-300 transition-colors"
            >
              <div className="aspect-21/9 sm:aspect-3/1 w-full relative overflow-hidden bg-zinc-950">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-zinc-950/30 to-transparent flex items-end p-6 sm:p-10">
                  {story.indicator && (
                    <span className="px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-xs text-xs font-semibold uppercase tracking-wider border border-white/10">
                      {story.indicator}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-8 sm:p-12 space-y-4 max-w-4xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  {story.title}
                </h2>
                <div className="space-y-3 text-zinc-600 text-sm sm:text-base leading-relaxed text-left sm:text-center">
                  {paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {story.buttonText && (
                  <div className="pt-4 flex justify-center">
                    <Link
                      to={story.buttonLink || '/about'}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold transition-all"
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
