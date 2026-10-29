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
  Layout,
  AlignLeft,
  AlignRight,
  Moon,
  Quote,
  Maximize2,
  Palette,
  Film,
  SlidersHorizontal,
} from 'lucide-react'
import { useCMS } from '../../../context/CMSContext'
import LivePreviewPane from '../../../components/admin/LivePreviewPane'

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

const STORY_THEMES = [
  { id: 'text-left-image-right', name: 'Text Left, Image Right', icon: AlignLeft, desc: 'Classic balanced 2-column layout' },
  { id: 'image-left-text-right', name: 'Image Left, Text Right', icon: AlignRight, desc: 'Editorial image-first showcase' },
  { id: 'dark-hero-card', name: 'Minimal Dark Card', icon: Moon, desc: 'High-contrast dark slate card with clean typography' },
  { id: 'quote-executive', name: "Executive / Principal's Message", icon: Quote, desc: 'Clean white background with portrait showcase' },
  { id: 'centered-spotlight', name: 'Panoramic Spotlight', icon: Maximize2, desc: 'Wide banner with centered headline story' },
]

const PRESET_IMAGES = [
  { label: 'Campus Courtyard', url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Graduation & Students', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Classroom & Library', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Science Laboratory', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80' },
]

export default function EditHomePage() {
  const { cms, updatePage, resetPage } = useCMS()
  const homeData = cms.home || {}

  // Local editable state
  const [formData, setFormData] = useState({
    heroSliderTheme: 'awwwards-cinematic',
    ...homeData,
  })

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
  const handleSliderThemeChange = (themeId) => {
    setFormData((prev) => ({
      ...prev,
      heroSliderTheme: themeId,
    }))
  }

  const handleSlideChange = (index, field, value) => {
    const updated = [...(formData.heroSlides || [])]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, heroSlides: updated })
  }

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
    const paragraphsArray =
      typeof newStory.paragraphs === 'string'
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

  // Map active tab to preview section
  const previewSectionMap = {
    sliders: 'hero',
    stories: 'stories',
    stats: 'stats',
    pillars: 'pillars',
    notices: 'all',
    cta: 'all',
  }

  return (
    <div className="space-y-6">
      {/* Page Title & Minimal Top Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-zinc-500 uppercase tracking-wider">
            <span>Home Page</span>
            <span>&bull;</span>
            <span>Live Editor</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">
            Home Page Content &amp; Sliders
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Configure Awwwards-inspired sliders, dynamic section themes, stories, and metrics with real-time live preview.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Site</span>
          </a>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors cursor-pointer"
            title="Reset to default template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Save Success Alert */}
      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-zinc-100 border border-zinc-300 text-zinc-800 text-xs font-medium flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-zinc-700 shrink-0" />
          <span>Home Page updated successfully. All changes are live.</span>
        </div>
      )}

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-zinc-200 pb-2">
        {[
          { id: 'sliders', label: 'Hero Sliders', icon: Layers, count: formData.heroSlides?.length },
          { id: 'stories', label: 'Welcome Stories', icon: Sparkles, count: formData.welcomeStories?.length },
          { id: 'stats', label: 'Key Statistics', icon: BarChart3, count: formData.stats?.length },
          { id: 'pillars', label: 'Academic Pillars', icon: BookOpen, count: formData.aboutSection?.pillars?.length },
          { id: 'notices', label: 'Notices Feed', icon: Bell },
          { id: 'cta', label: 'CTA Banner', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-zinc-900 text-white'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded text-[10px] ${
                    isActive ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-600'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* -------------------------------------------------------------
       * Two-Column Layout: Inputs on Left, Live Preview on Right
       * ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs (Col 1-7) */}
        <div className="lg:col-span-6 xl:col-span-6 space-y-6">
          {/* TAB 1: Hero Sliders */}
          {activeTab === 'sliders' && (
            <div className="space-y-6">
              {/* Dynamic Theme Selector for Sliders */}
              <div className="bg-white p-5 rounded-2xl border border-zinc-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                      <Palette className="w-4 h-4 text-zinc-600" />
                      <span>Slider Theme &amp; Animation Style</span>
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Choose an Awwwards-inspired animation and layout theme for the homepage hero slider.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {SLIDER_THEMES.map((th) => {
                    const Icon = th.icon
                    const isSelected = (formData.heroSliderTheme || 'awwwards-cinematic') === th.id
                    return (
                      <div
                        key={th.id}
                        onClick={() => handleSliderThemeChange(th.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                            : 'border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 text-zinc-800'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-zinc-600'}`} />
                          <span className="text-xs font-bold leading-tight">{th.name}</span>
                        </div>
                        <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                          {th.desc}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Header and Add Slide Button */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Hero Slide Items</h3>
                  <p className="text-xs text-zinc-500">Edit slides or reorder them.</p>
                </div>
                <button
                  onClick={() => setShowAddSlide(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Slide
                </button>
              </div>

              {/* Add Slide Modal / Expandable Form */}
              {showAddSlide && (
                <div className="bg-white p-5 rounded-2xl border border-zinc-300 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                    <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-wide">
                      Add New Hero Slide
                    </h4>
                    <button
                      onClick={() => setShowAddSlide(false)}
                      className="text-xs text-zinc-400 hover:text-zinc-700 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleAddSlide} className="space-y-3.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                        Headline Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={newSlide.title}
                        onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                        placeholder="e.g. Empowering Young Minds For A Brighter Tomorrow"
                        className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs focus:ring-1 focus:ring-zinc-900 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                          Badge Tag
                        </label>
                        <input
                          type="text"
                          value={newSlide.badge}
                          onChange={(e) => setNewSlide({ ...newSlide, badge: e.target.value })}
                          placeholder="e.g. Admissions Open 2026/2027"
                          className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={newSlide.buttonText}
                          onChange={(e) => setNewSlide({ ...newSlide, buttonText: e.target.value })}
                          placeholder="e.g. Enroll Online Today"
                          className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                        Subtitle Text
                      </label>
                      <textarea
                        rows={2}
                        value={newSlide.subtitle}
                        onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                        placeholder="Concise overview text for the banner slide..."
                        className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={newSlide.imageUrl}
                        onChange={(e) => setNewSlide({ ...newSlide, imageUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs font-mono"
                      />
                      <div className="mt-1.5 flex flex-wrap gap-1.5 text-[11px] text-zinc-500">
                        <span>Presets:</span>
                        {PRESET_IMAGES.map((preset, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setNewSlide({ ...newSlide, imageUrl: preset.url })}
                            className="px-1.5 py-0.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded text-[10px]"
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
                        className="px-3 py-1.5 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-600 hover:bg-zinc-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg shadow-xs"
                      >
                        Save Slide
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Slides List with Inline Inputs */}
              <div className="space-y-4">
                {formData.heroSlides?.map((slide, index) => (
                  <div
                    key={slide.id || index}
                    className={`bg-white rounded-2xl border p-4 sm:p-5 transition-all space-y-3.5 ${
                      slide.isActive ? 'border-zinc-200' : 'border-zinc-200 bg-zinc-50 opacity-60'
                    }`}
                  >
                    {/* Header bar of slide */}
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                          Slide #{index + 1}
                        </span>
                        {!slide.isActive && (
                          <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-600">
                            Hidden
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveSlide(index, 'up')}
                          disabled={index === 0}
                          className="p-1 text-zinc-400 hover:text-zinc-800 disabled:opacity-20 cursor-pointer"
                          title="Move up"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveSlide(index, 'down')}
                          disabled={index === formData.heroSlides.length - 1}
                          className="p-1 text-zinc-400 hover:text-zinc-800 disabled:opacity-20 cursor-pointer"
                          title="Move down"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleSlideActive(slide.id)}
                          className="p-1 text-zinc-400 hover:text-zinc-800 cursor-pointer"
                          title={slide.isActive ? 'Hide slide' : 'Show slide'}
                        >
                          {slide.isActive ? <Eye className="w-3.5 h-3.5 text-zinc-800" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-400" />}
                        </button>
                        <button
                          onClick={() => deleteSlide(slide.id)}
                          className="p-1 text-zinc-400 hover:text-red-600 cursor-pointer"
                          title="Delete slide"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Inline Inputs for Live Sync */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                          Headline Title
                        </label>
                        <input
                          type="text"
                          value={slide.title}
                          onChange={(e) => handleSlideChange(index, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs font-semibold text-zinc-900"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                            Badge Tag
                          </label>
                          <input
                            type="text"
                            value={slide.badge || ''}
                            onChange={(e) => handleSlideChange(index, 'badge', e.target.value)}
                            className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                            Button Text
                          </label>
                          <input
                            type="text"
                            value={slide.buttonText || ''}
                            onChange={(e) => handleSlideChange(index, 'buttonText', e.target.value)}
                            className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                          Subtitle
                        </label>
                        <textarea
                          rows={2}
                          value={slide.subtitle || ''}
                          onChange={(e) => handleSlideChange(index, 'subtitle', e.target.value)}
                          className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs text-zinc-600"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                          Image URL
                        </label>
                        <input
                          type="url"
                          value={slide.imageUrl || ''}
                          onChange={(e) => handleSlideChange(index, 'imageUrl', e.target.value)}
                          className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Welcome Stories */}
          {activeTab === 'stories' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Welcome &amp; Feature Stories</h3>
                  <p className="text-xs text-zinc-500">
                    Stories displayed below the slider with customizable layout themes.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddStory(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Story
                </button>
              </div>

              {/* Add Story Form */}
              {showAddStory && (
                <div className="bg-white p-5 rounded-2xl border border-zinc-300 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                    <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-wide">
                      Create New Story Block
                    </h4>
                    <button
                      onClick={() => setShowAddStory(false)}
                      className="text-xs text-zinc-400 hover:text-zinc-700 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleAddStory} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                          Indicator Badge *
                        </label>
                        <input
                          type="text"
                          required
                          value={newStory.indicator}
                          onChange={(e) => setNewStory({ ...newStory, indicator: e.target.value })}
                          className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                          Story Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={newStory.title}
                          onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                          className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                        Paragraphs (Double newline for new paragraph) *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={newStory.paragraphs}
                        onChange={(e) => setNewStory({ ...newStory, paragraphs: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                        Layout Theme
                      </label>
                      <select
                        value={newStory.theme}
                        onChange={(e) => setNewStory({ ...newStory, theme: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs bg-white font-medium"
                      >
                        {STORY_THEMES.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                        Image URL
                      </label>
                      <input
                        type="url"
                        required
                        value={newStory.imageUrl}
                        onChange={(e) => setNewStory({ ...newStory, imageUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs font-mono"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddStory(false)}
                        className="px-3 py-1.5 border border-zinc-200 rounded-lg text-xs text-zinc-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-zinc-900 text-white text-xs font-semibold rounded-lg"
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
                  const paragraphsText = Array.isArray(story.paragraphs)
                    ? story.paragraphs.join('\n\n')
                    : story.paragraphs || ''

                  return (
                    <div
                      key={story.id || index}
                      className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 space-y-3.5"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                          Story #{index + 1}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => moveStory(index, 'up')}
                            disabled={index === 0}
                            className="p-1 text-zinc-400 hover:text-zinc-800 disabled:opacity-20 cursor-pointer"
                          >
                            <MoveUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => moveStory(index, 'down')}
                            disabled={index === formData.welcomeStories.length - 1}
                            className="p-1 text-zinc-400 hover:text-zinc-800 disabled:opacity-20 cursor-pointer"
                          >
                            <MoveDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteStory(story.id)}
                            className="p-1 text-zinc-400 hover:text-red-600 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                              Indicator
                            </label>
                            <input
                              type="text"
                              value={story.indicator || ''}
                              onChange={(e) => handleStoryChange(index, 'indicator', e.target.value)}
                              className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                              Title
                            </label>
                            <input
                              type="text"
                              value={story.title}
                              onChange={(e) => handleStoryChange(index, 'title', e.target.value)}
                              className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs font-bold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                            Paragraphs
                          </label>
                          <textarea
                            rows={3}
                            value={paragraphsText}
                            onChange={(e) => handleStoryChange(index, 'paragraphs', e.target.value)}
                            className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs text-zinc-600"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                              Image URL
                            </label>
                            <input
                              type="url"
                              value={story.imageUrl}
                              onChange={(e) => handleStoryChange(index, 'imageUrl', e.target.value)}
                              className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                              Layout Theme
                            </label>
                            <select
                              value={story.theme || 'text-left-image-right'}
                              onChange={(e) => handleStoryChange(index, 'theme', e.target.value)}
                              className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs bg-white"
                            >
                              {STORY_THEMES.map((t) => (
                                <option key={t.id} value={t.id}>
                                  {t.name}
                                </option>
                              ))}
                            </select>
                          </div>
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
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Key Statistics Counter Bar</h3>
                  <p className="text-xs text-zinc-500">Edit metrics and milestone counts.</p>
                </div>
                <button
                  onClick={addStat}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-medium cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Counter
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {formData.stats?.map((stat, i) => (
                  <div key={stat.id || i} className="bg-white p-4 rounded-xl border border-zinc-200 relative">
                    <button
                      onClick={() => deleteStat(i)}
                      className="absolute top-3 right-3 text-zinc-400 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="space-y-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-zinc-500">Value</span>
                        <input
                          type="text"
                          value={stat.number}
                          onChange={(e) => handleStatChange(i, 'number', e.target.value)}
                          className="w-full px-2.5 py-1 border border-zinc-200 rounded-lg text-base font-bold text-zinc-900"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-zinc-500">Label</span>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => handleStatChange(i, 'label', e.target.value)}
                          className="w-full px-2.5 py-1 border border-zinc-200 rounded-lg text-xs text-zinc-600"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Pillars */}
          {activeTab === 'pillars' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-zinc-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Pillars Header
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                      Badge
                    </label>
                    <input
                      type="text"
                      value={formData.aboutSection?.badge || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          aboutSection: { ...formData.aboutSection, badge: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.aboutSection?.title || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          aboutSection: { ...formData.aboutSection, title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-900">Core Pillars List</h3>
                <button
                  onClick={addPillar}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-medium cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Pillar
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {formData.aboutSection?.pillars?.map((pillar, i) => (
                  <div key={pillar.id || i} className="bg-white p-4 rounded-xl border border-zinc-200 relative space-y-2">
                    <button
                      onClick={() => deletePillar(i)}
                      className="absolute top-3 right-3 text-zinc-400 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={pillar.title}
                        onChange={(e) => handlePillarChange(i, 'title', e.target.value)}
                        className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs font-bold text-zinc-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={pillar.desc}
                        onChange={(e) => handlePillarChange(i, 'desc', e.target.value)}
                        className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs text-zinc-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Notices Feed */}
          {activeTab === 'notices' && (
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 space-y-4">
              <h3 className="text-sm font-bold text-zinc-900">Notices Section Display</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                    Badge
                  </label>
                  <input
                    type="text"
                    value={formData.noticesSection?.badge || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        noticesSection: { ...formData.noticesSection, badge: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.noticesSection?.title || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        noticesSection: { ...formData.noticesSection, title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CTA Banner */}
          {activeTab === 'cta' && (
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 space-y-4">
              <h3 className="text-sm font-bold text-zinc-900">Bottom CTA Banner</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                    Headline Title
                  </label>
                  <input
                    type="text"
                    value={formData.ctaBanner?.title || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ctaBanner: { ...formData.ctaBanner, title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.ctaBanner?.buttonText || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ctaBanner: { ...formData.ctaBanner, buttonText: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.ctaBanner?.description || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ctaBanner: { ...formData.ctaBanner, description: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs text-zinc-600"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Live Preview Window (Col 7-12) */}
        <div className="lg:col-span-6 xl:col-span-6">
          <LivePreviewPane
            data={formData}
            activeSection={previewSectionMap[activeTab] || 'hero'}
            onSectionChange={(tabKey) => setActiveTab(tabKey)}
          />
        </div>
      </div>
    </div>
  )
}
