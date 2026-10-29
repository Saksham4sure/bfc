import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation } from 'swiper/modules'
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Compass } from 'lucide-react'
import { useCMS } from '../../../context/CMSContext'

export default function HeroSlider({ customSlides, themeOverride, inPreview = false }) {
  const { cms } = useCMS()

  const rawSlides = customSlides || cms.home?.heroSlides || []
  const activeSlides = rawSlides.filter((s) => s.isActive !== false)
  const slides = activeSlides.length > 0 ? activeSlides : rawSlides

  // Theme selected from CMS (or override in admin live preview)
  const theme = themeOverride || cms.home?.heroSliderTheme || 'awwwards-cinematic'

  const [activeIndex, setActiveIndex] = useState(0)
  const [progressKey, setProgressKey] = useState(0)
  const [swiperInstance, setSwiperInstance] = useState(null)

  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const AUTOPLAY_DELAY = 6500

  // Whenever active index changes, reset the smooth progress bar animation
  useEffect(() => {
    setProgressKey((prev) => prev + 1)
  }, [activeIndex])

  if (!slides || slides.length === 0) {
    return (
      <div className="h-96 w-full bg-zinc-950 flex items-center justify-center text-zinc-500 text-sm">
        No active slides configured.
      </div>
    )
  }

  // Helper for 2-digit index format (e.g. "01")
  const formatIndex = (idx) => String(idx + 1).padStart(2, '0')

  // Heights adjust cleanly for standard view vs live preview
  const containerHeightClass = inPreview
    ? 'h-[420px] sm:h-[480px]'
    : 'h-[560px] sm:h-[640px] lg:h-[720px]'

  return (
    <div className={`relative w-full overflow-hidden bg-zinc-950 select-none group ${containerHeightClass}`}>
      <Swiper
        modules={[Autoplay, EffectFade, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        autoplay={{
          delay: AUTOPLAY_DELAY,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper)
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex)
        }}
        loop={slides.length > 1}
        className="w-full h-full"
      >
        {slides.map((slide, index) => {
          const isCurrent = activeIndex === index

          // ==========================================
          // THEME 1: AWWWARDS CINEMATIC (Default)
          // ==========================================
          if (theme === 'awwwards-cinematic') {
            return (
              <SwiperSlide key={slide.id || index} className="relative w-full h-full overflow-hidden">
                {/* Background Image with Ken Burns Parallax Zoom */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className={`w-full h-full object-cover object-center ${
                      isCurrent ? 'awwwards-zoom-bg' : 'scale-100'
                    }`}
                  />
                  {/* Subtle Cinematic Vignette - Minimal dark overlays */}
                  <div className="absolute inset-0 bg-linear-to-r from-zinc-950/95 via-zinc-950/70 to-zinc-950/30" />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950/90 via-transparent to-zinc-950/40" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 max-w-7xl mx-auto h-full px-6 sm:px-10 lg:px-12 flex items-center">
                  <div className="max-w-3xl py-12 space-y-6">
                    {/* Badge */}
                    {slide.badge && (
                      <div className="awwwards-animate-badge">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wide backdrop-blur-md border border-white/15">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1CA24B]"></span>
                          <span>{slide.badge}</span>
                        </div>
                      </div>
                    )}

                    {/* Headline */}
                    <h1 className="awwwards-animate-title text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
                      {slide.title}
                    </h1>

                    {/* Subtitle */}
                    {slide.subtitle && (
                      <p className="awwwards-animate-sub text-sm sm:text-base lg:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl">
                        {slide.subtitle}
                      </p>
                    )}

                    {/* Minimalist Action Buttons */}
                    <div className="awwwards-animate-actions flex flex-wrap items-center gap-3.5 pt-2">
                      <Link
                        to={slide.buttonLink || '/admissions'}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 text-xs sm:text-sm font-bold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      >
                        <span>{slide.buttonText || 'Enroll Online Today'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <Link
                        to="/about"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                      >
                        <span>About College</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          }

          // ==========================================
          // THEME 2: SPLIT EDITORIAL
          // ==========================================
          if (theme === 'split-editorial') {
            return (
              <SwiperSlide key={slide.id || index} className="relative w-full h-full bg-zinc-950 overflow-hidden">
                <div className="max-w-7xl mx-auto h-full px-6 sm:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8">
                  {/* Left Column: Typography */}
                  <div className="lg:col-span-7 space-y-5 z-10">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
                        {formatIndex(index)} / {formatIndex(slides.length - 1)}
                      </span>
                      {slide.badge && (
                        <span className="inline-block px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium">
                          {slide.badge}
                        </span>
                      )}
                    </div>

                    <h1 className="awwwards-animate-title text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                      {slide.title}
                    </h1>

                    {slide.subtitle && (
                      <p className="awwwards-animate-sub text-xs sm:text-sm lg:text-base text-zinc-400 leading-relaxed max-w-xl">
                        {slide.subtitle}
                      </p>
                    )}

                    <div className="awwwards-animate-actions flex items-center gap-3 pt-2">
                      <Link
                        to={slide.buttonLink || '/admissions'}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 text-xs sm:text-sm font-bold hover:bg-zinc-200 transition-colors"
                      >
                        <span>{slide.buttonText || 'Discover More'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to="/academics"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-300 text-xs sm:text-sm font-medium hover:bg-zinc-900 transition-colors"
                      >
                        <span>Programs</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Framed Parallax Imagery */}
                  <div className="lg:col-span-5 h-[260px] sm:h-[340px] lg:h-[460px] relative rounded-3xl overflow-hidden border border-zinc-800/80 shadow-2xl">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className={`w-full h-full object-cover ${isCurrent ? 'awwwards-zoom-bg' : 'scale-100'}`}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-transparent to-transparent" />
                  </div>
                </div>
              </SwiperSlide>
            )
          }

          // ==========================================
          // THEME 3: MINIMAL LUXURY FULLSCREEN
          // ==========================================
          if (theme === 'minimal-luxury') {
            return (
              <SwiperSlide key={slide.id || index} className="relative w-full h-full overflow-hidden bg-zinc-950">
                <div className="absolute inset-0 z-0">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className={`w-full h-full object-cover filter brightness-[0.75] contrast-[1.05] ${
                      isCurrent ? 'awwwards-zoom-bg' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto h-full px-6 flex flex-col justify-center text-center items-center space-y-6">
                  {slide.badge && (
                    <div className="awwwards-animate-badge">
                      <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-300 border-b border-zinc-500/50 pb-1">
                        {slide.badge}
                      </span>
                    </div>
                  )}

                  <h1 className="awwwards-animate-title text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white max-w-4xl leading-tight">
                    {slide.title}
                  </h1>

                  {slide.subtitle && (
                    <p className="awwwards-animate-sub text-xs sm:text-sm lg:text-base text-zinc-300 font-light max-w-2xl leading-relaxed">
                      {slide.subtitle}
                    </p>
                  )}

                  <div className="awwwards-animate-actions pt-2 flex items-center justify-center gap-4">
                    <Link
                      to={slide.buttonLink || '/admissions'}
                      className="px-7 py-3 rounded-full bg-white text-zinc-950 text-xs sm:text-sm font-semibold tracking-wide hover:bg-zinc-200 transition-colors"
                    >
                      {slide.buttonText || 'Explore Admissions'}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            )
          }

          // ==========================================
          // THEME 4: CREATIVE FROSTED CARD
          // ==========================================
          return (
            <SwiperSlide key={slide.id || index} className="relative w-full h-full overflow-hidden bg-zinc-950">
              <div className="absolute inset-0 z-0">
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className={`w-full h-full object-cover ${isCurrent ? 'awwwards-zoom-bg' : 'scale-100'}`}
                />
                <div className="absolute inset-0 bg-zinc-950/50" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto h-full px-6 sm:px-10 flex items-center">
                <div className="max-w-xl bg-zinc-950/80 backdrop-blur-xl border border-white/15 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-5">
                  {slide.badge && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{slide.badge}</span>
                    </div>
                  )}

                  <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                    {slide.title}
                  </h1>

                  {slide.subtitle && (
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {slide.subtitle}
                    </p>
                  )}

                  <div className="pt-2 flex items-center gap-3">
                    <Link
                      to={slide.buttonLink || '/admissions'}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 text-xs font-bold hover:bg-zinc-100 transition-colors"
                    >
                      <span>{slide.buttonText || 'Get Started'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}

        {/* -------------------------------------------------------------
         * Awwwards Bottom Navigation Bar (Slide Counter + Progress + Arrows)
         * ------------------------------------------------------------- */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-12 right-6 sm:right-12 z-20 flex items-center justify-between pointer-events-none">
            {/* Left: Slide Counter & Animated Linear Progress Indicator */}
            <div className="pointer-events-auto flex items-center gap-3 bg-zinc-950/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-mono text-zinc-300">
              <span className="font-bold text-white">{formatIndex(activeIndex)}</span>
              <div className="w-16 sm:w-24 h-0.5 bg-white/20 rounded-full overflow-hidden relative">
                <div
                  key={progressKey}
                  className="h-full bg-white rounded-full"
                  style={{
                    animation: `awwwardsProgressFill ${AUTOPLAY_DELAY}ms linear forwards`,
                  }}
                />
              </div>
              <span className="text-zinc-500">{formatIndex(slides.length)}</span>
            </div>

            {/* Right: Minimalist Floating Arrows */}
            <div className="pointer-events-auto flex items-center gap-2">
              <button
                ref={prevRef}
                aria-label="Previous Slide"
                className="w-10 h-10 rounded-full bg-zinc-950/60 hover:bg-white hover:text-zinc-950 text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                ref={nextRef}
                aria-label="Next Slide"
                className="w-10 h-10 rounded-full bg-zinc-950/60 hover:bg-white hover:text-zinc-950 text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </Swiper>
    </div>
  )
}
