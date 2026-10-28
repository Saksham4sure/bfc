import { useState, useEffect } from 'react'
import { Plus, Trash2, Eye, EyeOff, Layers, Image as ImageIcon, CheckCircle, ExternalLink } from 'lucide-react'
import api from '../../services/api'

export default function ManageSlidersPage() {
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
        imageUrl: form.imageUrl || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#1CA24B]" />
            Manage Homepage Swiper Sliders
          </h2>
          <p className="text-sm text-slate-500">
            Customize the hero banner slides, titles, call-to-actions, and background images.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-sm font-bold shadow-md shadow-[#1CA24B]/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Slide
        </button>
      </div>

      {/* Slides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`bg-white rounded-2xl border ${
              slide.isActive ? 'border-slate-200 shadow-xs' : 'border-slate-200 opacity-60'
            } overflow-hidden flex flex-col justify-between`}
          >
            <div>
              {/* Image Preview */}
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  {slide.badge && (
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#1CA24B] text-white self-start mb-1">
                      {slide.badge}
                    </span>
                  )}
                  <h3 className="text-white font-bold text-base leading-snug line-clamp-1">
                    {slide.title}
                  </h3>
                </div>
              </div>

              {/* Details */}
              <div className="p-5">
                {slide.subtitle && (
                  <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                    {slide.subtitle}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="font-semibold text-slate-800">CTA: {slide.buttonText}</span>
                  <span>&bull;</span>
                  <span className="text-slate-600 truncate">{slide.buttonLink}</span>
                </div>
              </div>
            </div>

            {/* Actions Toolbar */}
            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={() => toggleActive(slide.id)}
                className={`inline-flex items-center gap-1.5 font-semibold px-2.5 py-1 rounded-md cursor-pointer transition-colors ${
                  slide.isActive
                    ? 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200'
                    : 'text-slate-600 bg-slate-200 hover:bg-slate-300'
                }`}
              >
                {slide.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                {slide.isActive ? 'Active on Home' : 'Hidden'}
              </button>

              <button
                onClick={() => handleDelete(slide.id)}
                className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                title="Delete slide"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Slide Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Create Hero Slide</h3>
            <p className="text-xs text-slate-500 mb-6">
              Add a dynamic slide to the homepage Swiper slider banner.
            </p>

            <form onSubmit={handleAddSlide} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Slide Headline *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. World-Class Education in Kathmandu"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-[#1CA24B]/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Badge Tag
                </label>
                <input
                  type="text"
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  placeholder="e.g. Admissions Open 2026"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-[#1CA24B]/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Subtitle Description
                </label>
                <textarea
                  rows={3}
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="Concise overview text for the banner slide..."
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-[#1CA24B]/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Background Image URL
                </label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-[#1CA24B]/30 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={form.buttonText}
                    onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Button Link
                  </label>
                  <input
                    type="text"
                    value={form.buttonLink}
                    onChange={(e) => setForm({ ...form, buttonLink: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-sm font-bold shadow-md shadow-[#1CA24B]/20 cursor-pointer"
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
