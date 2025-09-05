
import React from 'react'
export default function Nav({ setView, user, setUser }){
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold">E-Tender</div>
          <nav className="space-x-3">
            <button onClick={()=>setView('home')} className="px-3 py-1 rounded hover:bg-gray-100">Home</button>
            {user.type==='client' && <button onClick={()=>setView('post')} className="px-3 py-1 rounded hover:bg-gray-100">Post Project</button>}
            <button onClick={()=>setView('browse')} className="px-3 py-1 rounded hover:bg-gray-100">Browse Bids</button>
            {user.type==='builder' && <button onClick={()=>setView('builder')} className="px-3 py-1 rounded hover:bg-gray-100">Builder</button>}
            <button onClick={()=>setView('rewards')} className="px-3 py-1 rounded hover:bg-gray-100">Rewards</button>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <span>{user.name} • {user.type}</span>
          <button onClick={()=>setUser(null)} className="px-2 py-1 bg-red-500 text-white rounded">Logout</button>
        </div>
      </div>
    </header>
  )
}
