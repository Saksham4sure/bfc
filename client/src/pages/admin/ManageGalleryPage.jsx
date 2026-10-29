import { useState } from 'react'
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react'

export default function ManageGalleryPage() {
  const [images, setImages] = useState([
    {
      id: '1',
      title: 'Main Academic Block & Central Courtyard',
      category: 'Campus',
      url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      title: 'Advanced Science Practical Laboratory',
      category: 'Laboratory',
      url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    },
  ])

  const handleDelete = (id) => {
    setImages(images.filter((img) => img.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">Manage Media Gallery</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Upload and organize campus photos.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img.id} className="bg-white rounded-2xl border border-zinc-200 overflow-hidden relative group">
            <div className="aspect-4/3 relative overflow-hidden bg-zinc-950">
              <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-red-600 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-3">
              <span className="text-[10px] font-mono uppercase text-zinc-500">{img.category}</span>
              <h3 className="text-xs font-bold text-zinc-900 truncate mt-0.5">{img.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
