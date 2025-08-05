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
          <a href="cart.html"><img class="cart" src="assets/img/products/cart-shopping-solid-full.svg" alt=""></a>
        </div>
      `).join('');
    });