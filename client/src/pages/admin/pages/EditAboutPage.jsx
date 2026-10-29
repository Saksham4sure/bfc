import { useState } from 'react'
import {
  Info,
  Target,
  CheckCircle2,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  ExternalLink,
} from 'lucide-react'
import { useCMS } from '../../../context/CMSContext'

export default function EditAboutPage() {
  const { cms, updatePage, resetPage } = useCMS()
  const [formData, setFormData] = useState(cms.about || {})
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = () => {
    updatePage('about', formData)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleReset = () => {
    if (window.confirm('Reset About Page content to defaults?')) {
      resetPage('about')
      setTimeout(() => setFormData(cms.about), 100)
    }
  }

  const handleValueChange = (index, field, value) => {
    const updated = [...(formData.coreValues || [])]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, coreValues: updated })
  }

  const addValue = () => {
    const updated = [
      ...(formData.coreValues || []),
      {
        id: `val-${Date.now()}`,
        title: 'New Value',
        desc: 'Commitment to student excellence and character development.',
      },
    ]
    setFormData({ ...formData, coreValues: updated })
  }

  const deleteValue = (index) => {
    const updated = formData.coreValues.filter((_, i) => i !== index)
    setFormData({ ...formData, coreValues: updated })
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-zinc-500">
            <span>Page CMS</span>
            <span>&bull;</span>
            <span>About Us</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">
            About Page Content
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Edit institutional overview, Vision, Mission, and Core Values.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/about"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live</span>
          </a>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
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

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-medium flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-zinc-700 shrink-0" />
          <span>About Page updated successfully.</span>
        </div>
      )}

      {/* Section 1: Page Header & Intro */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-4">
        <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
          <Info className="w-4 h-4 text-zinc-600" />
          Header &amp; Institution Introduction
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
              Top Small Badge
            </label>
            <input
              type="text"
              value={formData.header?.badge || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  header: { ...formData.header, badge: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
              Main Page Headline
            </label>
            <input
              type="text"
              value={formData.header?.title || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  header: { ...formData.header, title: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
            Introductory Paragraph
          </label>
          <textarea
            rows={3}
            value={formData.header?.description || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                header: { ...formData.header, description: e.target.value },
              })
            }
            className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs leading-relaxed"
          />
        </div>
      </div>

      {/* Section 2: Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vision */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-4">
          <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
            <Target className="w-4 h-4 text-zinc-600" />
            Our Vision Card
          </h3>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Vision Title</label>
            <input
              type="text"
              value={formData.vision?.title || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  vision: { ...formData.vision, title: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Vision Statement</label>
            <textarea
              rows={4}
              value={formData.vision?.description || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  vision: { ...formData.vision, description: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* Mission */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-4">
          <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
            <Target className="w-4 h-4 text-zinc-600" />
            Our Mission Card
          </h3>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Mission Title</label>
            <input
              type="text"
              value={formData.mission?.title || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mission: { ...formData.mission, title: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Mission Statement</label>
            <textarea
              rows={4}
              value={formData.mission?.description || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mission: { ...formData.mission, description: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Core Values List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-900">Institutional Core Values</h3>
            <p className="text-xs text-zinc-500">Highlighted pillars displayed on the About page.</p>
          </div>
          <button
            onClick={addValue}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-medium cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Core Value
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(formData.coreValues || []).map((val, i) => (
            <div key={val.id || i} className="bg-white p-5 rounded-2xl border border-zinc-200 space-y-3 relative">
              <button
                onClick={() => deleteValue(i)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Value Title</label>
                <input
                  type="text"
                  value={val.title}
                  onChange={(e) => handleValueChange(i, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={val.desc}
                  onChange={(e) => handleValueChange(i, 'desc', e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs text-zinc-600"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
