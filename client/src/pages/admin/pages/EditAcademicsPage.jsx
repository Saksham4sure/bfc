import { useState } from 'react'
import {
  GraduationCap,
  BookOpen,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  Check,
  X,
} from 'lucide-react'
import { useCMS } from '../../../context/CMSContext'

export default function EditAcademicsPage() {
  const { cms, updatePage, resetPage } = useCMS()
  const [formData, setFormData] = useState(cms.academics || {})
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = () => {
    updatePage('academics', formData)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleReset = () => {
    if (window.confirm('Reset Academics Page content to defaults?')) {
      resetPage('academics')
      setTimeout(() => setFormData(cms.academics), 100)
    }
  }

  // Update program fields
  const handleProgramChange = (index, field, value) => {
    const updated = [...(formData.programs || [])]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, programs: updated })
  }

  // Update feature bullet inside a program
  const handleFeatureChange = (progIndex, featureIndex, value) => {
    const updated = [...(formData.programs || [])]
    const features = [...(updated[progIndex].features || [])]
    features[featureIndex] = value
    updated[progIndex] = { ...updated[progIndex], features }
    setFormData({ ...formData, programs: updated })
  }

  const addFeature = (progIndex) => {
    const updated = [...(formData.programs || [])]
    const features = [...(updated[progIndex].features || []), 'New course practical or laboratory feature']
    updated[progIndex] = { ...updated[progIndex], features }
    setFormData({ ...formData, programs: updated })
  }

  const deleteFeature = (progIndex, featureIndex) => {
    const updated = [...(formData.programs || [])]
    const features = updated[progIndex].features.filter((_, i) => i !== featureIndex)
    updated[progIndex] = { ...updated[progIndex], features }
    setFormData({ ...formData, programs: updated })
  }

  const addProgram = () => {
    const updated = [
      ...(formData.programs || []),
      {
        id: `prog-${Date.now()}`,
        level: 'New Academic Program',
        description: 'Comprehensive curriculum designed for future career pathways and professional development.',
        features: ['Experienced faculty and state-of-the-art facilities', 'Practical industry workshops'],
      },
    ]
    setFormData({ ...formData, programs: updated })
  }

  const deleteProgram = (index) => {
    if (formData.programs.length <= 1) {
      alert('You must have at least one academic program.')
      return
    }
    const updated = formData.programs.filter((_, i) => i !== index)
    setFormData({ ...formData, programs: updated })
  }

  return (
    <div className="space-y-6">
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1CA24B]">
            <span>Page CMS</span>
            <span>&bull;</span>
            <span>Academics</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
            <span>Academics Page Content</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#1CA24B] font-bold">
              /academics
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Edit everything that appears on the Academics page: Header banner and all offered academic streams and highlights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/academics"
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
          <div className="font-semibold">Academics Page updated successfully!</div>
        </div>
      )}

      {/* Header Intro */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-[#1CA24B]" />
          Academics Page Header
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
            <label className="block text-xs font-semibold text-slate-700 mb-1">Page Headline Title</label>
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
          <label className="block text-xs font-semibold text-slate-700 mb-1">Subtitle / Overview</label>
          <textarea
            rows={2}
            value={formData.header?.description || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                header: { ...formData.header, description: e.target.value },
              })
            }
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
          />
        </div>
      </div>

      {/* Academic Streams Manager */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Academic Programs &amp; Streams</h3>
            <p className="text-xs text-slate-500">
              Manage the 2-column program cards shown on the academics page.
            </p>
          </div>
          <button
            onClick={addProgram}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Program
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formData.programs?.map((prog, pIdx) => (
            <div key={prog.id || pIdx} className="bg-white p-6 rounded-2xl border border-slate-200 relative space-y-4 shadow-xs">
              <button
                onClick={() => deleteProgram(pIdx)}
                className="absolute top-5 right-5 text-slate-300 hover:text-red-500 cursor-pointer"
                title="Remove program"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#e8f7ee] text-[#1CA24B] flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase">Program #{pIdx + 1}</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Program Name / Level</label>
                <input
                  type="text"
                  value={prog.level}
                  onChange={(e) => handleProgramChange(pIdx, 'level', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={prog.description}
                  onChange={(e) => handleProgramChange(pIdx, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-600 leading-relaxed"
                />
              </div>

              {/* Program Features / Highlights list */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Key Highlights
                  </label>
                  <button
                    type="button"
                    onClick={() => addFeature(pIdx)}
                    className="text-[11px] font-bold text-[#1CA24B] hover:underline cursor-pointer"
                  >
                    + Add Highlight
                  </button>
                </div>

                <div className="space-y-2">
                  {prog.features?.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#1CA24B] shrink-0" />
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => handleFeatureChange(pIdx, fIdx, e.target.value)}
                        className="grow px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-[#1CA24B]"
                      />
                      <button
                        type="button"
                        onClick={() => deleteFeature(pIdx, fIdx)}
                        className="p-1 text-slate-300 hover:text-red-500 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Save Bar */}
      <div className="sticky bottom-6 bg-slate-900 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between z-20">
        <div className="text-xs text-slate-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1CA24B] animate-pulse"></span>
          <span>Editing Academics Page CMS</span>
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
