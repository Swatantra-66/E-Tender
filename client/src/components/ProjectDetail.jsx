import React, { useEffect, useState } from 'react'
import API from '../api'
export default function ProjectDetail({ project, user }){
  const [data,setData]=useState({ project, bids: [] }); const [amount,setAmount]=useState(''); const [materials,setMaterials]=useState(''); const [duration,setDuration]=useState('')
  useEffect(()=>{ API.get('/projects/' + project.id).then(r=>setData(r.data)) }, [project])
  async function placeBid(){ if(user.type !== 'builder') return alert('Switch to builder to bid'); const res = await API.post('/bids', { projectId: project.id, builderId: user.id, amount: Number(amount), materials, duration }); alert('Bid placed: ' + res.data.id); setAmount(''); setMaterials(''); setDuration(''); const updated = await API.get('/projects/' + project.id); setData(updated.data) }
  async function selectBid(bidId){ if(user.type !== 'client') return alert('Only client can select'); const res = await API.post('/projects/' + project.id + '/select', { bidId, clientId: user.id }); alert('Bid selected. Builder rewarded.'); const updated = await API.get('/projects/' + project.id); setData(updated.data) }
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-semibold">{data.project.title}</h3>
      <p className="text-sm text-gray-600">{data.project.description}</p>
      <div className="mt-3">Budget: ₹{data.project.budget}</div>
      <hr className="my-3" />
      <div>
        <h4 className="font-medium mb-2">Bids</h4>
        {data.bids.length === 0 && <div className="text-sm text-gray-500">No bids yet.</div>}
        <div className="space-y-2">
          {data.bids.map(b=> (
            <div key={b.id} className="flex justify-between p-2 border rounded">
              <div>
                <div className="font-medium">₹{b.amount} • {b.duration}</div>
                <div className="text-sm text-gray-600">Materials: {b.materials}</div>
              </div>
              <div className="flex flex-col gap-2">
                {user.type === 'builder' && <div className="text-xs text-gray-500">Your bid</div>}
                {user.type === 'client' && <button onClick={()=>selectBid(b.id)} className="px-2 py-1 bg-green-600 text-white rounded">Select</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-3" />
      <div>
        <h4 className="font-medium">Place a Bid (builders)</h4>
        <input className="w-full border p-2 rounded mb-2" placeholder="Amount (INR)" value={amount} onChange={e=>setAmount(e.target.value)} />
        <input className="w-full border p-2 rounded mb-2" placeholder="Materials list" value={materials} onChange={e=>setMaterials(e.target.value)} />
        <input className="w-full border p-2 rounded mb-2" placeholder="Duration (e.g., 30 days)" value={duration} onChange={e=>setDuration(e.target.value)} />
        <div className="flex gap-2">
          <button onClick={placeBid} className="px-3 py-1 bg-indigo-600 text-white rounded">Place Bid</button>
        </div>
      </div>
    </div>
  )
}