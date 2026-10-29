import { useState, useMemo, useEffect } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  X,
  ExternalLink,
  Calendar as CalendarIcon,
  Plus,
} from 'lucide-react'
import { useCMS } from '../../../context/CMSContext'

const CATEGORY_STYLES = {
  Academic: {
    dot: 'bg-zinc-900',
    tag: 'bg-zinc-100 text-zinc-800 border-zinc-200',
    chip: 'bg-zinc-100 text-zinc-900 border-zinc-200',
  },
  Examination: {
    dot: 'bg-rose-500',
    tag: 'bg-rose-50 text-rose-700 border-rose-200',
    chip: 'bg-rose-50 text-rose-800 border-rose-200',
  },
  Sports: {
    dot: 'bg-emerald-500',
    tag: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    chip: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  Events: {
    dot: 'bg-sky-500',
    tag: 'bg-sky-50 text-sky-700 border-sky-200',
    chip: 'bg-sky-50 text-sky-800 border-sky-200',
  },
  Holiday: {
    dot: 'bg-amber-500',
    tag: 'bg-amber-50 text-amber-700 border-amber-200',
    chip: 'bg-amber-50 text-amber-800 border-amber-200',
  },
}

export default function EventsCalendarView() {
  const { cms } = useCMS()

  // Use current date
  const today = new Date()
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()) // 0 - 11
  const [selectedDateModal, setSelectedDateModal] = useState(null) // Date object or null
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Raw events from CMS
  const rawEvents = cms.notices?.events || []

  // Enhanced sample calendar events distributed across current year/month
  const calendarEvents = useMemo(() => {
    const list = [...rawEvents]

    // Ensure we have representative events for current month
    const defaultList = [
      {
        id: 'ev-1',
        title: 'Terminal Examination Routine & Admit Cards Distribution',
        category: 'Examination',
        date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-08`,
        timeRange: '10:00 AM - 01:00 PM',
        location: 'Department Desks & Exam Cell',
        description: 'Students of Grade XI & XII can collect admit cards and verify exam routines.',
      },
      {
        id: 'ev-2',
        title: 'Science & Robotics Project Exhibition 2026',
        category: 'Academic',
        date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-12`,
        timeRange: '11:00 AM - 03:00 PM',
        location: 'Auditorium Hall A & Labs',
        description: 'Interactive STEM exhibits, live robotics demos, and faculty evaluations.',
      },
      {
        id: 'ev-3',
        title: 'Inter-College Basketball & Athletic Meet',
        category: 'Sports',
        date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-16`,
        timeRange: '08:30 AM - 04:00 PM',
        location: 'College Sports Complex',
        description: 'Annual track, field, and court tournament with medal presentations.',
      },
      {
        id: 'ev-4',
        title: 'Parents-Teacher Academic Consultation',
        category: 'Academic',
        date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-20`,
        timeRange: '09:00 AM - 02:00 PM',
        location: 'Classroom Block 2',
        description: 'One-on-one parent conferences to discuss student progress and entrance preparation.',
      },
      {
        id: 'ev-5',
        title: 'National Democracy Day & College Holiday',
        category: 'Holiday',
        date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-24`,
        timeRange: 'All Day',
        location: 'Campus Closed',
        description: 'Official national holiday. Regular classes resume the following day.',
      },
      {
        id: 'ev-6',
        title: 'Cultural Festival & Music Night',
        category: 'Events',
        date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-28`,
        timeRange: '02:00 PM - 06:30 PM',
        location: 'Central Lawn & Amphitheater',
        description: 'Music club performances, drama club recitals, and cultural food stalls.',
      },
    ]

    return list.length >= 4 ? list : defaultList
  }, [rawEvents, currentYear, currentMonth])

  // Month navigation
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((y) => y - 1)
    } else {
      setCurrentMonth((m) => m - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((y) => y + 1)
    } else {
      setCurrentMonth((m) => m + 1)
    }
  }

  const goToToday = () => {
    setCurrentYear(today.getFullYear())
    setCurrentMonth(today.getMonth())
  }

  // Month metadata
  const monthName = new Date(currentYear, currentMonth, 1).toLocaleString('default', {
    month: 'long',
  })
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay() // 0 = Sun, 1 = Mon ...
  // Adjusted for Monday start (0 = Mon ... 6 = Sun)
  const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  // Generate calendar days
  const calendarCells = useMemo(() => {
    const cells = []
    // Leading empty cells
    for (let i = 0; i < startOffset; i++) {
      cells.push({ isCurrentMonth: false, dayNumber: null })
    }
    // Days of current month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(
        d
      ).padStart(2, '0')}`

      // Check if matches today
      const isToday =
        today.getFullYear() === currentYear &&
        today.getMonth() === currentMonth &&
        today.getDate() === d

      // Find events matching this day
      const dayEvents = calendarEvents.filter((ev) => {
        if (!ev.date) return false
        // Match either YYYY-MM-DD or partial
        return ev.date === dateStr || ev.date.endsWith(`-${String(d).padStart(2, '0')}`)
      })

      cells.push({
        isCurrentMonth: true,
        dayNumber: d,
        dateStr,
        isToday,
        events: dayEvents,
      })
    }
    return cells
  }, [currentYear, currentMonth, startOffset, daysInMonth, calendarEvents, today])

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedDateModal(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Open modal for selected date
  const handleDateClick = (cell) => {
    if (!cell.isCurrentMonth || !cell.dayNumber) return
    setSelectedDateModal({
      dayNumber: cell.dayNumber,
      monthName,
      year: currentYear,
      dateStr: cell.dateStr,
      events: cell.events || [],
    })
  }

  const handleGoogleCalendarSync = (event) => {
    const title = encodeURIComponent(event.title)
    const details = encodeURIComponent(event.description || 'Bright Future College Event')
    const location = encodeURIComponent(event.location || 'Satdobato, Lalitpur')
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`,
      '_blank'
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* =========================================================
       * MINIMAL CALENDAR HEADER
       * ========================================================= */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center shrink-0">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              {monthName} {currentYear}
            </h2>
            <p className="text-xs text-zinc-500">
              Click any date on the calendar to view scheduled events.
            </p>
          </div>
        </div>

        {/* Month Navigation & Today Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-3 py-1.5 rounded-lg border border-zinc-200 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer"
          >
            Today
          </button>
          <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-zinc-50 text-zinc-600 transition-colors cursor-pointer"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="w-px h-4 bg-zinc-200"></span>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-zinc-50 text-zinc-600 transition-colors cursor-pointer"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
       * CATEGORY FILTER CHIPS
       * ========================================================= */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        {['All', 'Examination', 'Academic', 'Sports', 'Events', 'Holiday'].map((cat) => {
          const isSelected = selectedCategory === cat
          const style = CATEGORY_STYLES[cat]
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors cursor-pointer text-xs font-medium ${
                isSelected
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {style && <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>}
              <span>{cat}</span>
            </button>
          )
        })}
      </div>

      {/* =========================================================
       * MINIMAL CALENDAR MONTH GRID
       * ========================================================= */}
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-zinc-200 bg-zinc-50/70 text-center text-xs font-semibold uppercase font-mono text-zinc-500 py-3">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>

        {/* Days Grid Cells */}
        <div className="grid grid-cols-7 divide-x divide-y divide-zinc-200 text-xs">
          {calendarCells.map((cell, idx) => {
            if (!cell.isCurrentMonth) {
              return (
                <div
                  key={idx}
                  className="min-h-[90px] sm:min-h-[110px] bg-zinc-50/30 p-2"
                />
              )
            }

            // Filter cell events if a category is selected
            const displayEvents =
              selectedCategory === 'All'
                ? cell.events
                : cell.events.filter((ev) => ev.category === selectedCategory)

            return (
              <div
                key={idx}
                onClick={() => handleDateClick(cell)}
                className={`min-h-[90px] sm:min-h-[110px] p-2 flex flex-col justify-between transition-colors cursor-pointer group ${
                  cell.isToday
                    ? 'bg-zinc-50/90 font-bold'
                    : 'bg-white hover:bg-zinc-50/80'
                }`}
              >
                {/* Date Number */}
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs transition-colors ${
                      cell.isToday
                        ? 'bg-zinc-950 text-white font-bold'
                        : 'text-zinc-700 group-hover:text-zinc-950 group-hover:font-bold'
                    }`}
                  >
                    {cell.dayNumber}
                  </span>
                  {displayEvents.length > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 group-hover:scale-125 transition-transform"></span>
                  )}
                </div>

                {/* Event Pills inside cell */}
                <div className="space-y-1 my-1 overflow-hidden">
                  {displayEvents.slice(0, 2).map((ev) => {
                    const style = CATEGORY_STYLES[ev.category] || CATEGORY_STYLES.Events
                    return (
                      <div
                        key={ev.id}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-medium truncate border ${style.chip}`}
                      >
                        {ev.title}
                      </div>
                    )
                  })}
                  {displayEvents.length > 2 && (
                    <div className="text-[10px] text-zinc-500 font-medium pl-1">
                      +{displayEvents.length - 2} more
                    </div>
                  )}
                </div>

                {/* Hover affordance */}
                <div className="text-[10px] text-zinc-400 group-hover:text-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity">
                  View events &rarr;
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* =========================================================
       * MINIMAL EVENT POP-UP ON DATE CLICK (As Requested)
       * ========================================================= */}
      {selectedDateModal && (
        <div
          onClick={() => setSelectedDateModal(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-zinc-200 space-y-4"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                  Events on Date
                </span>
                <h3 className="text-lg font-bold text-zinc-900">
                  {selectedDateModal.monthName} {selectedDateModal.dayNumber}, {selectedDateModal.year}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDateModal(null)}
                className="p-1.5 text-zinc-400 hover:text-zinc-800 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Event List for this Date */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
              {selectedDateModal.events && selectedDateModal.events.length > 0 ? (
                selectedDateModal.events.map((ev) => {
                  const style = CATEGORY_STYLES[ev.category] || CATEGORY_STYLES.Events
                  return (
                    <div
                      key={ev.id}
                      className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/90 space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${style.tag}`}
                        >
                          {ev.category}
                        </span>
                        <div className="text-xs font-mono text-zinc-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-zinc-400" />
                          <span>{ev.timeRange || 'All Day'}</span>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-zinc-900 leading-snug">
                        {ev.title}
                      </h4>

                      {ev.location && (
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                          <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                          <span>{ev.location}</span>
                        </div>
                      )}

                      {ev.description && (
                        <p className="text-xs text-zinc-600 leading-relaxed pt-1 border-t border-zinc-200/60">
                          {ev.description}
                        </p>
                      )}

                      <div className="pt-1 flex justify-end">
                        <button
                          onClick={() => handleGoogleCalendarSync(ev)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-700 hover:text-zinc-950 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Sync to Google Calendar</span>
                        </button>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="py-8 text-center text-zinc-500 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-medium">No events scheduled on this date.</div>
                  <p className="text-[11px] text-zinc-400 max-w-xs mx-auto">
                    Regular academic sessions and laboratory practicals proceed as usual.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Bottom Footer */}
            <div className="pt-3 border-t border-zinc-200 flex justify-end">
              <button
                onClick={() => setSelectedDateModal(null)}
                className="px-5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full text-xs font-semibold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
