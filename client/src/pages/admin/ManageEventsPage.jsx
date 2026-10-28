import { useState } from 'react'
import { Calendar, Plus, MapPin, Trash2 } from 'lucide-react'

export default function ManageEventsPage() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Annual Sports & Athletic Meet',
      date: '2026-11-15',
      location: 'College Sports Ground',
      description: 'Track and field events, inter-house soccer tournaments, and medal ceremonies.',
    },
    {
      id: 2,
      title: 'Science & Robotics Symposium',
      date: '2026-11-28',
      location: 'Auditorium Hall A',
      description: 'Hands-on tech exhibits and project demonstrations by senior students.',
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manage Events</h2>
          <p className="text-sm text-slate-500">
            Schedule academic seminars, sports tournaments, and extracurricular dates.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-sm font-semibold shadow-xs cursor-pointer">
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                  <Calendar className="w-3.5 h-3.5" /> {ev.date}
                </span>
                <button
                  onClick={() => setEvents(events.filter((e) => e.id !== ev.id))}
                  className="text-slate-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-2">{ev.title}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5" /> {ev.location}
              </p>
              <p className="text-sm text-slate-600 mt-3">{ev.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
