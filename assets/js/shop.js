fetch('product.json')
    .then(res => res.json())
    .then(products => {
      const container = document.getElementById('product-list');
      container.innerHTML = products.map(product => `
        <div class="pro" onclick="location.href='sproduct.html?productId=${product.id}'">
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

          <a href="#">
            <svg class="w-6 h-6 text-gray-800 dark:text-white cart " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
            </svg>
          </a>
        </div>
      `).join('');
    });


