import { useState } from 'react'
import { Plus, Trash2, Calendar, MapPin } from 'lucide-react'

export default function ManageEventsPage() {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Annual Sports & Athletic Meet 2026',
      date: '2026-11-15',
      location: 'College Sports Ground',
      description: 'Track and field events, inter-house soccer tournaments, and medal ceremonies.',
    },
    {
      id: '2',
      title: 'Science & Robotics Symposium',
      date: '2026-11-28',
      location: 'Auditorium Hall A',
      description: 'Hands-on tech exhibits and project demonstrations by senior students.',
    },
  ])

  const handleDelete = (id) => {
    setEvents(events.filter((e) => e.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">Manage Events</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Organize upcoming academic symposia, competitions, and milestones.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((ev) => (
          <div key={ev.id} className="bg-white p-5 rounded-2xl border border-zinc-200 space-y-3 relative">
            <button
              onClick={() => handleDelete(ev.id)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-red-600 p-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                {ev.date}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                {ev.location}
              </span>
            </div>
            <h3 className="text-base font-bold text-zinc-900">{ev.title}</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">{ev.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
