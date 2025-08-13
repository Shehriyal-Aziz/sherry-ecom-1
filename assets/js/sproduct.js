

    
// ----------------------
// Get productId from URL
// ----------------------
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('productId'), 10) || null;

// ----------------------
// Quantity controls
// ----------------------
function increment() {
    const input = document.getElementById("qty");
    if (input) input.value = parseInt(input.value) + 1;
}

function decrement() {
    const input = document.getElementById("qty");
    if (input) {
        let value = parseInt(input.value);
        if (value > 1) input.value = value - 1;
    }
}

// ----------------------
// Fetch all products ONCE
// ----------------------
fetch('product.json')
    .then(res => res.json())
    .then(products => {
        // Render sliders if containers exist
        const shopContainer = document.getElementById('product-list');
        if (shopContainer) renderProducts(shopContainer, products);

        const featuredContainer = document.getElementById('featured-products');
        if (featuredContainer) {
            renderProducts(featuredContainer, products.slice(0, 8), true);
            initSlider(featuredContainer.closest('.swiper'));
        }

        const newArrivalsContainer = document.getElementById('new-arrivals');
        if (newArrivalsContainer) {
            renderProducts(newArrivalsContainer, products.slice(-8), true);
            initSlider(newArrivalsContainer.closest('.swiper'));
        }

        // Render single product details if on sproduct.html
        if (productId) renderSingleProduct(products, productId);
    });

// ----------------------
// Render functions
// ----------------------
function renderProducts(container, productArray, isSlider = false) {
    container.innerHTML = productArray.map(product => `
        <div class="${isSlider ? 'swiper-slide' : ''} pro" data-id="${product.id}">
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
                🛒
            </button>
        </div>
    `).join('');

    // Product detail page link
    container.querySelectorAll('.pro').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            window.location.href = `sproduct.html?productId=${id}`;
        });
    });

    // Add to cart button
    container.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.getAttribute('data-id');
            const product = allProducts.find(p => p.id == id);
            if (product) addToCart(product);
        });
    });
}

function renderSingleProduct(products, id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    // Main image
    const mainImg = document.getElementById('MainImg');
    if (mainImg) mainImg.src = product.images[0];

    // Small images
    const smallGroup = document.querySelector('.small-img-group');
    if (smallGroup) {
        smallGroup.innerHTML = product.images.map(img =>
            `<div class="small-img-col"><img src="${img}" class="small-img" width="100%"></div>`
        ).join('');

        smallGroup.querySelectorAll('.small-img').forEach(img =>
            img.addEventListener('click', () => {
                if (mainImg) mainImg.src = img.src;
            })
        );
    }

    // Product details
    const brandElem = document.querySelector('.single-pro-details h6');
    if (brandElem) brandElem.innerText = product.brand;

    const nameElem = document.querySelector('.single-pro-details h4');
    if (nameElem) nameElem.innerText = product.name;

    const priceElem = document.querySelector('.single-pro-details h2');
    if (priceElem) priceElem.innerText = `${product.price} PKR`;

    const ul = document.querySelector('.single-pro-details ul');
    if (ul) {
        const desc = product.description;
        ul.innerHTML = `
            <li><strong>Shirt</strong></li>
            ${desc.Shirt.map(d => `<li>${d}</li>`).join('')}
            <br>
            <li><strong>Dupatta</strong></li>
            ${desc.Dupatta.map(d => `<li>${d}</li>`).join('')}
            <br>
            <li><strong>Trouser</strong></li>
            ${desc.Trouser.map(d => `<li>${d}</li>`).join('')}
            <br>
            <li><strong>Other Details</strong></li>
            ${desc["Other Details"].map(d => `<li>${d}</li>`).join('')}
        `;
    }

    // Add to Cart button logic
    const qtyInput = document.getElementById("qty");
    const atcBtn = document.querySelector('.atc');
    if (qtyInput && atcBtn) {
        atcBtn.addEventListener('click', () => {
            const qty = parseInt(qtyInput.value) || 1;
            for (let i = 0; i < qty; i++) {
                addToCart({ ...product });
            }
            openCartSidebar();
        });
    }
}

// ----------------------
// Swiper init
// ----------------------
function initSlider(swiperElement) {
    if (!swiperElement) return;
    new Swiper(swiperElement, {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
            nextEl: swiperElement.querySelector('.swiper-button-next'),
            prevEl: swiperElement.querySelector('.swiper-button-prev'),
        },
        breakpoints: {
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
        },
    });
}
