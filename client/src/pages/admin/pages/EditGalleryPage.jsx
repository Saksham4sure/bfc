import { useState } from 'react'
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  Upload,
} from 'lucide-react'
import { useCMS } from '../../../context/CMSContext'

export default function EditGalleryPage() {
  const { cms, updatePage, resetPage } = useCMS()
  const [formData, setFormData] = useState(cms.gallery || {})
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  const [newImage, setNewImage] = useState({
    title: '',
    category: 'Campus',
    url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
  })

  const handleSave = () => {
    updatePage('gallery', formData)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleReset = () => {
    if (window.confirm('Reset Gallery to default images?')) {
      resetPage('gallery')
      setTimeout(() => setFormData(cms.gallery), 100)
    }
  }

  const handleAddImage = (e) => {
    e.preventDefault()
    if (!newImage.title || !newImage.url) return
    const updated = [
      {
        id: `img-${Date.now()}`,
        ...newImage,
      },
      ...(formData.items || []),
    ]
    setFormData({ ...formData, items: updated })
    setShowAddModal(false)
    setNewImage({
      title: '',
      category: 'Campus',
      url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
    })
  }

  const deleteImage = (id) => {
    const updated = formData.items.filter((item) => item.id !== id)
    setFormData({ ...formData, items: updated })
  }

  const filteredItems = (formData.items || []).filter(
    (item) => selectedCategory === 'ALL' || item.category === selectedCategory
  )

  const PRESET_GALLERY = [
    { label: 'Campus Courtyard', url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80', category: 'Campus' },
    { label: 'Science Practical Lab', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80', category: 'Laboratory' },
    { label: 'Annual Sports Ground', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80', category: 'Sports' },
    { label: 'Robotics & STEM Lab', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80', category: 'Laboratory' },
    { label: 'Computer Lab Tech', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80', category: 'Campus' },
    { label: 'Cultural Dance Fair', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80', category: 'Events' },
  ]

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1CA24B]">
            <span>Page CMS</span>
            <span>&bull;</span>
            <span>Media Assets</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
            <span>Photo Gallery Content</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#1CA24B] font-bold">
              /gallery
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage photo albums, campus life galleries, laboratory snapshots, and extracurricular media.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/gallery"
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
          <div className="font-semibold">Gallery updated successfully!</div>
        </div>
      )}

      {/* Header Intro */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-[#1CA24B]" />
          Gallery Page Header
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
            <label className="block text-xs font-semibold text-slate-700 mb-1">Main Heading</label>
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
          <label className="block text-xs font-semibold text-slate-700 mb-1">Subtitle / Description</label>
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

      {/* Media Items Manager */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {['ALL', 'Campus', 'Laboratory', 'Sports', 'Events'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs font-bold shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Add Photo
          </button>
        </div>

        {/* Add Photo Modal */}
        {showAddModal && (
          <div className="bg-white p-6 rounded-2xl border border-[#1CA24B]/30 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm">Add New Photo to Gallery</h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleAddImage} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Photo Title *</label>
                  <input
                    type="text"
                    required
                    value={newImage.title}
                    onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                    placeholder="e.g. Physics Demonstration Lab"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newImage.category}
                    onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                  >
                    <option value="Campus">Campus</option>
                    <option value="Laboratory">Laboratory</option>
                    <option value="Sports">Sports</option>
                    <option value="Events">Events</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={newImage.url}
                  onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
                />
                <div className="mt-2 flex flex-wrap gap-2 items-center text-xs text-slate-500">
                  <span>Presets:</span>
                  {PRESET_GALLERY.map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        setNewImage({
                          ...newImage,
                          title: preset.label,
                          category: preset.category,
                          url: preset.url,
                        })
                      }
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
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1CA24B] hover:bg-[#16843c] text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Add Photo
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((img) => (
            <div
              key={img.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs group flex flex-col justify-between"
            >
              <div className="aspect-video relative overflow-hidden bg-slate-900">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => deleteImage(img.id)}
                  className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer"
                  title="Delete image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
                  {img.category}
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Save Bar */}
      <div className="sticky bottom-6 bg-slate-900 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between z-20">
        <div className="text-xs text-slate-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1CA24B] animate-pulse"></span>
          <span>Editing Photo Gallery CMS</span>
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
