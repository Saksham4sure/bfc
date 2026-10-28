import { useState } from 'react'
import { Plus, Users, Mail, Phone, Trash2 } from 'lucide-react'

export default function ManageFacultyPage() {
  const [faculty, setFaculty] = useState([
    { id: 1, name: 'Dr. Ramesh Adhikari', designation: 'Principal & Head of Academics', department: 'Administration', email: 'principal@brightfuture.edu.np' },
    { id: 2, name: 'Prof. Sunita Shrestha', designation: 'Senior Faculty & Coordinator', department: 'Science Department', email: 'sunita.s@brightfuture.edu.np' },
    { id: 3, name: 'Bikram Thapa', designation: 'Program Coordinator', department: 'Management Department', email: 'b.thapa@brightfuture.edu.np' },
  ])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Faculty &amp; Staff Directory</h2>
          <p className="text-sm text-slate-500">
            Manage academic leadership and teaching staff profiles.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-sm font-semibold shadow-xs cursor-pointer">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {faculty.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
            <button
              onClick={() => setFaculty(faculty.filter((f) => f.id !== member.id))}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-600 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-lg mb-4">
              {member.name[0]}
            </div>
            <h3 className="font-bold text-slate-900 text-base">{member.name}</h3>
            <p className="text-xs font-medium text-slate-600 mt-0.5">{member.designation}</p>
            <p className="text-xs text-slate-400 mt-0.5">{member.department}</p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{member.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
