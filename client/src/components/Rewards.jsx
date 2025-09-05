import React, { useEffect, useState } from 'react'
import API from '../api'
export default function Rewards({ user }){
  const [users,setUsers]=useState([])
  useEffect(()=>{ API.get('/users').then(r=>setUsers(r.data)) }, [])
  const me = users.find(u=>u.id === user.id) || user
  return (
    <div className="max-w-3xl mx-auto bg-white p-4 rounded shadow">
      <h3 className="font-semibold">Rewards & Tokens</h3>
      <div className="mt-3">Your tokens: <strong>{me.tokens || 0}</strong></div>
      <div className="mt-4">Badges (mock):</div>
      <div className="flex gap-2 mt-2">
        <div className="p-2 border rounded">Trusted</div>
        <div className="p-2 border rounded">Top Bidder</div>
      </div>
    </div>
  )
}