import React, { useState } from 'react'
import API from '../api'
export default function PostProject({ user }){
  const [title,setTitle]=useState(''); const [desc,setDesc]=useState(''); const [budget,setBudget]=useState(''); const [timeline,setTimeline]=useState(''); const [est,setEst]=useState(null)
  async function handleEstimate(){ const res = await API.post('/estimate', { description: desc, sizeFactor: (budget?budget/20000:1) }); setEst(res.data.estimate) }
  async function handlePost(){ const res = await API.post('/projects', { title, description: desc, budget: Number(budget), timeline, clientId: user.id }); alert('Project posted: ' + res.data.id); setTitle(''); setDesc(''); setBudget(''); setTimeline(''); setEst(null) }
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Post a Project</h2>
      <label className="block mb-2">Title<input className="w-full border p-2 rounded" value={title} onChange={e=>setTitle(e.target.value)} /></label>
      <label className="block mb-2">Description<textarea className="w-full border p-2 rounded" value={desc} onChange={e=>setDesc(e.target.value)} /></label>
      <label className="block mb-2">Budget (INR)<input type="number" className="w-full border p-2 rounded" value={budget} onChange={e=>setBudget(e.target.value)} /></label>
      <label className="block mb-4">Timeline<input className="w-full border p-2 rounded" value={timeline} onChange={e=>setTimeline(e.target.value)} /></label>
      <div className="flex gap-2">
        <button onClick={handleEstimate} className="px-4 py-2 bg-indigo-600 text-white rounded">Estimate Cost</button>
        <button onClick={handlePost} className="px-4 py-2 bg-green-600 text-white rounded">Post Project</button>
      </div>
      {est && <div className="mt-4 p-3 bg-gray-50 border rounded">AI Estimate: <strong>₹{est}</strong></div>}
    </div>
  )
}