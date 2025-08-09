


// let cart = [];

// // Fetch products
// fetch('product.json')
//   .then(res => res.json())
//   .then(products => {
//     const container = document.getElementById('product-list');
//     container.innerHTML = products.map(product => `
//       <div class="pro">
//         <img src="${product.images[0]}" alt="${product.name}">
//         <div class="des">
//           <span>${product.brand}</span>
//           <h5>${product.name}</h5>
//           <div class="star">
//             <i class="fas fa-star"></i><i class="fas fa-star"></i>
//             <i class="fas fa-star"></i><i class="fas fa-star"></i>
//             <i class="fas fa-star"></i>
//           </div>
//           <h4>${product.price} PKR</h4>
//         </div>

//         <!-- Cart Icon -->
//         <button class="add-to-cart" data-id="${product.id}">
//           <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
//             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//               d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
//           </svg>
//         </button>
//       </div>
//     `).join('');

//     // Attach event listeners for cart buttons
//     document.querySelectorAll('.add-to-cart').forEach(btn => {
//       btn.addEventListener('click', (e) => {
//         e.stopPropagation();
//         const productId = btn.getAttribute('data-id');
//         const product = products.find(p => p.id == productId);
//         addToCart(product);
//       });
//     });
//   });

// // Add product to cart
// function addToCart(product) {
//   const existingItem = cart.find(item => item.id === product.id);
//   if (existingItem) {
//     existingItem.qty += 1;
//   } else {
//     cart.push({ ...product, qty: 1 });
//   }
//   updateCartUI();
//   openCartSidebar();
// }

// // Update cart sidebar and counter
// function updateCartUI() {
//   // Update counter
//   document.querySelector('#lg-bag span').textContent = cart.reduce((sum, item) => sum + item.qty, 0);

//   // Update sidebar content
//   const cartContent = document.querySelector('.cart-content');
//   if (cart.length === 0) {
//     cartContent.innerHTML = `<p>Your cart is empty</p>`;
//     return;
//   }

//   cartContent.innerHTML = cart.map(item => `
//     <div class="cart-item">
//       <img src="${item.images[0]}" width="50">
//       <div>
//         <h5>${item.name}</h5>
//         <p>${item.price} PKR</p>
//         <div class="qty-controls">
//           <button class="dec-qty" data-id="${item.id}">-</button>
//           <span>${item.qty}</span>
//           <button class="inc-qty" data-id="${item.id}">+</button>
//         </div>
//       </div>
//       <button class="remove-item" data-id="${item.id}">✕</button>
//     </div>
//   `).join('');

//   attachCartEvents();
// }

// // Attach events to quantity buttons and remove
// function attachCartEvents() {
//   document.querySelectorAll('.inc-qty').forEach(btn => {
//     btn.addEventListener('click', () => {
//       const id = btn.getAttribute('data-id');
//       const item = cart.find(i => i.id == id);
//       if (item) item.qty++;
//       updateCartUI();
//     });
//   });

//   document.querySelectorAll('.dec-qty').forEach(btn => {
//     btn.addEventListener('click', () => {
//       const id = btn.getAttribute('data-id');
//       const item = cart.find(i => i.id == id);
//       if (item && item.qty > 1) item.qty--;
//       else cart = cart.filter(i => i.id != id);
//       updateCartUI();
//     });
//   });

//   document.querySelectorAll('.remove-item').forEach(btn => {
//     btn.addEventListener('click', () => {
//       const id = btn.getAttribute('data-id');
//       cart = cart.filter(i => i.id != id);
//       updateCartUI();
//     });
//   });
// }

// // Open cart sidebar automatically
// function openCartSidebar() {
//   document.getElementById('cart-sidebar').classList.add('open');
//   document.getElementById('cart-overlay').classList.add('active');
// }

// // Close cart sidebar
// document.getElementById('close-cart').addEventListener('click', () => {
//   document.getElementById('cart-sidebar').classList.remove('open');
//   document.getElementById('cart-overlay').classList.remove('active');
// });
// document.getElementById('cart-overlay').addEventListener('click', () => {
//   document.getElementById('cart-sidebar').classList.remove('open');
//   document.getElementById('cart-overlay').classList.remove('active');
// });

