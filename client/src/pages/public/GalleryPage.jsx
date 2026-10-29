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
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {header.badge && (
            <span className="text-xs uppercase font-bold tracking-wider text-zinc-500">
              {header.badge}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 mt-2 mb-3 tracking-tight">
            {header.title || 'Campus Moments & Gallery'}
          </h1>
          {header.description && (
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
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
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-zinc-900 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
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
              className="group relative rounded-2xl overflow-hidden bg-zinc-950 aspect-4/3 border border-zinc-200"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-transparent to-transparent flex flex-col justify-end p-5">
                <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-white font-bold text-sm sm:text-base mt-1">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
