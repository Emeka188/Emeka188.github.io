const apiBase = '/api';
let products = [];
let cart = [];

function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return document.querySelectorAll(sel); }

async function loadProducts(){
  const res = await fetch(apiBase + '/products');
  products = await res.json();
  renderProducts();
}

function renderProducts(){
  const el = qs('#products');
  el.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product';
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <div class="price">$${p.price.toFixed(2)}</div>
      <div>Stock: ${p.stock}</div>
      <div style="margin-top:8px"><button data-id="${p.id}">Add to cart</button></div>
    `;
    el.appendChild(card);
  });
  qsa('.product button').forEach(b => b.addEventListener('click', addToCartHandler));
}

function addToCartHandler(e){
  const id = Number(e.currentTarget.dataset.id);
  const p = products.find(x=>x.id===id);
  if(!p || p.stock<=0){ alert('Out of stock'); return; }
  const existing = cart.find(c=>c.id===id);
  if(existing) existing.qty++;
  else cart.push({ id:p.id, name:p.name, price:p.price, qty:1 });
  updateCartUI();
}

function updateCartUI(){
  qs('#cartCount').textContent = cart.reduce((s,i)=>s+i.qty,0);
}

qs('#cartBtn').addEventListener('click', ()=>{
  qs('#checkout').classList.toggle('hidden');
  renderCartItems();
});

function renderCartItems(){
  const el = qs('#cartItems');
  el.innerHTML = '';
  if(cart.length===0) el.textContent = 'Cart is empty';
  cart.forEach(it=>{
    const row = document.createElement('div');
    row.innerHTML = `${it.name} x ${it.qty} — $${(it.price*it.qty).toFixed(2)}`;
    el.appendChild(row);
  });
}

qs('#checkoutForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  if(cart.length===0){ alert('Cart empty'); return; }
  const fd = new FormData(e.currentTarget);
  const customer = { name: fd.get('name'), email: fd.get('email') };
  const items = cart.map(c=>({ id:c.id, qty:c.qty }));
  const res = await fetch(apiBase + '/orders', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ items, customer }) });
  if(!res.ok){ const err = await res.json(); alert('Order error: ' + (err.error||res.statusText)); return; }
  const order = await res.json();
  alert('Order placed! Order ID: ' + order.id);
  cart = []; updateCartUI(); renderCartItems();
});

qs('#contactForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const payload = { name: fd.get('name'), email: fd.get('email'), message: fd.get('message') };
  const res = await fetch(apiBase + '/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
  if(res.ok){ alert('Message sent — thank you!'); e.currentTarget.reset(); } else { alert('Failed to send'); }
});

// Initialize
loadProducts();
updateCartUI();
