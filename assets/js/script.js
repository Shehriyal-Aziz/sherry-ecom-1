const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// Elements
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const openCartBtns = document.querySelectorAll("#lg-bag a, #mobile svg");
const closeCartBtn = document.getElementById("close-cart");

// Open Cart
openCartBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        cartSidebar.classList.add("active");
        cartOverlay.classList.add("active");
    });
});

// Close Cart
closeCartBtn.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
});

cartOverlay.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
});
// saved up


let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fetch and render products dynamically
fetch('product.json')
    .then(res => res.json())
    .then(products => {
        const shopContainer = document.getElementById('product-list');
        if (shopContainer) renderProducts(shopContainer, products);

        const featuredContainer = document.getElementById('featured-products');
        if (featuredContainer) {
            const top8 = products.slice(0, 8);
            renderProducts(featuredContainer, top8);
        }

        const newArrivalsContainer = document.getElementById('new-arrivals');
        if (newArrivalsContainer) {
            const last8 = products.slice(-8);
            renderProducts(newArrivalsContainer, last8);
        }
    });

function renderProducts(container, productArray) {
    container.innerHTML = productArray.map(product => `
        <div class="pro" data-id="${product.id}">
        <img src="${product.images[0]}" alt="${product.name}">
        <div class="des">
            <span>${product.brand}</span>
            <h5>${product.name}</h5>
            <div class="star">
            <i class="fas fa-star"></i><i class="fas fa-star"></i>
            <i class="fas fa-star"></i><i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            </div>
            <h4>${product.price} PKR</h4>
        </div>
        <button class="add-to-cart" data-id="${product.id}">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
            </svg>
        </button>
        </div>
    `).join('');

    container.querySelectorAll('.pro').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            window.location.href = `sproduct.html?productId=${id}`;
        });
    });

    container.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.getAttribute('data-id');
            fetch('product.json')
                .then(res => res.json())
                .then(allProducts => {
                    const product = allProducts.find(p => p.id == id);
                    addToCart(product);
                });
        });
    });
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function addToCart(product) {
    const priceNum = Number(product.price.replace(/,/g, ''));

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ ...product, price: priceNum, qty: 1 });
    }

    saveCart(); // ✅ Save to localStorage
    updateCartUI();
    openCartSidebar();
}



// Update cart UI
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const desktopCounter = document.querySelector('#lg-bag span');
    const mobileCounter = document.querySelector('#mobile span');

    if (desktopCounter) desktopCounter.textContent = totalItems;
    if (mobileCounter) mobileCounter.textContent = totalItems;

    const cartContent = document.querySelector('.cart-content');
    const cartFooter = document.querySelector('.cart-footer');

    if (!cartContent) return;

    if (cart.length === 0) {
        cartContent.innerHTML = `<p>Your cart is empty</p>`;
        if (cartFooter) {
            cartFooter.innerHTML = `<a href="cart.html" class="checkout-btn">Go to proceed</a>`;
        }
        saveCart(); // ✅ Clear in localStorage if empty
        return;
    }

cartContent.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.images[0]}" width="50">
            <div>
                <h5>${item.name}</h5>
                <p class="item-price">${item.price} PKR</p>
                <div class="qty-controls">
                    <button class="dec-qty" data-id="${item.id}">-</button>
                    <span class="quantity">${item.qty}</span>
                    <button class="inc-qty" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">✕</button>
        </div>
    `).join('');

    if (cartFooter) {
        cartFooter.innerHTML = `
            <div class="cart-total">Total: <strong>${totalPrice.toLocaleString()} PKR</strong></div>
            <a href="cart.html" class="checkout-btn">Go to proceed</a>
        `;
    }

    saveCart(); // ✅ Save updated cart
    attachCartEvents();
}

// Quantity & Remove Events
function attachCartEvents() {
    document.querySelectorAll('.inc-qty').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const item = cart.find(i => i.id == id);
            if (item) item.qty++;
            updateCartUI();
        });
    });

    document.querySelectorAll('.dec-qty').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const item = cart.find(i => i.id == id);
            if (item && item.qty > 1) item.qty--;
            else cart = cart.filter(i => i.id != id);
            updateCartUI();
        });
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            cart = cart.filter(i => i.id != id);
            updateCartUI();
        });
    });
}

// ==================== LOAD CART ON PAGE LOAD ====================
document.addEventListener("DOMContentLoaded", () => {
    updateCartUI(); // ✅ Render saved cart on load
});

function openCartSidebar() {
    document.getElementById('cart-sidebar').classList.add('open');
    document.getElementById('cart-overlay').classList.add('active');
}

document.getElementById('close-cart')?.addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('active');
});

document.getElementById('cart-overlay')?.addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('active');
});


















