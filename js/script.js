// =========================
// PRODUCT DATA
// =========================
const products = [
    { id: 1, name: 'Premium PVC ID', category: 'ID Products', desc: 'Durable PVC ID card with full-color print.', material: 'PVC', sizes: 'Standard (86x54mm)', image: '🪪' },
    { id: 2, name: 'Kawaii Sticker Pack', category: 'Stickers', desc: 'Set of 10 cute waterproof stickers.', material: 'Vinyl', sizes: '3-5 cm', image: '🎨' },
    { id: 3, name: 'Custom T-Shirt', category: 'Apparel', desc: 'Soft cotton T-shirt with your design.', material: 'Cotton', sizes: 'S-2XL', image: '👕' },
    { id: 4, name: 'Ref Magnet', category: 'Souvenirs', desc: 'Custom keychain or magnet with photo.', material: 'Acrylic', sizes: '5x5 cm', image: '🎁' },
    { id: 5, name: 'Label Stickers', category: 'Labels', desc: 'Custom label stickers for jars, boxes.', material: 'Paper/Vinyl', sizes: 'various', image: '🏷️' },
    { id: 6, name: 'ID Lanyard', category: 'ID Products', desc: 'Colorful lanyard with ID holder.', material: 'Polyester', sizes: '45 cm', image: '🪪' },
    { id: 7, name: 'Floral Sticker Set', category: 'Stickers', desc: 'Beautiful floral sticker set.', material: 'Vinyl', sizes: '4-6 cm', image: '🎨' },
    { id: 8, name: 'Key Chain', category: 'Souvenirs', desc: 'Custom keychain or magnet with photo.', material: 'Acrylic', sizes: '5x5 cm', image: '🎁' },
    
];

// =========================
// DOM ELEMENTS
// =========================
const grid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const categoryBtns = document.querySelectorAll('.category-btn');
const modal = document.getElementById('productModal');
const closeModalBtn = document.getElementById('closeModal');
const modalImage = document.getElementById('modalImage');
const modalCategory = document.getElementById('modalCategory');
const modalName = document.getElementById('modalName');
const modalDescription = document.getElementById('modalDescription');
const modalMaterial = document.getElementById('modalMaterial');
const modalSizes = document.getElementById('modalSizes');
const darkBtn = document.getElementById('darkModeBtn');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

let currentCategory = 'All';

// =========================
// RENDER PRODUCTS
// =========================
function renderProducts(filter = '', category = 'All') {
    let filtered = products;
    if (category !== 'All') {
        filtered = filtered.filter(p => p.category === category);
    }
    if (filter.trim()) {
        const term = filter.trim().toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term)
        );
    }

    if (filtered.length === 0) {
        grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#9b7a70; padding:40px;">No products found 🌸</p>`;
        return;
    }

    grid.innerHTML = filtered.map(p => `
        <div class="product-card" data-id="${p.id}">
            <div class="product-image">
                <div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:70px;background:#fae9e4;color:#754e44;">${p.image || '🖨️'}</div>
            </div>
            <div class="product-info">
                <div class="product-category">${p.category}</div>
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
                <div class="product-bottom">
                    <button class="view-btn" data-id="${p.id}">View</button>
                </div>
            </div>
        </div>
    `).join('');

    // Attach view events
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = parseInt(this.dataset.id);
            const product = products.find(p => p.id === id);
            if (product) openModal(product);
        });
    });
}

// =========================
// MODAL FUNCTIONS
// =========================
function openModal(product) {
    modalImage.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23fae9e4"/%3E%3Ctext x="100" y="120" font-size="80" text-anchor="middle" fill="%23754e44"%3E' + encodeURIComponent(product.image || '🖨️') + '%3C/text%3E%3C/svg%3E';
    modalCategory.textContent = product.category;
    modalName.textContent = product.name;
    modalDescription.textContent = product.desc;
    modalMaterial.textContent = product.material || '—';
    modalSizes.textContent = product.sizes || '—';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// =========================
// EVENT LISTENERS
// =========================
// Search
searchInput.addEventListener('input', function() {
    renderProducts(this.value, currentCategory);
});

// Category buttons
categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        categoryBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentCategory = this.dataset.category;
        renderProducts(searchInput.value, currentCategory);
    });
});

// Modal close
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
});

// Escape key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Dark mode
darkBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    this.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Mobile menu
menuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        menuBtn.textContent = '☰';
    });
});

// Inquire button in modal
document.getElementById('inquireBtn').addEventListener('click', function() {
    const name = modalName.textContent;
    alert(`💬 Thank you for your interest in "${name}"!\n\nPlease contact us via Messenger or Facebook for pricing and orders.`);
    closeModal();
});

// =========================
// INIT
// =========================
renderProducts();