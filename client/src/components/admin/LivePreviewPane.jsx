import { useState, useRef, useEffect } from 'react'
import {
  Monitor,
  Smartphone,
  Maximize2,
  Minimize2,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react'
import RealHomePreview from './RealHomePreview'

export default function LivePreviewPane({
  data = {},
  activeSection = 'hero',
  onSectionChange,
}) {
  const [device, setDevice] = useState('desktop') // 'desktop' | 'mobile'
  const [isExpanded, setIsExpanded] = useState(false)
  const [zoomScale, setZoomScale] = useState(null) // null = auto fit

  const containerRef = useRef(null)
  const [containerWidth, setContainerWidth] = useState(800)

  // Measure container width for authentic desktop 1200px scale factor
  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width)
        }
      }
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const DESKTOP_WIDTH = 1280
  const DESKTOP_HEIGHT = 800

  // Calculate clean desktop monitor landscape scale
  const availableWidth = Math.max(340, containerWidth - 32)
  const autoScale = Math.min(1.0, Math.max(0.35, availableWidth / DESKTOP_WIDTH))
  const currentScale = zoomScale !== null ? zoomScale : autoScale

  const displayWidth = Math.round(DESKTOP_WIDTH * currentScale)
  const displayHeight = Math.round(DESKTOP_HEIGHT * currentScale)

  // Quick scroll to section
  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(`preview-${sectionId}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    if (onSectionChange) {
      const tabMap = {
        hero: 'sliders',
        stories: 'stories',
        stats: 'stats',
        pillars: 'pillars',
      }
      if (tabMap[sectionId]) onSectionChange(tabMap[sectionId])
    }
  }

  const handleOpenLiveTab = () => {
    window.open('/', '_blank')
  }

  return (
    <div
      ref={containerRef}
      className={`bg-zinc-950 border border-zinc-800 rounded-3xl flex flex-col overflow-hidden transition-all duration-300 shadow-2xl select-none ${
        isExpanded
          ? 'fixed inset-4 z-50 bg-zinc-950/98 shadow-2xl'
          : 'w-full'
      }`}
    >
      {/* =========================================================
       * 1. TOP DOCK TOOLBAR
       * ========================================================= */}
      <div className="bg-zinc-900/95 px-4 py-3 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          {/* Live Sync Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>LIVE DESKTOP PREVIEW</span>
          </div>

          {/* Section Navigator Pills */}
          <div className="hidden sm:flex items-center gap-1 bg-zinc-950 p-0.5 rounded-lg border border-zinc-800 text-[11px]">
            {[
              { id: 'hero', label: 'Slider' },
              { id: 'stories', label: 'Stories' },
              { id: 'stats', label: 'Stats' },
              { id: 'pillars', label: 'Pillars' },
            ].map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleScrollToSection(sec.id)}
                className="px-2 py-0.5 rounded font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>

        {/* Device Switcher & Controls */}
        <div className="flex items-center gap-2">
          {/* Device Toggle */}
          <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800">
            <button
              type="button"
              onClick={() => {
                setDevice('desktop')
                setZoomScale(null)
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                device === 'desktop'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop Rectangle</span>
            </button>

            <button
              type="button"
              onClick={() => setDevice('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                device === 'mobile'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>

          {/* Zoom controls for Desktop */}
          {device === 'desktop' && (
            <div className="hidden xl:flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-zinc-400 text-xs">
              <button
                onClick={() => setZoomScale((prev) => Math.max(0.3, (prev || autoScale) - 0.1))}
                className="p-1 hover:text-white cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono px-1">
                {Math.round(currentScale * 100)}%
              </span>
              <button
                onClick={() => setZoomScale((prev) => Math.min(1.2, (prev || autoScale) + 0.1))}
                className="p-1 hover:text-white cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomScale(null)}
                className="p-1 hover:text-white cursor-pointer text-[10px]"
                title="Fit to Window"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* New Tab View */}
          <button
            onClick={handleOpenLiveTab}
            className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer transition-colors"
            title="Open Live Website in New Tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Expand / Minimize */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer transition-colors"
            title={isExpanded ? 'Minimize View' : 'Expand Fullscreen'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* =========================================================
       * 2. BROWSER CHROME URL BAR & RESOLUTION BADGE
       * ========================================================= */}
      <div className="bg-zinc-950 px-4 py-2 border-b border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 font-mono shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
          <div className="ml-3 px-3 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1CA24B]"></span>
            <span>https://brightfuture.edu.np/</span>
          </div>
        </div>
        <div className="text-[10px] text-zinc-400 font-sans uppercase font-bold tracking-wider flex items-center gap-2">
          <span>{device === 'desktop' ? 'Widescreen Desktop Rectangle (1280 × 800)' : 'iPhone 15 Mobile Frame (390 × 720)'}</span>
          {device === 'desktop' && (
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-zinc-400">
              Scale: {Math.round(currentScale * 100)}%
            </span>
          )}
        </div>
      </div>

      {/* =========================================================
       * 3. RECTANGULAR CANVAS FOR DESKTOP MONITOR & MOBILE FRAME
       * ========================================================= */}
      <div
        className="w-full overflow-y-auto overflow-x-hidden bg-zinc-925 p-3 sm:p-5 flex justify-center items-center custom-scrollbar"
        style={{
          minHeight: isExpanded
            ? 'calc(100vh - 120px)'
            : device === 'desktop'
            ? `${displayHeight + 36}px`
            : '640px',
          maxHeight: isExpanded ? 'calc(100vh - 120px)' : device === 'desktop' ? '820px' : '640px',
        }}
      >
        {device === 'mobile' ? (
          /* Mobile Phone Mockup Frame */
          <div className="w-[390px] max-w-full my-auto bg-zinc-950 text-zinc-900 rounded-[48px] border-[10px] border-zinc-800 shadow-2xl overflow-hidden flex flex-col shrink-0 relative">
            <div className="bg-zinc-950 h-8 w-full flex items-center justify-between px-6 shrink-0 relative z-30 select-none">
              <span className="text-[11px] font-bold text-white font-mono">9:41</span>
              <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end pr-2">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 ring-1 ring-zinc-800"></span>
              </div>
              <div className="flex items-center gap-1 text-white text-[10px]">
                <span>5G</span>
                <span className="w-4 h-2 rounded-xs border border-white inline-block relative after:w-2.5 after:h-full after:bg-white after:block"></span>
              </div>
            </div>

            <div className="grow overflow-y-auto max-h-[520px] bg-white custom-scrollbar">
              <RealHomePreview data={data} focusSection={activeSection} />
            </div>

            <div className="h-5 bg-zinc-950 w-full flex items-center justify-center shrink-0">
              <div className="w-32 h-1 bg-zinc-600 rounded-full"></div>
            </div>
          </div>
        ) : (
          /* Desktop Landscape Rectangle Monitor Frame (1280 × 800) */
          <div className="w-full flex justify-center items-center py-2 shrink-0">
            <div
              style={{
                width: `${displayWidth}px`,
                height: `${displayHeight}px`,
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <div
                className="bg-white rounded-2xl border-4 border-zinc-800 shadow-2xl overflow-hidden flex flex-col"
                style={{
                  width: `${DESKTOP_WIDTH}px`,
                  height: `${DESKTOP_HEIGHT}px`,
                  transform: `scale(${currentScale})`,
                  transformOrigin: 'top left',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              >
                {/* Desktop Window Chrome (Mac-style Header) */}
                <div className="bg-zinc-900 px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between shrink-0 select-none">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ef4444] border border-[#dc2626]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#f59e0b] border border-[#d97706]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#10b981] border border-[#059669]"></span>
                  </div>

                  {/* Active Browser Tab */}
                  <div className="flex items-center gap-2 bg-zinc-800 px-3.5 py-1 rounded-t-lg border-t border-x border-zinc-700/60 text-xs font-semibold text-zinc-200">
                    <img src="/bfc.png" alt="BFC" className="w-3.5 h-3.5 object-contain rounded-xs" />
                    <span>Bright Future Secondary School & College</span>
                    <span className="text-zinc-500 hover:text-white text-xs ml-1 cursor-pointer">×</span>
                  </div>

                  {/* Desktop Resolution Indicator */}
                  <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                    <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
                      1280 × 800 Desktop
                    </span>
                  </div>
                </div>

                {/* Browser URL Navigation Bar */}
                <div className="bg-zinc-950 px-4 py-2 border-b border-zinc-800 flex items-center justify-between gap-4 shrink-0">
                  <div className="flex items-center gap-2.5 text-zinc-400 text-xs">
                    <span className="text-zinc-500 cursor-pointer hover:text-white">&larr;</span>
                    <span className="text-zinc-500 cursor-pointer hover:text-white">&rarr;</span>
                    <span className="text-zinc-500 cursor-pointer hover:text-white">&#8635;</span>
                  </div>

                  <div className="grow max-w-md mx-auto flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1 text-xs text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span className="font-mono text-[11px]">https://brightfuture.edu.np/</span>
                  </div>

                  <div className="text-[11px] font-mono text-zinc-500">
                    Live Sync
                  </div>
                </div>

                {/* The Desktop Website Canvas with Smooth Scrolling */}
                <div
                  className="grow overflow-y-auto overflow-x-hidden bg-white custom-scrollbar"
                  style={{
                    height: `${DESKTOP_HEIGHT - 78}px`,
                  }}
                >
                  <RealHomePreview data={data} focusSection={activeSection} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
