import { useState } from 'react'
import { Bell, FileText, Search, Calendar as CalendarIcon, Filter } from 'lucide-react'
import { useCMS } from '../../context/CMSContext'
import EventsCalendarView from '../../components/features/events/EventsCalendarView'

export default function NoticesPage() {
  const { cms } = useCMS()
  const noticesData = cms.notices || {}
  const header = noticesData.header || {}
  const noticesList = noticesData.items || []

  const [activeTab, setActiveTab] = useState('calendar') // 'calendar' | 'notices'
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = noticesList.filter(
    (n) =>
      n.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header & Page Mode Selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-semibold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1CA24B]"></span>
              <span>Academic Year 2026/2027</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
              Notices &amp; Events Calendar
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-xl">
              Stay informed with official circulars, routine updates, and the live interactive college events schedule.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-zinc-100 p-1 rounded-2xl border border-zinc-200 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'calendar'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Events Calendar</span>
            </button>
            <button
              onClick={() => setActiveTab('notices')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'notices'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Official Notices ({noticesList.length})</span>
            </button>
          </div>
        </div>

        {/* =========================================================
         * TAB 1: INTERACTIVE EVENTS CALENDAR (Matches image)
         * ========================================================= */}
        {activeTab === 'calendar' && (
          <div className="space-y-4">
            <EventsCalendarView />
          </div>
        )}

        {/* =========================================================
         * TAB 2: OFFICIAL NOTICES & CIRCULARS
         * ========================================================= */}
        {activeTab === 'notices' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-zinc-900">
                Official Circulars Bulletin
              </h2>
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search notices by title or keyword..."
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
                      <div className="w-10 h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center shrink-0 mt-0.5">
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
                        <h3 className="text-base font-bold text-zinc-900">{item.title}</h3>
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
                        Download PDF
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
