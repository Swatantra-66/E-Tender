import React, { useEffect, useState } from 'react'
import API from '../api'
import ProjectDetail from './ProjectDetail'
export default function BrowseProjects({ user }){
  const [projects,setProjects]=useState([]); const [selected,setSelected]=useState(null)
  useEffect(()=>{ API.get('/projects').then(r=>setProjects(r.data)) }, [])
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <h2 className="text-lg font-semibold mb-3">Open Projects</h2>
        <div className="space-y-3">
          {projects.map(p=> (
            <div key={p.id} className="p-3 bg-white rounded shadow flex justify-between">
              <div>
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-600">Budget: ₹{p.budget} • {p.timeline}</div>
              </div>
              <div>
                <button onClick={()=>setSelected(p)} className="px-3 py-1 bg-indigo-600 text-white rounded">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        {selected ? <ProjectDetail project={selected} user={user} /> : (<div className="p-4 bg-white rounded shadow">Select a project to see details</div>)}
      </div>
    </div>
  )
}