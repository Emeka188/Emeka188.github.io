const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory store (replace with DB for production)
const products = [
  { id: 1, name: 'Akunne Perfume - Signature', price: 12.99, description: 'Long-lasting fragrance', stock: 25 },
  { id: 2, name: 'Akunne Roll-On - Fresh', price: 6.5, description: 'Compact roll-on for daily use', stock: 40 },
  { id: 3, name: 'Akunne Gift Pack', price: 25.0, description: 'Perfume + Roll-on set', stock: 10 }
];

const orders = [];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const p = products.find(x => x.id === id);
  if (!p) return res.status(404).json({ error: 'Product not found' });
  res.json(p);
});

app.post('/api/orders', (req, res) => {
  const { items, customer } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'No items' });
  // simple order total
  let total = 0;
  for (const it of items) {
    const p = products.find(x => x.id === it.id);
    if (!p) return res.status(400).json({ error: `Product ${it.id} not found` });
    if (p.stock < it.qty) return res.status(400).json({ error: `Not enough stock for ${p.name}` });
    total += p.price * it.qty;
    p.stock -= it.qty; // reduce stock
  }
  const order = { id: orders.length + 1, items, customer, total, created: new Date() };
  orders.push(order);
  res.json(order);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });
  console.log('Contact message:', { name, email, message });
  // In a real app you'd send an email or store in DB
  res.json({ status: 'ok' });
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.listen(PORT, () => console.log(`Akunne Cosmetics API running on http://localhost:${PORT}`));
