import { useState } from 'react'
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react'
import { useCMS } from '../../../context/CMSContext'

export default function EditGalleryPage() {
  const { cms, updatePage, resetPage } = useCMS()
  const [formData, setFormData] = useState(cms.gallery || {})
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newImage, setNewImage] = useState({
    title: '',
    category: 'Campus',
    url: '',
  })

  const handleSave = () => {
    updatePage('gallery', formData)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleReset = () => {
    if (window.confirm('Reset Gallery Page content to defaults?')) {
      resetPage('gallery')
      setTimeout(() => setFormData(cms.gallery), 100)
    }
  }

  const deleteItem = (id) => {
    const updated = (formData.items || []).filter((item) => item.id !== id)
    setFormData({ ...formData, items: updated })
  }

  const handleAdd = (e) => {
    e.preventDefault()
    if (!newImage.url) return
    const itemToAdd = {
      id: `img-${Date.now()}`,
      ...newImage,
    }
    setFormData({
      ...formData,
      items: [itemToAdd, ...(formData.items || [])],
    })
    setShowAddModal(false)
    setNewImage({ title: '', category: 'Campus', url: '' })
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-zinc-500">
            <span>Page CMS</span>
            <span>&bull;</span>
            <span>Gallery</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">
            Photo &amp; Media Gallery
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage photo albums and campus life showcases.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/gallery"
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
          <span>Gallery updated successfully.</span>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-900">
            Gallery Items ({(formData.items || []).length})
          </h3>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-semibold cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Image
          </button>
        </div>

        {showAddModal && (
          <div className="bg-white p-5 rounded-2xl border border-zinc-300 space-y-3">
            <h4 className="text-xs font-bold uppercase text-zinc-900">Add Photo Item</h4>
            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={newImage.url}
                  onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs font-mono"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">Caption / Title</label>
                  <input
                    type="text"
                    value={newImage.title}
                    onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                    className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">Category</label>
                  <input
                    type="text"
                    value={newImage.category}
                    onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                    className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 border border-zinc-200 rounded-lg text-xs text-zinc-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-zinc-900 text-white text-xs font-semibold rounded-lg"
                >
                  Add Photo
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(formData.items || []).map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-zinc-200 overflow-hidden group">
              <div className="aspect-4/3 relative overflow-hidden bg-zinc-950">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <button
                  onClick={() => deleteItem(item.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-3">
                <span className="text-[10px] font-mono uppercase text-zinc-500">{item.category}</span>
                <h4 className="text-xs font-bold text-zinc-900 truncate mt-0.5">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
