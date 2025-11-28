// frontend/script.js
const API_BASE = window.location.origin; // server serves both API and frontend

const grid = document.getElementById('grid');
const searchInput = document.getElementById('searchInput');
const categoriesEl = document.getElementById('categories');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalImg = document.getElementById('modalImg');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

let items = [];
let activeCategory = 'all';

async function loadItems() {
  try {
    const resp = await fetch(`${API_BASE}/api/items`);
    items = await resp.json();
    renderItems(items);
  } catch (err) {
    console.error('Load items error', err);
  }
}

function renderItems(list) {
  grid.innerHTML = '';
  if (!list || list.length === 0) {
    grid.innerHTML = '<p style="width:100%;text-align:center;color:#075">No items found</p>';
    return;
  }
  list.forEach(it => {
    const card = document.createElement('div');
    card.className = 'card';

    // image
    const img = document.createElement('img');
    const imageVal = (it.image || '').toString().trim();
    let imgSrc = '/images/placeholder.png'; // fallback

    if (imageVal) {
      if (/^(https?:)?\/\//i.test(imageVal)) {
        imgSrc = imageVal;
      } else if (imageVal.startsWith('/')) {
        imgSrc = imageVal; // e.g. /images/x.png served by server
      } else if (imageVal.startsWith('images/')) {
        imgSrc = '/' + imageVal;
      } else {
        imgSrc = '/images/' + imageVal;
      }
    } else {
      imgSrc = '/images/placeholder.png';
    }
    img.src = imgSrc;
    img.alt = it.name;

    // card content
    const h = document.createElement('h3');
    h.textContent = it.name;

    const cat = document.createElement('p');
    cat.innerHTML = `<strong>Category:</strong> ${it.category || 'others'}`;

    const water = document.createElement('p');
    water.innerHTML = `<strong>Water:</strong> ${it.water || '-'} ${it.unit || 'L per kg'}`;

    const cal = document.createElement('p');
    cal.innerHTML = `<strong>Calories:</strong> ${it.calories || '-'}`;

    const prot = document.createElement('p');
    prot.innerHTML = `<strong>Proteins:</strong> ${it.proteins || '-'}`;

    const vit = document.createElement('p');
    vit.innerHTML = `<strong>Vitamins:</strong> ${it.vitamins || '-'}`;

    const tips = document.createElement('p');
    tips.style.fontStyle = 'italic';
    tips.textContent = it.tips || '';

    card.appendChild(img);
    card.appendChild(h);
    card.appendChild(cat);
    card.appendChild(water);
    card.appendChild(cal);
    card.appendChild(prot);
    card.appendChild(vit);
    card.appendChild(tips);

    card.addEventListener('click', () => openModal(it));
    grid.appendChild(card);
  });
}

function openModal(item) {
  modalTitle.textContent = item.name;
  const imageVal = (item.image || '').toString().trim();
  if (imageVal.startsWith('http') || imageVal.startsWith('/')) {
    modalImg.src = imageVal.startsWith('/') ? imageVal : imageVal;
  } else {
    modalImg.src = '/images/' + imageVal;
  }
  modalBody.innerHTML = `
    <p>Water Usage: ${item.water || '-'} ${item.unit || ''}</p>
    <p>Calories: ${item.calories || '-'}</p>
    <p>Proteins: ${item.proteins || '-'}</p>
    <p>Vitamins: ${item.vitamins || '-'}</p>
    <p style="font-weight:700;margin-top:10px">Tips: ${item.tips || '-'}</p>
  `;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
}

modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
});

// search
searchInput.addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase();
  const filtered = items.filter(it => {
    const matchesCategory = activeCategory === 'all' || (it.category || '').toLowerCase() === activeCategory;
    const matchesQuery = !q || (it.name || '').toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });
  renderItems(filtered);
});

// categories
categoriesEl.addEventListener('click', (e) => {
  if (!e.target.classList.contains('cat')) return;
  Array.from(categoriesEl.querySelectorAll('.cat')).forEach(b=>b.classList.remove('active'));
  e.target.classList.add('active');
  activeCategory = e.target.dataset.cat || 'all';
  const q = searchInput.value.trim().toLowerCase();
  const filtered = items.filter(it => {
    const matchesCategory = activeCategory === 'all' || (it.category || '').toLowerCase() === activeCategory;
    const matchesQuery = !q || (it.name || '').toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });
  renderItems(filtered);
});

// forms
document.getElementById('feedbackForm').addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const fd = new FormData(ev.target);
  const data = Object.fromEntries(fd.entries());
  try {
    const res = await fetch(`${API_BASE}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const j = await res.json();
    if (res.status === 201) {
      document.getElementById('feedbackMsg').textContent = 'Thanks — feedback submitted!';
      ev.target.reset();
    } else {
      document.getElementById('feedbackMsg').textContent = j.message || 'Error';
    }
  } catch (err) {
    document.getElementById('feedbackMsg').textContent = 'Network error';
  }
});

document.getElementById('requestForm').addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const fd = new FormData(ev.target);
  const data = Object.fromEntries(fd.entries());
  try {
    const res = await fetch(`${API_BASE}/api/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const j = await res.json();
    if (res.status === 201) {
      document.getElementById('requestMsg').textContent = 'Request submitted — thanks!';
      ev.target.reset();
    } else {
      document.getElementById('requestMsg').textContent = j.message || 'Error';
    }
  } catch (err) {
    document.getElementById('requestMsg').textContent = 'Network error';
  }
});

window.addEventListener('load', loadItems);
