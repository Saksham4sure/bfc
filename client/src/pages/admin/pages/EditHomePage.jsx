import { useState } from 'react'
import {
  Layers,
  BarChart3,
  BookOpen,
  Bell,
  Sparkles,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Edit2,
  Image as ImageIcon,
  Layout,
  AlignLeft,
  AlignRight,
  Moon,
  Quote,
  Maximize2,
} from 'lucide-react'
import { useCMS } from '../../../context/CMSContext'

export default function EditHomePage() {
  const { cms, updatePage, resetPage } = useCMS()
  const homeData = cms.home || {}

  // Local editable state
  const [formData, setFormData] = useState(homeData)
  const [activeTab, setActiveTab] = useState('sliders')
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showAddSlide, setShowAddSlide] = useState(false)
  const [showAddStory, setShowAddStory] = useState(false)

  // New slide form
  const [newSlide, setNewSlide] = useState({
    badge: 'Campus Highlight',
    title: '',
    subtitle: '',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    buttonText: 'Learn More',
    buttonLink: '/admissions',
    isActive: true,
  })

  // New Story / Welcome block form
  const [newStory, setNewStory] = useState({
    indicator: 'Welcome to Bright Future',
    title: '',
    paragraphs: '',
    imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
    theme: 'text-left-image-right',
    buttonText: 'Explore Campus Life',
    buttonLink: '/about',
  })

  const handleSave = () => {
    updatePage('home', formData)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleReset = () => {
    if (window.confirm('Reset Home Page content to default template?')) {
      resetPage('home')
      setTimeout(() => {
        setFormData(cms.home)
      }, 100)
    }
  }

  // --- Sliders Actions ---
  const toggleSlideActive = (id) => {
    const updated = formData.heroSlides.map((s) =>
      s.id === id ? { ...s, isActive: !s.isActive } : s
    )
    setFormData({ ...formData, heroSlides: updated })
  }

  const deleteSlide = (id) => {
    if (formData.heroSlides.length <= 1) {
      alert('You must have at least one hero slide.')
      return
    }
    const updated = formData.heroSlides.filter((s) => s.id !== id)
    setFormData({ ...formData, heroSlides: updated })
  }

  const moveSlide = (index, direction) => {
    const newSlides = [...formData.heroSlides]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= newSlides.length) return
    const temp = newSlides[index]
    newSlides[index] = newSlides[targetIndex]
    newSlides[targetIndex] = temp
    setFormData({ ...formData, heroSlides: newSlides })
  }

  const handleAddSlide = (e) => {
    e.preventDefault()
    if (!newSlide.title) return
    const slideToAdd = {
      id: `s-${Date.now()}`,
      ...newSlide,
    }
    setFormData({
      ...formData,
      heroSlides: [...(formData.heroSlides || []), slideToAdd],
    })
    setShowAddSlide(false)
    setNewSlide({
      badge: 'Campus Highlight',
      title: '',
      subtitle: '',
      imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
      buttonText: 'Learn More',
      buttonLink: '/admissions',
      isActive: true,
    })
  }

  // --- Welcome Stories Actions ---
  const handleStoryChange = (index, field, value) => {
    const updated = [...(formData.welcomeStories || [])]
    if (field === 'paragraphs' && typeof value === 'string') {
      updated[index] = { ...updated[index], paragraphs: value.split('\n\n').filter(Boolean) }
    } else {
      updated[index] = { ...updated[index], [field]: value }
    }
    setFormData({ ...formData, welcomeStories: updated })
  }

  const deleteStory = (id) => {
    const updated = (formData.welcomeStories || []).filter((s) => s.id !== id)
    setFormData({ ...formData, welcomeStories: updated })
  }

  const moveStory = (index, direction) => {
    const newStories = [...(formData.welcomeStories || [])]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= newStories.length) return
    const temp = newStories[index]
    newStories[index] = newStories[targetIndex]
    newStories[targetIndex] = temp
    setFormData({ ...formData, welcomeStories: newStories })
  }

  const handleAddStory = (e) => {
    e.preventDefault()
    if (!newStory.title) return
    const paragraphsArray = typeof newStory.paragraphs === 'string'
      ? newStory.paragraphs.split('\n\n').filter(Boolean)
      : newStory.paragraphs

    const storyToAdd = {
      id: `story-${Date.now()}`,
      ...newStory,
      paragraphs: paragraphsArray.length > 0 ? paragraphsArray : [newStory.paragraphs],
    }

    setFormData({
      ...formData,
      welcomeStories: [...(formData.welcomeStories || []), storyToAdd],
    })
    setShowAddStory(false)
    setNewStory({
      indicator: 'Welcome to Bright Future',
      title: '',
      paragraphs: '',
      imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
      theme: 'text-left-image-right',
      buttonText: 'Learn More',
      buttonLink: '/about',
    })
  }

  // --- Stats Actions ---
  const handleStatChange = (index, field, value) => {
    const updated = [...formData.stats]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, stats: updated })
  }

  const addStat = () => {
    const updated = [
      ...(formData.stats || []),
      { id: `stat-${Date.now()}`, number: '100+', label: 'New Metric' },
    ]
    setFormData({ ...formData, stats: updated })
  }

  const deleteStat = (index) => {
    const updated = formData.stats.filter((_, i) => i !== index)
    setFormData({ ...formData, stats: updated })
  }

  // --- Pillars Actions ---
  const handlePillarChange = (index, field, value) => {
    const updated = [...formData.aboutSection.pillars]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({
      ...formData,
      aboutSection: { ...formData.aboutSection, pillars: updated },
    })
  }

  const addPillar = () => {
    const updated = [
      ...(formData.aboutSection?.pillars || []),
      {
        id: `pil-${Date.now()}`,
        icon: 'BookOpen',
        title: 'New Academic Pillar',
        desc: 'Comprehensive guidance and structured learning.',
      },
    ]
    setFormData({
      ...formData,
      aboutSection: { ...formData.aboutSection, pillars: updated },
    })
  }

  const deletePillar = (index) => {
    const updated = formData.aboutSection.pillars.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      aboutSection: { ...formData.aboutSection, pillars: updated },
    })
  }

  const PRESET_IMAGES = [
    { label: 'Campus Courtyard', url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Graduation & Students', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Classroom & Library', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Science Laboratory', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80' },
  ]

  const THEME_OPTIONS = [
    { id: 'text-left-image-right', name: 'Text Left, Image Right', icon: AlignLeft, desc: 'Classic balanced 2-column layout' },
    { id: 'image-left-text-right', name: 'Image Left, Text Right', icon: AlignRight, desc: 'Editorial image-first showcase' },
    { id: 'dark-hero-card', name: 'Emerald Dark Forest Card', icon: Moon, desc: 'High-contrast dark slate card with emerald accents' },
    { id: 'quote-executive', name: "Executive / Principal's Message", icon: Quote, desc: 'Warm ivory/emerald tint with rounded portrait' },
    { id: 'centered-spotlight', name: 'Panoramic Magazine Spotlight', icon: Maximize2, desc: 'Wide banner with centered headline story' },
  ]

  return (
    <div className="space-y-6">
      {/* Page Title & Top Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1CA24B]">
            <span>Page CMS</span>
            <span>&bull;</span>
            <span>Live Editor</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
            <span>Home Page Content</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#1CA24B] font-bold">
              Root Page (/)
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Edit everything that appears on the Home page: Hero banner slides, Welcome &amp; Feature stories, statistics counters, core pillars, notices feed, and CTA banner.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Page</span>
          </a>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
            title="Reset to default template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs font-bold shadow-md shadow-[#1CA24B]/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Changes</span>
          </button>
        </div>
      </div>

      {/* Save Success Alert */}
      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3 shadow-xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="font-semibold">
            Home Page updated successfully! Changes are live on the website.
          </div>
        </div>
      )}

      {/* Section Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'sliders', label: 'Hero Sliders', icon: Layers, count: formData.heroSlides?.length },
          { id: 'stories', label: 'Welcome & Feature Stories', icon: Sparkles, count: formData.welcomeStories?.length },
          { id: 'stats', label: 'Key Statistics Bar', icon: BarChart3, count: formData.stats?.length },
          { id: 'pillars', label: 'About & Core Pillars', icon: BookOpen, count: formData.aboutSection?.pillars?.length },
          { id: 'notices', label: 'Notices Feed Settings', icon: Bell },
          { id: 'cta', label: 'Call-To-Action Banner', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                    isActive ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* TAB 1: Hero Sliders */}
      {activeTab === 'sliders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Homepage Hero Swiper Sliders</h3>
              <p className="text-xs text-slate-500">
                Manage hero slides, titles, call-to-actions, and background banners.
              </p>
            </div>
            <button
              onClick={() => setShowAddSlide(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Slide
            </button>
          </div>

          {/* Add Slide Modal Form */}
          {showAddSlide && (
            <div className="bg-white p-6 rounded-2xl border border-[#1CA24B]/30 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">Add New Hero Banner Slide</h4>
                <button
                  onClick={() => setShowAddSlide(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleAddSlide} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={newSlide.badge}
                      onChange={(e) => setNewSlide({ ...newSlide, badge: e.target.value })}
                      placeholder="e.g. Admissions Open 2026/2027"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Headline Title *</label>
                    <input
                      type="text"
                      required
                      value={newSlide.title}
                      onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                      placeholder="e.g. Empowering Young Minds For A Brighter Tomorrow"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subtitle Text</label>
                  <textarea
                    rows={2}
                    value={newSlide.subtitle}
                    onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                    placeholder="Short descriptive paragraph for this slide banner..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Button Label</label>
                    <input
                      type="text"
                      value={newSlide.buttonText}
                      onChange={(e) => setNewSlide({ ...newSlide, buttonText: e.target.value })}
                      placeholder="e.g. Enroll Online Today"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Button Link</label>
                    <input
                      type="text"
                      value={newSlide.buttonLink}
                      onChange={(e) => setNewSlide({ ...newSlide, buttonLink: e.target.value })}
                      placeholder="e.g. /admissions"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Background Image URL</label>
                  <input
                    type="url"
                    value={newSlide.imageUrl}
                    onChange={(e) => setNewSlide({ ...newSlide, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
                  />
                  <div className="mt-2 flex flex-wrap gap-2 items-center text-xs text-slate-500">
                    <span>Quick presets:</span>
                    {PRESET_IMAGES.map((preset, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setNewSlide({ ...newSlide, imageUrl: preset.url })}
                        className="px-2 py-0.5 bg-slate-100 hover:bg-[#e8f7ee] hover:text-[#1CA24B] rounded text-[11px] font-medium transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddSlide(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                  >
                    Save Slide
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Slide List */}
          <div className="grid grid-cols-1 gap-4">
            {formData.heroSlides?.map((slide, index) => (
              <div
                key={slide.id || index}
                className={`bg-white rounded-2xl border p-5 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between transition-all ${
                  slide.isActive ? 'border-slate-200' : 'border-slate-200 bg-slate-50/70 opacity-60'
                }`}
              >
                {/* Thumbnail */}
                <div className="w-full md:w-44 h-24 rounded-xl overflow-hidden bg-slate-900 shrink-0 relative">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  {slide.badge && (
                    <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
                      {slide.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="grow min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Slide #{index + 1}
                    </span>
                    {!slide.isActive && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                        Hidden
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">{slide.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{slide.subtitle}</p>
                  <div className="text-[11px] text-[#1CA24B] font-semibold mt-1">
                    CTA: {slide.buttonText} &rarr; {slide.buttonLink}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => moveSlide(index, 'up')}
                    disabled={index === 0}
                    className="p-2 text-slate-400 hover:text-slate-800 disabled:opacity-20 cursor-pointer"
                    title="Move slide up"
                  >
                    <MoveUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveSlide(index, 'down')}
                    disabled={index === formData.heroSlides.length - 1}
                    className="p-2 text-slate-400 hover:text-slate-800 disabled:opacity-20 cursor-pointer"
                    title="Move slide down"
                  >
                    <MoveDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleSlideActive(slide.id)}
                    className="p-2 text-slate-400 hover:text-slate-800 cursor-pointer"
                    title={slide.isActive ? 'Hide slide' : 'Show slide'}
                  >
                    {slide.isActive ? <Eye className="w-4 h-4 text-[#1CA24B]" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                  </button>
                  <button
                    onClick={() => deleteSlide(slide.id)}
                    className="p-2 text-slate-400 hover:text-red-600 cursor-pointer"
                    title="Delete slide"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Welcome & Feature Stories (Blog / Spotlight) */}
      {activeTab === 'stories' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Welcome &amp; Feature Stories (Displayed Directly Below Slider)
              </h3>
              <p className="text-xs text-slate-500">
                Add multiple stories or welcome messages with custom indicator badges, rich paragraphs, images, and selectable themes.
              </p>
            </div>
            <button
              onClick={() => setShowAddStory(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs font-bold shadow-xs cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" /> Add New Story
            </button>
          </div>

          {/* Add Story Form */}
          {showAddStory && (
            <div className="bg-white p-6 rounded-3xl border-2 border-[#1CA24B]/30 shadow-xl space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1CA24B]" />
                  Create New Welcome / Blog Story
                </h4>
                <button
                  onClick={() => setShowAddStory(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleAddStory} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Small Indicator (Above Title) *
                    </label>
                    <input
                      type="text"
                      required
                      value={newStory.indicator}
                      onChange={(e) => setNewStory({ ...newStory, indicator: e.target.value })}
                      placeholder="e.g. Welcome to Bright Future, Principal's Message"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-[#1CA24B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Story Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newStory.title}
                      onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                      placeholder="e.g. A Tradition of Academic Rigor and Modern Innovation"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Story Paragraphs (Separate paragraphs with a blank line) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={newStory.paragraphs}
                    onChange={(e) => setNewStory({ ...newStory, paragraphs: e.target.value })}
                    placeholder="Type the message or article paragraphs here. Double line break creates new paragraph..."
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    required
                    value={newStory.imageUrl}
                    onChange={(e) => setNewStory({ ...newStory, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-mono"
                  />
                  <div className="mt-2 flex flex-wrap gap-2 items-center text-xs text-slate-500">
                    <span>Presets:</span>
                    {PRESET_IMAGES.map((preset, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setNewStory({ ...newStory, imageUrl: preset.url })}
                        className="px-2 py-0.5 bg-slate-100 hover:bg-[#e8f7ee] hover:text-[#1CA24B] rounded text-[11px] font-medium transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Select Section Theme &amp; Layout *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {THEME_OPTIONS.map((theme) => {
                      const Icon = theme.icon
                      const isSelected = newStory.theme === theme.id
                      return (
                        <div
                          key={theme.id}
                          onClick={() => setNewStory({ ...newStory, theme: theme.id })}
                          className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#1CA24B] bg-[#e8f7ee]/50 shadow-xs'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                              isSelected ? 'bg-[#1CA24B] text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold text-slate-900">{theme.name}</span>
                          </div>
                          <p className="text-[11px] text-slate-500">{theme.desc}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Button Text (Optional)
                    </label>
                    <input
                      type="text"
                      value={newStory.buttonText}
                      onChange={(e) => setNewStory({ ...newStory, buttonText: e.target.value })}
                      placeholder="e.g. Explore Campus Life"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Button Link Destination
                    </label>
                    <input
                      type="text"
                      value={newStory.buttonLink}
                      onChange={(e) => setNewStory({ ...newStory, buttonLink: e.target.value })}
                      placeholder="e.g. /about"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddStory(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs font-bold rounded-xl shadow-md shadow-[#1CA24B]/20 cursor-pointer"
                  >
                    Save Story
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Stories List */}
          <div className="space-y-4">
            {(formData.welcomeStories || []).map((story, index) => {
              const currentTheme = THEME_OPTIONS.find((t) => t.id === story.theme) || THEME_OPTIONS[0]
              const paragraphsText = Array.isArray(story.paragraphs)
                ? story.paragraphs.join('\n\n')
                : story.paragraphs || ''

              return (
                <div
                  key={story.id || index}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 relative"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-slate-900 text-white text-[10px] font-extrabold uppercase">
                        Story #{index + 1}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-[#e8f7ee] text-[#1CA24B] text-[11px] font-bold border border-[#1CA24B]/20">
                        Theme: {currentTheme.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => moveStory(index, 'up')}
                        disabled={index === 0}
                        className="p-1.5 text-slate-400 hover:text-slate-800 disabled:opacity-20 cursor-pointer"
                        title="Move story up"
                      >
                        <MoveUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveStory(index, 'down')}
                        disabled={index === formData.welcomeStories.length - 1}
                        className="p-1.5 text-slate-400 hover:text-slate-800 disabled:opacity-20 cursor-pointer"
                        title="Move story down"
                      >
                        <MoveDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteStory(story.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"
                        title="Delete story"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Inline Editor Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        Indicator Badge Tag
                      </label>
                      <input
                        type="text"
                        value={story.indicator || ''}
                        onChange={(e) => handleStoryChange(index, 'indicator', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-[#1CA24B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={story.title}
                        onChange={(e) => handleStoryChange(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Paragraphs Text
                    </label>
                    <textarea
                      rows={3}
                      value={paragraphsText}
                      onChange={(e) => handleStoryChange(index, 'paragraphs', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-600 leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={story.imageUrl}
                        onChange={(e) => handleStoryChange(index, 'imageUrl', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        Layout Theme
                      </label>
                      <select
                        value={story.theme || 'text-left-image-right'}
                        onChange={(e) => handleStoryChange(index, 'theme', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white font-semibold"
                      >
                        {THEME_OPTIONS.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Stats Counter */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Key Statistics Counter Bar</h3>
              <p className="text-xs text-slate-500">
                Shown below the welcome section to highlight milestones.
              </p>
            </div>
            <button
              onClick={addStat}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Counter
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {formData.stats?.map((stat, i) => (
              <div key={stat.id || i} className="bg-white p-5 rounded-2xl border border-slate-200 relative group">
                <button
                  onClick={() => deleteStat(i)}
                  className="absolute top-3 right-3 text-slate-300 hover:text-red-500 cursor-pointer"
                  title="Remove stat"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Counter #{i + 1}
                </label>
                <div className="space-y-2">
                  <div>
                    <span className="text-[11px] text-slate-500">Value / Number</span>
                    <input
                      type="text"
                      value={stat.number}
                      onChange={(e) => handleStatChange(i, 'number', e.target.value)}
                      placeholder="e.g. 20+"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-lg font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500">Label</span>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleStatChange(i, 'label', e.target.value)}
                      placeholder="e.g. Years of Excellence"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-600"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: About & Core Pillars */}
      {activeTab === 'pillars' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">About Section Header</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Section Badge</label>
                <input
                  type="text"
                  value={formData.aboutSection?.badge || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      aboutSection: { ...formData.aboutSection, badge: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Section Title</label>
                <input
                  type="text"
                  value={formData.aboutSection?.title || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      aboutSection: { ...formData.aboutSection, title: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Section Subtitle / Description</label>
              <textarea
                rows={2}
                value={formData.aboutSection?.description || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    aboutSection: { ...formData.aboutSection, description: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Core Academic Pillars</h3>
            <button
              onClick={addPillar}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Pillar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.aboutSection?.pillars?.map((pillar, i) => (
              <div key={pillar.id || i} className="bg-white p-5 rounded-2xl border border-slate-200 relative space-y-3">
                <button
                  onClick={() => deletePillar(i)}
                  className="absolute top-4 right-4 text-slate-300 hover:text-red-500 cursor-pointer"
                  title="Remove pillar"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    Pillar #{i + 1}
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Pillar Title</label>
                  <input
                    type="text"
                    value={pillar.title}
                    onChange={(e) => handlePillarChange(i, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={pillar.desc}
                    onChange={(e) => handlePillarChange(i, 'desc', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Notices Bulletin Section */}
      {activeTab === 'notices' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Homepage Notices Section Configuration</h3>
            <p className="text-xs text-slate-500">
              Customize how notices appear in the feed on the homepage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Section Badge</label>
              <input
                type="text"
                value={formData.noticesSection?.badge || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    noticesSection: { ...formData.noticesSection, badge: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Section Title</label>
              <input
                type="text"
                value={formData.noticesSection?.title || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    noticesSection: { ...formData.noticesSection, title: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">"View All" Button Label</label>
              <input
                type="text"
                value={formData.noticesSection?.viewAllText || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    noticesSection: { ...formData.noticesSection, viewAllText: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Max Notices Displayed</label>
              <input
                type="number"
                min={1}
                max={10}
                value={formData.noticesSection?.maxDisplay || 3}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    noticesSection: {
                      ...formData.noticesSection,
                      maxDisplay: parseInt(e.target.value) || 3,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: Bottom CTA Banner */}
      {activeTab === 'cta' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Bottom Call-To-Action Banner</h3>
            <p className="text-xs text-slate-500">
              High-conversion banner displayed before the footer on the home page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Headline Title</label>
              <input
                type="text"
                value={formData.ctaBanner?.title || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ctaBanner: { ...formData.ctaBanner, title: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Button Label</label>
              <input
                type="text"
                value={formData.ctaBanner?.buttonText || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ctaBanner: { ...formData.ctaBanner, buttonText: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Subtitle / Description</label>
              <textarea
                rows={2}
                value={formData.ctaBanner?.description || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ctaBanner: { ...formData.ctaBanner, description: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Button Link Destination</label>
              <input
                type="text"
                value={formData.ctaBanner?.buttonLink || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ctaBanner: { ...formData.ctaBanner, buttonLink: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Live Preview of CTA Banner */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase block mb-2">Live Banner Preview</span>
            <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-lg font-bold">{formData.ctaBanner?.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{formData.ctaBanner?.description}</p>
              </div>
              <span className="px-4 py-2 rounded-lg bg-[#1CA24B] text-white text-xs font-bold shrink-0">
                {formData.ctaBanner?.buttonText} &rarr;
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Save Bar */}
      <div className="sticky bottom-6 bg-slate-900 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between z-20">
        <div className="text-xs text-slate-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1CA24B] animate-pulse"></span>
          <span>Editing Home Page CMS</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-white px-3 py-1.5 transition-colors cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-[#1CA24B]/30"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
