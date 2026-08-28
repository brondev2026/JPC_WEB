// =========================
// PRODUCT DATA
// =========================

const products = [
    {
        id: 1,
        name: 'Sintra Trophies',
        category: 'Trophies',
        desc: 'High-quality custom trophies for any occasion.',
        material: 'Sintra',
        sizes: 'Various',
        images: [
            'images/trophy/trophy1.jpg',
            'images/trophy/trophy2.jpg',
            'images/trophy/trophy3.jpg'
        ]
    },

    {
        id: 2,
        name: 'Coming soon',
        category: 'Stickers',
        desc: 'Set of 10 cute waterproof stickers.',
        material: 'Vinyl',
        sizes: '3-5 cm',
        images: [
            'images/stickers.jpg',
            'images/stickers-2.jpg',
            'images/stickers-3.jpg'
        ]
    },

    {
        id: 3,
        name: 'Custom T-Shirt',
        category: 'Apparel',
        desc: 'Soft cotton T-shirt with your design.',
        material: 'Cotton',
        sizes: 'S-2XL',
        images: [
            'images/shirt/shirt1.jpg',
            'images/shirt/shirt2.jpg',
            'images/shirt/shirt3.jpg',
            'images/shirt/shirt4.jpg',
            'images/shirt/shirt5.jpg',
        ]
    },

    {
        id: 4,
        name: 'Ref Magnet',
        category: 'Souvenirs',
        desc: 'Custom keychain or magnet with photo.',
        material: 'Acrylic',
        sizes: '5x5 cm',
        images: [
            'images/refmagnet/refmagnet.jpg',
            'images/refmagnet/refmagnet2.jpg',
            'images/refmagnet/refmagnet3.jpg',
            'images/refmagnet/refmagnet4.jpg',
            'images/refmagnet/refmagnet5.jpg',
            'images/refmagnet/refmagnet6.jpg',
            'images/refmagnet/refmagnet7.jpg',
            'images/refmagnet/refmagnet8.jpg',
            'images/refmagnet/refmagnet9.jpg',
            'images/refmagnet/refmagnet10.jpg',
            'images/refmagnet/refmagnet11.jpg',
        ]
    },

    {
        id: 5,
        name: 'Label Stickers',
        category: 'Labels',
        desc: 'Custom label stickers for jars, boxes.',
        material: 'Paper/Vinyl',
        sizes: 'Various',
        images: [
            'images/labels.jpg',
            'images/labels-2.jpg',
            'images/labels-3.jpg'
        ]
    },

    {
        id: 6,
        name: 'ID Lanyard',
        category: 'ID Products',
        desc: 'Colorful lanyard with ID holder.',
        material: 'Polyester',
        sizes: '45 cm',
        images: [
            'images/lanyard.jpg',
            'images/lanyard-2.jpg',
            'images/lanyard-3.jpg'
        ]
    },

    {
        id: 7,
        name: 'Floral Sticker Set',
        category: 'Stickers',
        desc: 'Beautiful floral sticker set.',
        material: 'Vinyl',
        sizes: '4-6 cm',
        images: [
            'images/floral-stickers.jpg',
            'images/floral-stickers-2.jpg',
            'images/floral-stickers-3.jpg'
        ]
    },

    {
        id: 8,
        name: 'Key Chain',
        category: 'Souvenirs',
        desc: 'Custom keychain or magnet with photo.',
        material: 'Acrylic',
        sizes: '5x5 cm',
        images: [
            'images/keychain/keychain.jpg',
            'images/keychain/keychain2.jpg',
            'images/keychain/keychain3.jpg',
            'images/keychain/keychain4.jpg',
            'images/keychain/keychain5.jpg',
            'images/keychain/keychain6.jpg',
            'images/keychain/keychain7.jpg',
            'images/keychain/keychain8.jpg',
            'images/keychain/keychain9.jpg',
            'images/keychain/keychain10.jpg',
            'images/keychain/keychain11.jpg',
        ]
    },

        {
        id: 9,
        name: 'Premium PVC ID',
        category: 'ID Products',
        desc: 'Durable PVC ID card with full-color print.',
        material: 'PVC',
        sizes: 'Standard (86x54mm)',
        images: [
            'images/pvc-id.jpg',
            'images/pvc-id-2.jpg',
            'images/pvc-id-3.jpg'
        ]
    },
];



// =========================
// DOM ELEMENTS
// =========================

const grid = document.getElementById('productGrid');

const searchInput = document.getElementById('searchInput');

const categoryBtns = document.querySelectorAll('.category-btn');

const modal = document.getElementById('productModal');

const closeModalBtn = document.getElementById('closeModal');

const modalCategory = document.getElementById('modalCategory');

const modalName = document.getElementById('modalName');

const modalDescription = document.getElementById('modalDescription');

