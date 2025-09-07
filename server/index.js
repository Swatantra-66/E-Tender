// const express = require('express');
// const cors = require('cors');
// const { readDB, writeDB, makeId } = require('./utils');
// const app = express();
// app.use(cors()); app.use(express.json());
// const PORT = process.env.PORT || 4000;
// app.get('/', (req, res) => res.send({ ok: true, msg: 'E-Tender API running' }));
// app.get('/projects', (req, res) => { const db = readDB(); res.send(db.projects); });
// app.post('/projects', (req, res) => {
//   const db = readDB(); const { title, description, budget, timeline, clientId } = req.body;
//   if (!title || !clientId) return res.status(400).send({ error: 'Missing fields' });
//   const project = { id: makeId('p_'), title, description, budget: budget || 0, timeline: timeline || '', clientId, status: 'open', createdAt: new Date().toISOString() };
//   db.projects.push(project);
//   db.ledger.push({ type: 'post_project', time: new Date().toISOString(), projectId: project.id, actor: clientId });
//   writeDB(db); res.send(project);
// });
// app.get('/projects/:id', (req, res) => { const db = readDB(); const p = db.projects.find(x => x.id === req.params.id); if (!p) return res.status(404).send({ error: 'Not found' }); const bids = db.bids.filter(b => b.projectId === p.id); res.send({ project: p, bids }); });
// app.post('/bids', (req, res) => {
//   const db = readDB(); const { projectId, builderId, amount, materials, duration } = req.body;
//   const project = db.projects.find(x => x.id === projectId);
//   if (!project || project.status !== 'open') return res.status(400).send({ error: 'Project not open' });
//   const bid = { id: makeId('b_'), projectId, builderId, amount: Number(amount), materials, duration, createdAt: new Date().toISOString() };
//   db.bids.push(bid);
//   db.ledger.push({ type: 'place_bid', time: new Date().toISOString(), bidId: bid.id, projectId, actor: builderId, amount: bid.amount });
//   writeDB(db); res.send(bid);
// });
// app.post('/projects/:id/select', (req, res) => {
//   const db = readDB(); const { bidId, clientId } = req.body; const project = db.projects.find(x => x.id === req.params.id);
//   if (!project) return res.status(404).send({ error: 'Project missing' }); if (project.clientId !== clientId) return res.status(403).send({ error: 'Not owner' });
//   const bid = db.bids.find(b => b.id === bidId && b.projectId === project.id); if (!bid) return res.status(404).send({ error: 'Bid not found' });
//   project.status = 'assigned'; project.winningBid = bidId; db.ledger.push({ type: 'select_bid', time: new Date().toISOString(), projectId: project.id, bidId, actor: clientId });
//   const builder = db.users.find(u => u.id === bid.builderId); if (builder) builder.tokens = (builder.tokens || 0) + 5;
//   writeDB(db); res.send({ project, bid });
// });
// app.post('/ratings', (req, res) => { const db = readDB(); const { projectId, builderId, clientId, rating, comment } = req.body; const r = { id: makeId('r_'), projectId, builderId, clientId, rating: Number(rating), comment, time: new Date().toISOString() }; db.ratings.push(r); db.ledger.push({ type: 'rating', time: new Date().toISOString(), projectId, actor: clientId, rating: r.rating }); writeDB(db); res.send(r); });
// app.post('/estimate', (req, res) => { const { description, sizeFactor } = req.body; const base = 20000; const estimate = Math.round(base * (sizeFactor || 1) * (1 + Math.random() * 0.2 - 0.1)); res.send({ estimate, currency: 'INR' }); });
// app.get('/ledger', (req, res) => { const db = readDB(); res.send(db.ledger); });
// app.get('/users', (req, res) => { const db = readDB(); res.send(db.users); });
// app.listen(PORT, () => console.log('E-Tender API listening on', PORT));



const bcrypt = require("bcrypt");

// Register endpoint
app.post("/users/register", async (req, res) => {
  const db = readDB();
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).send({ error: "All fields required" });
  }

  if (db.users.find((u) => u.email === email)) {
    return res.status(400).send({ error: "Email already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const newUser = {
    id: makeId("u_"),
    name,
    email,
    password: hashed,
    role, // "client" or "builder"
    tokens: 0,
  };

  db.users.push(newUser);
  writeDB(db);

  res.send({ id: newUser.id, name, email, role });
});

// Login endpoint
app.post("/users/login", async (req, res) => {
  const db = readDB();
  const { email, password } = req.body;

  const user = db.users.find((u) => u.email === email);
  if (!user) return res.status(400).send({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send({ error: "Invalid password" });

  res.send({ id: user.id, name: user.name, email: user.email, role: user.role, tokens: user.tokens });
});
