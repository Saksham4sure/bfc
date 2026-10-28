import { useState } from 'react'
import { useCMS } from '../../context/CMSContext'

export default function GalleryPage() {
  const { cms } = useCMS()
  const gallery = cms.gallery || {}
  const header = gallery.header || {}
  const galleryItems = gallery.items || []

  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Campus', 'Laboratory', 'Sports', 'Events']

  const items = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  return (
    <div className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {header.badge && (
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#1CA24B]">
              {header.badge}
            </span>
          )}
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2 mb-3">
            {header.title || 'Campus Moments & Gallery'}
          </h1>
          {header.description && (
            <p className="text-slate-600">
              {header.description}
            </p>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1CA24B] text-white shadow-md shadow-[#1CA24B]/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 aspect-4/3 shadow-xs border border-slate-200"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5">
                <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-white font-bold text-base mt-1">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
