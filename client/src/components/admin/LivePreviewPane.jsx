import { useState } from 'react'
import {
  Monitor,
  Smartphone,
  Maximize2,
  Minimize2,
  RefreshCw,
  ExternalLink,
  Layers,
  Sparkles,
  BarChart3,
  BookOpen,
  Layout,
} from 'lucide-react'
import HeroSlider from '../features/home/HeroSlider'
import WelcomeStoriesSection from '../features/home/WelcomeStoriesSection'

export default function LivePreviewPane({
  data = {},
  activeSection = 'hero',
  onSectionChange,
}) {
  const [device, setDevice] = useState('desktop') // 'desktop' | 'mobile'
  const [isExpanded, setIsExpanded] = useState(false)
  const [previewSection, setPreviewSection] = useState(activeSection || 'hero')

  const currentSection = previewSection || activeSection || 'hero'

  const heroSlides = data.heroSlides || []
  const heroSliderTheme = data.heroSliderTheme || 'awwwards-cinematic'
  const welcomeStories = data.welcomeStories || []
  const stats = data.stats || []
  const aboutSection = data.aboutSection || {}
  const pillars = aboutSection.pillars || []
  const ctaBanner = data.ctaBanner || {}

  return (
    <div
      className={`bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 shadow-xl ${
        isExpanded
          ? 'fixed inset-6 z-50 bg-zinc-950/95 backdrop-blur-md shadow-2xl'
          : 'w-full sticky top-6'
      }`}
      style={{ maxHeight: isExpanded ? 'calc(100vh - 48px)' : 'calc(100vh - 96px)' }}
    >
      {/* Top Device & Control Bar */}
      <div className="bg-zinc-950 px-4 py-3 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          {/* Live Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>LIVE PREVIEW</span>
          </div>

          {/* Section Filter Pills */}
          <div className="hidden sm:flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800 text-[11px]">
            <button
              onClick={() => {
                setPreviewSection('hero')
                if (onSectionChange) onSectionChange('sliders')
              }}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                currentSection === 'hero' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Slider
            </button>
            <button
              onClick={() => {
                setPreviewSection('stories')
                if (onSectionChange) onSectionChange('stories')
              }}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                currentSection === 'stories' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Stories
            </button>
            <button
              onClick={() => {
                setPreviewSection('stats')
                if (onSectionChange) onSectionChange('stats')
              }}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                currentSection === 'stats' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Stats
            </button>
            <button
              onClick={() => setPreviewSection('all')}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                currentSection === 'all' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              All
            </button>
          </div>
        </div>

        {/* Device Switcher & Expand Controls */}
        <div className="flex items-center gap-2">
          {/* Desktop / Mobile Switcher */}
          <div className="flex items-center bg-zinc-900 p-1 rounded-lg border border-zinc-800">
            <button
              type="button"
              onClick={() => setDevice('desktop')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                device === 'desktop'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Desktop</span>
            </button>

            <button
              type="button"
              onClick={() => setDevice('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                device === 'mobile'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mobile</span>
            </button>
          </div>

          {/* Fullscreen Expand / Contract */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 cursor-pointer transition-colors"
            title={isExpanded ? 'Exit Fullscreen' : 'Expand Preview'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Simulated Browser URL bar for Desktop or Device Header */}
      <div className="bg-zinc-925 px-4 py-1.5 border-b border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-zinc-700"></span>
          <span className="w-2 h-2 rounded-full bg-zinc-700"></span>
          <span className="w-2 h-2 rounded-full bg-zinc-700"></span>
          <span className="ml-2 text-zinc-400 truncate">
            https://brightfuture.edu.np{currentSection === 'hero' ? ' #hero' : ''}
          </span>
        </div>
        <span className="text-zinc-500 text-[10px] uppercase font-sans">
          {device === 'desktop' ? '1280px View' : '375px Mobile Frame'}
        </span>
      </div>

      {/* Viewport Frame */}
      <div className="grow overflow-y-auto bg-zinc-950 p-3 sm:p-5 flex justify-center custom-scrollbar">
        {device === 'mobile' ? (
          /* Mobile Phone Mockup Frame (375px width, rounded bezel) */
          <div className="w-[375px] max-w-full my-auto bg-white text-zinc-900 rounded-[38px] border-[8px] border-zinc-800 shadow-2xl overflow-hidden flex flex-col shrink-0">
            {/* Phone Top Notch / Dynamic Island */}
            <div className="bg-zinc-900 h-6 w-full flex items-center justify-center relative shrink-0">
              <div className="w-24 h-3.5 bg-zinc-950 rounded-b-xl flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-zinc-900"></span>
              </div>
            </div>

            {/* Mobile Scrollable Viewport */}
            <div className="grow overflow-y-auto max-h-[580px] bg-white custom-scrollbar">
              {renderPreviewContent(currentSection, {
                heroSlides,
                heroSliderTheme,
                welcomeStories,
                stats,
                pillars,
                aboutSection,
                ctaBanner,
                inPreview: true,
              })}
            </div>

            {/* Phone Bottom Home Bar */}
            <div className="h-4 bg-zinc-900 w-full flex items-center justify-center shrink-0">
              <div className="w-28 h-1 bg-zinc-700 rounded-full"></div>
            </div>
          </div>
        ) : (
          /* Desktop Browser Viewport */
          <div className="w-full bg-white text-zinc-900 rounded-xl overflow-hidden shadow-md border border-zinc-800">
            <div className="overflow-y-auto max-h-[620px] custom-scrollbar">
              {renderPreviewContent(currentSection, {
                heroSlides,
                heroSliderTheme,
                welcomeStories,
                stats,
                pillars,
                aboutSection,
                ctaBanner,
                inPreview: true,
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function renderPreviewContent(section, {
  heroSlides,
  heroSliderTheme,
  welcomeStories,
  stats,
  pillars,
  aboutSection,
  ctaBanner,
  inPreview,
}) {
  if (section === 'hero') {
    return (
      <div>
        <HeroSlider
          customSlides={heroSlides}
          themeOverride={heroSliderTheme}
          inPreview={inPreview}
        />
      </div>
    )
  }

  if (section === 'stories') {
    return (
      <div className="bg-white">
        <WelcomeStoriesSection stories={welcomeStories} />
      </div>
    )
  }

  if (section === 'stats') {
    return (
      <div className="bg-white p-6 border-b border-zinc-200">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
              <div className="text-xl font-black text-zinc-900">{s.number}</div>
              <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (section === 'pillars') {
    return (
      <div className="bg-zinc-50 p-6">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
            {aboutSection.badge || 'Core Pillars'}
          </span>
          <h3 className="text-lg font-bold text-zinc-900 mt-1">
            {aboutSection.title || 'Academic Foundations'}
          </h3>
          <p className="text-xs text-zinc-500 mt-1">{aboutSection.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pillars.map((pil, idx) => (
            <div key={idx} className="p-4 bg-white rounded-xl border border-zinc-200">
              <h4 className="text-xs font-bold text-zinc-900">{pil.title}</h4>
              <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">{pil.desc}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // 'all' section: Full page preview
  return (
    <div className="space-y-0">
      <HeroSlider
        customSlides={heroSlides}
        themeOverride={heroSliderTheme}
        inPreview={inPreview}
      />

      <WelcomeStoriesSection stories={welcomeStories} />

      {stats.length > 0 && (
        <div className="bg-white py-8 border-b border-zinc-200">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {stats.map((s, idx) => (
              <div key={idx}>
                <div className="text-2xl font-black text-zinc-900">{s.number}</div>
                <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {ctaBanner.title && (
        <div className="bg-zinc-950 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold">{ctaBanner.title}</h4>
            <p className="text-xs text-zinc-400 mt-0.5">{ctaBanner.description}</p>
          </div>
          <span className="px-4 py-2 rounded-lg bg-white text-zinc-950 text-xs font-bold shrink-0">
            {ctaBanner.buttonText || 'Apply Now'}
          </span>
        </div>
      )}
    </div>
  )
}
