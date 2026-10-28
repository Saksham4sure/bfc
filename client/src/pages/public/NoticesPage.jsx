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
    <div className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            {header.badge && (
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#1CA24B]">
                {header.badge}
              </span>
            )}
            <h1 className="text-4xl font-extrabold text-slate-900 mt-1">
              {header.title || 'Notices & Circulars'}
            </h1>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search notices..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1CA24B]/30"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500">
            No notices found matching your search.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#1CA24B]/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-sm bg-slate-100 text-slate-600">
                        {item.category || 'General'}
                      </span>
                      {item.important && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-sm bg-red-100 text-red-700">
                          Important
                        </span>
                      )}
                      <span className="text-xs text-slate-400">
                        {item.createdAt}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">{item.title}</h2>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </div>

                {item.fileUrl && (
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold shrink-0 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Download Attachment
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
