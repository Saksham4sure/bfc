import { useState } from 'react'
import {
  Info,
  Eye,
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
    <div className="space-y-6">
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1CA24B]">
            <span>Page CMS</span>
            <span>&bull;</span>
            <span>About Us</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
            <span>About Page Content</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#1CA24B] font-bold">
              /about
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Edit everything that appears on the About Us page: Institutional intro, Vision, Mission, and Core Values.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/about"
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

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="font-semibold">About Page updated successfully!</div>
        </div>
      )}

      {/* Section 1: Page Header & Intro */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Info className="w-4 h-4 text-[#1CA24B]" />
          Header &amp; Institution Introduction
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Tag</label>
            <input
              type="text"
              value={formData.header?.badge || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  header: { ...formData.header, badge: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Main Heading Title</label>
            <input
              type="text"
              value={formData.header?.title || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  header: { ...formData.header, title: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Introduction Paragraph</label>
          <textarea
            rows={3}
            value={formData.header?.description || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                header: { ...formData.header, description: e.target.value },
              })
            }
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs leading-relaxed"
          />
        </div>
      </div>

      {/* Section 2: Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vision Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <div className="w-8 h-8 rounded-lg bg-[#e8f7ee] text-[#1CA24B] flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
            <span>Our Vision Card</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Vision Title</label>
            <input
              type="text"
              value={formData.vision?.title || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  vision: { ...formData.vision, title: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Vision Description</label>
            <textarea
              rows={4}
              value={formData.vision?.description || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  vision: { ...formData.vision, description: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* Mission Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <div className="w-8 h-8 rounded-lg bg-[#e8f7ee] text-[#1CA24B] flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <span>Our Mission Card</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Mission Title</label>
            <input
              type="text"
              value={formData.mission?.title || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mission: { ...formData.mission, title: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Mission Description</label>
            <textarea
              rows={4}
              value={formData.mission?.description || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mission: { ...formData.mission, description: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Core Values */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Institutional Core Values</h3>
            <p className="text-xs text-slate-500">
              Values presented in the 4-column cards grid on the public about page.
            </p>
          </div>
          <button
            onClick={addValue}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Core Value
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {formData.coreValues?.map((val, i) => (
            <div key={val.id || i} className="bg-white p-5 rounded-2xl border border-slate-200 relative group space-y-3">
              <button
                onClick={() => deleteValue(i)}
                className="absolute top-4 right-4 text-slate-300 hover:text-red-500 cursor-pointer"
                title="Remove value"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Value #{i + 1}
                </span>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Value Title</label>
                <input
                  type="text"
                  value={val.title}
                  onChange={(e) => handleValueChange(i, 'title', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-bold text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={val.desc}
                  onChange={(e) => handleValueChange(i, 'desc', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-600 leading-normal"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Save Bar */}
      <div className="sticky bottom-6 bg-slate-900 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between z-20">
        <div className="text-xs text-slate-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1CA24B] animate-pulse"></span>
          <span>Editing About Us Page CMS</span>
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
