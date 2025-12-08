const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new Database(path.join(__dirname,'db.sqlite'));

// Serve static files for local testing (optional)
app.use('/assets', express.static(path.join(__dirname,'..','assets')));

app.get('/api/products', (req,res)=>{
  const rows = db.prepare('SELECT * FROM products').all();
  const parsed = rows.map(r=> ({...r, variants: JSON.parse(r.variants)}));
  res.json(parsed);
});

app.get('/api/products/:id', (req,res)=>{
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if(!row) return res.status(404).json({error:'Not found'});
  row.variants = JSON.parse(row.variants);
  res.json(row);
});

app.post('/api/orders', (req,res)=>{
  const {items, total} = req.body;
  if(!items || !total) return res.status(400).json({error:'Missing items or total'});
  const id = 'ORD'+Date.now();
  const stmt = db.prepare('INSERT INTO orders (id,items,total,created_at) VALUES (?,?,?,?)');
  stmt.run(id, JSON.stringify(items), Math.round(total), new Date().toISOString());
  res.json({ok:true, id});
});

app.get('/api/orders/:id', (req,res)=>{
  const row = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  if(!row) return res.status(404).json({error:'Not found'});
  row.items = JSON.parse(row.items);
  res.json(row);
});

app.post('/api/contact', (req,res)=>{
  const {name,email,message} = req.body;
  if(!name || !email || !message) return res.status(400).json({error:'Missing fields'});
  const stmt = db.prepare('INSERT INTO contacts (name,email,message,created_at) VALUES (?,?,?,?)');
  const info = stmt.run(name,email,message,new Date().toISOString());
  res.json({ok:true, id: info.lastInsertRowid});
});

const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log('Akunne API listening on', port));