const modalMaterial = document.getElementById('modalMaterial');

const modalSizes = document.getElementById('modalSizes');

const darkBtn = document.getElementById('darkModeBtn');

const menuBtn = document.getElementById('menuBtn');

const navLinks = document.getElementById('navLinks');

const inquireBtn = document.getElementById('inquireBtn');

// Gallery elements
const galleryTrack = document.getElementById('galleryTrack');

const galleryDots = document.getElementById('galleryDots');

const galleryPrev = document.getElementById('galleryPrev');

const galleryNext = document.getElementById('galleryNext');


// =========================
// CURRENT CATEGORY
// =========================

let currentCategory = 'All';


// =========================
// GALLERY STATE
// =========================

let currentImages = [];

let currentImageIndex = 0;


// =========================
// RENDER PRODUCTS
// =========================

function renderProducts(filter = '', category = 'All') {

    let filtered = products;


    // Filter by category
    if (category !== 'All') {

        filtered = filtered.filter(product => {

            return product.category === category;

        });

    }


    // Filter by search
    if (filter.trim()) {

        const term = filter.trim().toLowerCase();

        filtered = filtered.filter(product => {

            return (
                product.name.toLowerCase().includes(term) ||
                product.category.toLowerCase().includes(term) ||
                product.desc.toLowerCase().includes(term)
            );

        });

    }


    // No products found
    if (filtered.length === 0) {

        grid.innerHTML = `
            <div class="no-products">
                <h3>No products found 🌸</h3>
                <p>Try searching for another product.</p>
            </div>
        `;

        return;

    }


    // Create product cards
    grid.innerHTML = filtered.map(product => {

        const thumbnail = product.images && product.images.length
            ? product.images[0]
            : 'images/JPC_logo.jpg';

        return `

            <div
                class="product-card"
                data-id="${product.id}"
            >

                <!-- PRODUCT IMAGE -->
                <div class="product-image">

                    <img
                        src="${thumbnail}"
                        alt="${product.name}"
                        loading="lazy"
                        onerror="this.src='images/JPC_logo.jpg'"
                    >

                </div>


                <!-- PRODUCT INFORMATION -->
                <div class="product-info">

                    <div class="product-category">
                        ${product.category}
                    </div>

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${product.desc}
                    </p>


                    <div class="product-bottom">

                        <button
                            class="view-btn"
                            data-id="${product.id}"
                            type="button"
                        >
                            View
                        </button>

                    </div>

                </div>

            </div>

        `;

    }).join('');


    // Add click events to View buttons
    document.querySelectorAll('.view-btn').forEach(button => {

        button.addEventListener('click', function(event) {

            event.stopPropagation();

            const id = parseInt(this.dataset.id);

            const product = products.find(item => item.id === id);

            if (product) {

                openModal(product);

            }

        });

    });


    // Make the entire card clickable
    document.querySelectorAll('.product-card').forEach(card => {

        card.addEventListener('click', function() {

            const id = parseInt(this.dataset.id);

            const product = products.find(item => item.id === id);

            if (product) {

                openModal(product);

            }

        });

    });

}


// =========================
// OPEN MODAL
// =========================

function openModal(product) {

    // Set up gallery images for this product
    currentImages = (product.images && product.images.length)
        ? product.images
        : ['images/JPC_logo.jpg'];

    currentImageIndex = 0;

    renderGallery();


    // Set product information
    modalCategory.textContent = product.category;

    modalName.textContent = product.name;

    modalDescription.textContent = product.desc;

    modalMaterial.textContent = product.material || '—';

    modalSizes.textContent = product.sizes || '—';


    // Show modal
    modal.classList.add('active');


    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

}


// =========================
// CLOSE MODAL
// =========================

function closeModal() {

    modal.classList.remove('active');

    document.body.style.overflow = '';

}


// =========================
// RENDER GALLERY
// =========================

function renderGallery() {

    // Build one slide per image
    galleryTrack.innerHTML = currentImages.map(src => {

        return `
            <div class="gallery-slide">
                <img
                    src="${src}"
                    alt="Product"
                    onerror="this.src='images/JPC_logo.jpg'"
                >
            </div>
        `;

    }).join('');


    // Reset position to current index (no animation on open)
    galleryTrack.style.transition = 'none';

    galleryTrack.style.transform = `translateX(-${currentImageIndex * 100}%)`;

    // Force reflow so the next transform change animates
    void galleryTrack.offsetWidth;

    galleryTrack.style.transition = '';


    // Build dots
    if (currentImages.length > 1) {

        galleryDots.innerHTML = currentImages.map((_, i) => {

            return `<span class="gallery-dot ${i === currentImageIndex ? 'active' : ''}" data-index="${i}"></span>`;

        }).join('');

        galleryDots.style.display = 'flex';

    } else {

        galleryDots.innerHTML = '';

        galleryDots.style.display = 'none';

    }


    // Hide arrows when there's only one image
    const showArrows = currentImages.length > 1;

    galleryPrev.style.display = showArrows ? 'flex' : 'none';

    galleryNext.style.display = showArrows ? 'flex' : 'none';

}


