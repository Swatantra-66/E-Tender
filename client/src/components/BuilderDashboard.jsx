import React, { useEffect, useState } from 'react'
import API from '../api'
export default function BuilderDashboard({ user }){
  const [projects,setProjects]=useState([]); const [users,setUsers]=useState([])
  useEffect(()=>{ API.get('/projects').then(r=>setProjects(r.data)); API.get('/users').then(r=>setUsers(r.data)) }, [])
  const me = users.find(u=>u.id === user.id) || user
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4">
      <div className="p-4 bg-white rounded shadow">
        <h3 className="font-semibold">Builder Dashboard</h3>
        <div className="mt-2">Tokens: <strong>{me.tokens || 0}</strong></div>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h4 className="font-medium mb-2">Open Projects (to bid)</h4>
        <div className="space-y-2">
          {projects.map(p=> (
            <div key={p.id} className="p-2 border rounded flex justify-between">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-gray-600">Budget ₹{p.budget}</div>
              </div>
              <div>
                <button onClick={()=>alert('Switch to Browse to view and bid')} className="px-3 py-1 bg-indigo-600 text-white rounded">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}