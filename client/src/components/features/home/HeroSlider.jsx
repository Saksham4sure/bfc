import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { useCMS } from '../../../context/CMSContext'

export default function HeroSlider() {
  const { cms } = useCMS()
  const rawSlides = cms.home?.heroSlides || []
  const activeSlides = rawSlides.filter((s) => s.isActive !== false)
  const slides = activeSlides.length > 0 ? activeSlides : rawSlides

  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 group">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={900}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
        }}
        loop={slides.length > 1}
        className="h-[520px] sm:h-[600px] lg:h-[680px] w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id || index} className="relative w-full h-full select-none">
            {/* Background Image with Dark Vignette Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover object-center transform scale-100 animate-in fade-in zoom-in-105 duration-1000"
              />
              <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-slate-950/40" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-slate-950/30" />
            </div>

            {/* Slide Content */}
            <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-2xl py-12 space-y-6">
                {/* Badge Indicator */}
                {slide.badge && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold tracking-wide backdrop-blur-md border border-white/20 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-[#1CA24B]" />
                    <span>{slide.badge}</span>
                  </div>
                )}

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] drop-shadow-md">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                {slide.subtitle && (
                  <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-xl font-normal drop-shadow-sm">
                    {slide.subtitle}
                  </p>
                )}

                {/* Fixed & Polished Slider Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to={slide.buttonLink || '/admissions'}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-sm font-extrabold shadow-xl shadow-[#1CA24B]/30 hover:shadow-[#1CA24B]/50 transition-all hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
                  >
                    <span>{slide.buttonText || 'Enroll Online Today'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold backdrop-blur-md border border-white/25 hover:border-white/40 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span>About College</span>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Sleek Slider Navigation Buttons (Prev / Next) */}
        {slides.length > 1 && (
          <>
            <button
              ref={prevRef}
              aria-label="Previous Slide"
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-slate-900/60 hover:bg-[#1CA24B] text-white border border-white/20 hover:border-[#1CA24B] backdrop-blur-md flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer opacity-80 sm:opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              ref={nextRef}
              aria-label="Next Slide"
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-slate-900/60 hover:bg-[#1CA24B] text-white border border-white/20 hover:border-[#1CA24B] backdrop-blur-md flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer opacity-80 sm:opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}
      </Swiper>
    </div>
  )
}