// =========================
// GO TO IMAGE (by index, wraps around)
// =========================

function goToImage(index) {

    const total = currentImages.length;

    if (total === 0) return;

    currentImageIndex = (index + total) % total;

    galleryTrack.style.transform = `translateX(-${currentImageIndex * 100}%)`;

    document.querySelectorAll('.gallery-dot').forEach((dot, i) => {

        dot.classList.toggle('active', i === currentImageIndex);

    });

}


// =========================
// GALLERY ARROW CLICKS
// =========================

galleryPrev.addEventListener('click', function(event) {

    event.stopPropagation();

    goToImage(currentImageIndex - 1);

});

galleryNext.addEventListener('click', function(event) {

    event.stopPropagation();

    goToImage(currentImageIndex + 1);

});


// =========================
// GALLERY DOT CLICKS
// =========================

galleryDots.addEventListener('click', function(event) {

    if (event.target.classList.contains('gallery-dot')) {

        goToImage(parseInt(event.target.dataset.index));

    }

});


// =========================
// KEYBOARD ARROWS (while modal open)
// =========================

document.addEventListener('keydown', function(event) {

    if (!modal.classList.contains('active')) return;

    if (event.key === 'ArrowLeft') {

        goToImage(currentImageIndex - 1);

    }

    if (event.key === 'ArrowRight') {

        goToImage(currentImageIndex + 1);

    }

});


// =========================
// TOUCH SWIPE SUPPORT (mobile)
// =========================

let touchStartX = 0;

let touchEndX = 0;

galleryTrack.addEventListener('touchstart', function(event) {

    touchStartX = event.changedTouches[0].screenX;

}, { passive: true });

galleryTrack.addEventListener('touchend', function(event) {

    touchEndX = event.changedTouches[0].screenX;

    handleSwipe();

}, { passive: true });

function handleSwipe() {

    const diff = touchStartX - touchEndX;

    const threshold = 40; // minimum swipe distance in px

    if (Math.abs(diff) < threshold) return;

    if (diff > 0) {

        // swiped left -> next image
        goToImage(currentImageIndex + 1);

    } else {

        // swiped right -> previous image
        goToImage(currentImageIndex - 1);

    }

}


// =========================
// SEARCH
// =========================

searchInput.addEventListener('input', function() {

    renderProducts(
        this.value,
        currentCategory
    );

});


// =========================
// CATEGORY BUTTONS
// =========================

categoryBtns.forEach(button => {

    button.addEventListener('click', function() {

        // Remove active class
        categoryBtns.forEach(btn => {

            btn.classList.remove('active');

        });


        // Add active class
        this.classList.add('active');


        // Update category
        currentCategory = this.dataset.category;


        // Render products
        renderProducts(
            searchInput.value,
            currentCategory
        );

    });

});


// =========================
// CLOSE MODAL BUTTON
// =========================

closeModalBtn.addEventListener('click', function() {

    closeModal();

});


// =========================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// =========================

modal.addEventListener('click', function(event) {

    if (event.target === modal) {

        closeModal();

    }

});


// =========================
// ESCAPE KEY
// =========================

document.addEventListener('keydown', function(event) {

    if (
        event.key === 'Escape' &&
        modal.classList.contains('active')
    ) {

        closeModal();

    }

});


// =========================
// DARK MODE
// =========================

darkBtn.addEventListener('click', function() {

    document.body.classList.toggle('dark');


    if (document.body.classList.contains('dark')) {

        this.textContent = '☀️';

    } else {

        this.textContent = '🌙';

    }

});


// =========================
// MOBILE MENU
// =========================

menuBtn.addEventListener('click', function() {

    navLinks.classList.toggle('active');


    if (navLinks.classList.contains('active')) {

        this.textContent = '✕';

    } else {

        this.textContent = '☰';

    }

});


// =========================
// CLOSE MOBILE MENU
// WHEN CLICKING A LINK
// =========================

document.querySelectorAll('.nav-links a').forEach(link => {

    link.addEventListener('click', function() {

        navLinks.classList.remove('active');

        menuBtn.textContent = '☰';

    });

});


// =========================
// INQUIRE BUTTON
// =========================

inquireBtn.addEventListener('click', function() {

    const name = modalName.textContent;


    alert(
        `💬 Thank you for your interest in "${name}"!\n\n` +
        `Please contact us via Messenger or Facebook ` +
        `for pricing and orders.`
    );


    closeModal();

});


// =========================
// INITIALIZE PRODUCTS
// =========================

renderProducts();