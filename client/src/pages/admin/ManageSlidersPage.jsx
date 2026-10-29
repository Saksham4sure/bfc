import { useState } from 'react'
import { Plus, Trash2, Eye, EyeOff, Layers, Palette, Film, Layout, AlignLeft, Sparkles, Monitor, Smartphone } from 'lucide-react'
import HeroSlider from '../../components/features/home/HeroSlider'

const SLIDER_THEMES = [
  {
    id: 'awwwards-cinematic',
    name: 'Awwwards Cinematic',
    icon: Film,
    desc: 'Smooth Ken Burns parallax zoom, live timer progress bar, and editorial slide counter.',
  },
  {
    id: 'split-editorial',
    name: 'Split Editorial',
    icon: Layout,
    desc: 'High-contrast split magazine layout with framed photography on the right.',
  },
  {
    id: 'minimal-luxury',
    name: 'Minimal Luxury',
    icon: AlignLeft,
    desc: 'Understated full-screen typography, centered layout, and subtle line pagination.',
  },
  {
    id: 'creative-card',
    name: 'Frosted Glass Card',
    icon: Sparkles,
    desc: 'Modern glassmorphic card over background with floating chips and minimal controls.',
  },
]

export default function ManageSlidersPage() {
  const [selectedTheme, setSelectedTheme] = useState('awwwards-cinematic')
  const [device, setDevice] = useState('desktop') // 'desktop' | 'mobile'

  const [slides, setSlides] = useState([
    {
      id: '1',
      title: 'Empowering Young Minds For A Brighter Tomorrow',
      badge: 'Admissions Open 2026/2027',
      subtitle: 'Nurturing intellectual curiosity and creative potential through comprehensive schooling.',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
      buttonText: 'Enroll Online Today',
      buttonLink: '/admissions',
      order: 0,
      isActive: true,
    },
    {
      id: '2',
      title: '+2 Science, Management & Humanities',
      badge: 'Premier Academic Pathways',
      subtitle: 'State-of-the-art laboratory facilities and experienced faculty mentors.',
      imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
      buttonText: 'Explore Academics',
      buttonLink: '/academics',
      order: 1,
      isActive: true,
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    badge: 'Campus Update',
    imageUrl: '',
    buttonText: 'Learn More',
    buttonLink: '/admissions',
    order: 0,
  })

  const handleAddSlide = (e) => {
    e.preventDefault()
    setSlides([
      ...slides,
      {
        id: String(Date.now()),
        ...form,
        imageUrl:
          form.imageUrl ||
          'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
        isActive: true,
      },
    ])
    setShowModal(false)
    setForm({
      title: '',
      subtitle: '',
      badge: 'Campus Update',
      imageUrl: '',
      buttonText: 'Learn More',
      buttonLink: '/admissions',
      order: 0,
    })
  }

  const handleDelete = (id) => {
    setSlides(slides.filter((s) => s.id !== id))
  }

  const toggleActive = (id) => {
    setSlides(
      slides.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-zinc-700" />
            Homepage Sliders Management
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Dynamic theme selector and live preview for hero sliders.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold cursor-pointer transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add New Slide
        </button>
      </div>

      {/* Dynamic Theme Selector */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5" />
          <span>Select Slider Animation &amp; Theme</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SLIDER_THEMES.map((theme) => {
            const Icon = theme.icon
            const isSelected = selectedTheme === theme.id
            return (
              <div
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                    : 'border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 text-zinc-800'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-zinc-600'}`} />
                  <span className="text-xs font-bold">{theme.name}</span>
                </div>
                <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                  {theme.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Split View: Slides on Left, Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Slides List */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-sm font-bold text-zinc-900">Configured Slides ({slides.length})</h3>
          <div className="space-y-4">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className={`bg-white rounded-2xl border ${
                  slide.isActive ? 'border-zinc-200' : 'border-zinc-200 bg-zinc-50 opacity-60'
                } p-4 space-y-3`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {slide.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                        {slide.badge}
                      </span>
                    )}
                    <h4 className="text-xs font-bold text-zinc-900 truncate max-w-xs">{slide.title}</h4>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleActive(slide.id)}
                      className="p-1 text-zinc-400 hover:text-zinc-700 cursor-pointer"
                      title={slide.isActive ? 'Hide' : 'Show'}
                    >
                      {slide.isActive ? <Eye className="w-3.5 h-3.5 text-zinc-800" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleDelete(slide.id)}
                      className="p-1 text-zinc-400 hover:text-red-600 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {slide.subtitle && (
                  <p className="text-xs text-zinc-500 line-clamp-2">{slide.subtitle}</p>
                )}

                <div className="text-[11px] text-zinc-400 truncate">
                  CTA: {slide.buttonText} &bull; {slide.buttonLink}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Preview Window */}
        <div className="lg:col-span-6 sticky top-6">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-xl">
            {/* Preview Toolbar */}
            <div className="bg-zinc-950 px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between text-xs">
              <span className="font-mono text-zinc-400 text-[11px]">LIVE SLIDER PREVIEW</span>
              <div className="flex items-center bg-zinc-900 p-0.5 rounded border border-zinc-800">
                <button
                  onClick={() => setDevice('desktop')}
                  className={`px-2 py-0.5 rounded text-[11px] ${
                    device === 'desktop' ? 'bg-zinc-800 text-white' : 'text-zinc-400'
                  }`}
                >
                  <Monitor className="w-3 h-3 inline mr-1" /> Desktop
                </button>
                <button
                  onClick={() => setDevice('mobile')}
                  className={`px-2 py-0.5 rounded text-[11px] ${
                    device === 'mobile' ? 'bg-zinc-800 text-white' : 'text-zinc-400'
                  }`}
                >
                  <Smartphone className="w-3 h-3 inline mr-1" /> Mobile
                </button>
              </div>
            </div>

            {/* Container */}
            <div className="p-3 sm:p-5 flex justify-center bg-zinc-950">
              {device === 'mobile' ? (
                <div className="w-[360px] rounded-[32px] border-[6px] border-zinc-800 overflow-hidden bg-zinc-950">
                  <HeroSlider
                    customSlides={slides}
                    themeOverride={selectedTheme}
                    inPreview={true}
                  />
                </div>
              ) : (
                <div className="w-full rounded-xl overflow-hidden border border-zinc-800">
                  <HeroSlider
                    customSlides={slides}
                    themeOverride={selectedTheme}
                    inPreview={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-zinc-200">
            <h3 className="text-base font-bold text-zinc-900 mb-1">Create Hero Slide</h3>
            <p className="text-xs text-zinc-500 mb-4">Add a new slide to the banner slider.</p>

            <form onSubmit={handleAddSlide} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-zinc-700 mb-1">
                  Headline *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Slide headline"
                  className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-zinc-700 mb-1">
                  Badge Tag
                </label>
                <input
                  type="text"
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-zinc-700 mb-1">
                  Subtitle
                </label>
                <textarea
                  rows={2}
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-zinc-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 rounded-lg text-zinc-600 hover:bg-zinc-100 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold cursor-pointer"
                >
                  Save Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
