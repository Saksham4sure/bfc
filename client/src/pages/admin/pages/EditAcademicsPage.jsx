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

  const handleProgramChange = (index, field, value) => {
    const updated = [...(formData.programs || [])]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, programs: updated })
  }

  const handleFeatureChange = (progIndex, featureIndex, value) => {
    const updated = [...(formData.programs || [])]
    const features = [...(updated[progIndex].features || [])]
    features[featureIndex] = value
    updated[progIndex] = { ...updated[progIndex], features }
    setFormData({ ...formData, programs: updated })
  }

  const addFeature = (progIndex) => {
    const updated = [...(formData.programs || [])]
    const features = [...(updated[progIndex].features || []), 'New curriculum lab or course highlight']
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
        features: ['Experienced faculty mentors', 'Practical industry workshops'],
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
    <div className="space-y-6 max-w-5xl">
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-zinc-500">
            <span>Page CMS</span>
            <span>&bull;</span>
            <span>Academics</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">
            Academic Programs Content
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Configure School level and +2 Science, Management &amp; Humanities programs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/academics"
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
          <span>Academic programs updated successfully.</span>
        </div>
      )}

      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-4">
        <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-zinc-600" />
          Header Configuration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Badge</label>
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
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Headline Title</label>
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
          <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Description</label>
          <textarea
            rows={2}
            value={formData.header?.description || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                header: { ...formData.header, description: e.target.value },
              })
            }
            className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs"
          />
        </div>
      </div>

      {/* Programs List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-900">Academic Programs List</h3>
          <button
            onClick={addProgram}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-semibold cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Program
          </button>
        </div>

        <div className="space-y-4">
          {(formData.programs || []).map((prog, index) => (
            <div key={prog.id || index} className="bg-white p-5 rounded-2xl border border-zinc-200 space-y-4 relative">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                  Program #{index + 1}
                </span>
                <button
                  onClick={() => deleteProgram(index)}
                  className="p-1 text-zinc-400 hover:text-red-600 cursor-pointer"
                  title="Delete program"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                  Program Name / Stream Level
                </label>
                <input
                  type="text"
                  value={prog.level}
                  onChange={(e) => handleProgramChange(index, 'level', e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm font-bold text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={prog.description}
                  onChange={(e) => handleProgramChange(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs text-zinc-600 leading-relaxed"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase text-zinc-700">Course Highlights</span>
                  <button
                    onClick={() => addFeature(index)}
                    className="text-xs text-zinc-600 hover:text-zinc-900 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add Feature
                  </button>
                </div>

                <div className="space-y-2">
                  {(prog.features || []).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0"></span>
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => handleFeatureChange(index, fIdx, e.target.value)}
                        className="grow px-3 py-1.5 border border-zinc-200 rounded-lg text-xs text-zinc-700"
                      />
                      <button
                        onClick={() => deleteFeature(index, fIdx)}
                        className="p-1 text-zinc-400 hover:text-red-500 cursor-pointer"
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
    </div>
  )
}
