import { useState } from 'react'
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react'

export default function ManageGalleryPage() {
  const [images, setImages] = useState([
    { id: 1, title: 'Main Campus', url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=600&q=80', category: 'Campus' },
    { id: 2, title: 'Science Lab', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80', category: 'Laboratory' },
    { id: 3, title: 'Annual Sports', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80', category: 'Sports' },
  ])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manage Media Gallery</h2>
          <p className="text-sm text-slate-500">
            Upload and organize college media assets powered by Cloudinary and Multer.
          </p>
        </div>
        <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-sm font-semibold shadow-xs cursor-pointer">
          <Upload className="w-4 h-4" /> Upload New Photo
          <input type="file" className="hidden" accept="image/*" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs group">
            <div className="aspect-video relative overflow-hidden bg-slate-100">
              <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setImages(images.filter((i) => i.id !== img.id))}
                className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer"
                title="Delete photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">{img.title}</h4>
                <span className="text-xs text-slate-400">{img.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
