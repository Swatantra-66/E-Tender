# 🏗️ E-Tender Platform

A transparent, smart & secure **online tendering system** built for hackathons.  
Clients can post projects, builders can place bids, and all actions are stored in a tamper-proof ledger.

---

## 🚀 Features
- 👤 **User Roles**: Client & Builder login flows  
- 📝 **Post Projects**: Clients define budget, materials, and timeline  
- 💰 **Place Bids**: Builders submit transparent bids visible to all  
- 🏆 **Rewards System**: Builders earn tokens for fair competition  
- 📊 **Ledger (Blockchain Simulation)**: Immutable audit log of all actions  
- 🎨 **Modern UI**: TailwindCSS + React for clean, responsive interface  

---

## 🛠️ Tech Stack
- **Frontend**: React + Vite + TailwindCSS (Deployed on Vercel)  
- **Backend**: Node.js + Express + JSON Database (Deployed on Render)  
- **Styling**: TailwindCSS  
- **Data**: JSON (db.json with sample demo data)  

---

## 📂 Project Structure
<pre> ## 📂 Project Structure ``` E-Tender/
  ├── client/ # Frontend (React + Vite)
  │ ├── src/ │ │ ├── components/ # UI Components (Home, Ledger, etc.)
  │ │ ├── App.jsx # Main React App
  │ │ └── api.js # Axios API client
  │ └── package.json
  │ ├── server/ # Backend (Express + JSON DB)
  │ ├── db.json # Demo data (projects, bids, users, ledger)
  │ └── index.js # Express server │ └── README.md ``` </pre>

---

## ⚡ Quick Start

### 1️⃣ Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/E-Tender.git
cd E-Tender
```

### 2️⃣ Backend (server)
```bash
cd server
npm install
node index.js
```
#### Runs on: https://e-tender-l0ed.onrender.com

### 3️⃣ Frontend (client)
```bash
cd client
npm install
npm run dev
```
#### Runs on: https://e-tender-theta.vercel.app/

### 🌍 Deployment
-> Frontend → Vercel
-> Backend → Render

-> Environment variable in Vercel:
```ini
VITE_API_BASE_URL = https://e-tender-l0ed.onrender.com
```

---

### 🎥 Demo Flow (3 min)

- **1️⃣ Login as Client**: Post project / see seeded demo project
- **2️⃣ Login as Builder**: Place bid on project
- **3️⃣ Browse Projects**:Show all bids transparently
- **4️⃣ Rewards Tab**:Show earned tokens for builder
- **5️⃣ Ledger**:Show blockchain-style audit log (audit trail of actions)

---

### ✨ Future Scope



