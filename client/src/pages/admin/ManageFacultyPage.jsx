import { useState } from 'react'
import { Plus, Trash2, Mail, Phone } from 'lucide-react'

export default function ManageFacultyPage() {
  const [faculty, setFaculty] = useState([
    {
      id: '1',
      name: 'Dr. Ramesh Adhikari',
      designation: 'Principal & Head of Academics',
      department: 'Administration',
      email: 'principal@brightfuture.edu.np',
      phone: '+977 1-4XXXXXX',
    },
    {
      id: '2',
      name: 'Prof. Sunita Shrestha',
      designation: 'Senior Faculty & Coordinator',
      department: 'Science Department',
      email: 'sunita.s@brightfuture.edu.np',
      phone: '+977 1-4XXXXXX',
    },
  ])

  const handleDelete = (id) => {
    setFaculty(faculty.filter((f) => f.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">Manage Faculty Directory</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Academic heads and mentoring staff.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {faculty.map((member) => (
          <div key={member.id} className="bg-white rounded-2xl border border-zinc-200 p-5 space-y-3 relative">
            <button
              onClick={() => handleDelete(member.id)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-red-600 p-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500">{member.department}</span>
              <h3 className="text-sm font-bold text-zinc-900">{member.name}</h3>
              <p className="text-xs text-zinc-600 font-medium">{member.designation}</p>
            </div>
            <div className="text-xs text-zinc-400 space-y-1 pt-1 font-mono">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3" />
                <span>{member.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
