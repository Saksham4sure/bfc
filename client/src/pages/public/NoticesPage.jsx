import { useState } from 'react'
import { Bell, FileText, Search } from 'lucide-react'
import { useCMS } from '../../context/CMSContext'

export default function NoticesPage() {
  const { cms } = useCMS()
  const noticesData = cms.notices || {}
  const header = noticesData.header || {}
  const noticesList = noticesData.items || []

  const [searchTerm, setSearchTerm] = useState('')

  const filtered = noticesList.filter(
    (n) =>
      n.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            {header.badge && (
              <span className="text-xs uppercase font-bold tracking-wider text-zinc-500">
                {header.badge}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 mt-1 tracking-tight">
              {header.title || 'Notices & Circulars'}
            </h1>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search notices..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-zinc-50 p-12 text-center rounded-2xl border border-zinc-200 text-zinc-500 text-xs">
            No notices found matching your search.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-50/70 p-5 sm:p-6 rounded-2xl border border-zinc-200 hover:border-zinc-300 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-200 text-zinc-700">
                        {item.category || 'General'}
                      </span>
                      {item.important && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-900 text-white uppercase">
                          Important
                        </span>
                      )}
                      <span className="text-xs text-zinc-400 font-mono">
                        {item.createdAt}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-zinc-900">{item.title}</h2>
                    <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </div>

                {item.fileUrl && (
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-xs font-semibold shrink-0 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Download File
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
