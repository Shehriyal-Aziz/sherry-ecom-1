var MainImg = document.getElementById("MainImg");
var SmallImg = document.getElementsByClassName("small-img");

SmallImg[0].onclick = function () {
    MainImg.src = SmallImg[0].src;
}
SmallImg[1].onclick = function () {
    MainImg.src = SmallImg[1].src;
}
SmallImg[2].onclick = function () {
    MainImg.src = SmallImg[2].src;
}
SmallImg[3].onclick = function () {
    MainImg.src = SmallImg[3].src;
}

function increment() {
    const input = document.getElementById("qty");
    let value = parseInt(input.value);
    input.value = value + 1;
}

function decrement() {
    const input = document.getElementById("qty");
    let value = parseInt(input.value);
    if (value > 1) {
        input.value = value - 1;
    }
}


const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('productId'));

fetch('product.json')
    .then(res => res.json())
    .then(products => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        // Main image
        document.getElementById('MainImg').src = product.images[0];

        // Small images
        const smallGroup = document.querySelector('.small-img-group');
        smallGroup.innerHTML = product.images.map(img =>
            `<div class="small-img-col"><img src="${img}" class="small-img" width="100%"></div>`
        ).join('');

        // Product details
        document.querySelector('.single-pro-details h6').innerText = product.brand;
        document.querySelector('.single-pro-details h4').innerText = product.name;
        document.querySelector('.single-pro-details h2').innerText = `${product.price} PKR`;

        const ul = document.querySelector('.single-pro-details ul');
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


        // Enable image switching
        setTimeout(() => {
            const mainImg = document.getElementById('MainImg');
            document.querySelectorAll('.small-img').forEach(img =>
                img.addEventListener('click', () => mainImg.src = img.src)
            );
        }, 100);
    });



// when clicking the add to cart button in sproduct.html the item added to cart and open cart

// const urlParams = new URLSearchParams(window.location.search);
// const productId = parseInt(urlParams.get('productId'));

fetch('product.json')
    .then(res => res.json())
    .then(products => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        // Main image
        document.getElementById('MainImg').src = product.images[0];

        // Small images
        const smallGroup = document.querySelector('.small-img-group');
        smallGroup.innerHTML = product.images.map(img =>
            `<div class="small-img-col"><img src="${img}" class="small-img" width="100%"></div>`
        ).join('');

        // Product details
        document.querySelector('.single-pro-details h6').innerText = product.brand;
        document.querySelector('.single-pro-details h4').innerText = product.name;
        document.querySelector('.single-pro-details h2').innerText = `${product.price} PKR`;

        const ul = document.querySelector('.single-pro-details ul');
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

        // Enable image switching
        setTimeout(() => {
            const mainImg = document.getElementById('MainImg');
            document.querySelectorAll('.small-img').forEach(img =>
                img.addEventListener('click', () => mainImg.src = img.src)
            );
        }, 100);

        // 🔹 Add to Cart button logic
        const qtyInput = document.getElementById("qty");
        document.querySelector('.atc').addEventListener('click', () => {
            const qty = parseInt(qtyInput.value) || 1;

            // Clone product & add correct qty
            const productWithQty = { ...product };
            for (let i = 0; i < qty; i++) {
                addToCart(productWithQty);
            }

            openCartSidebar();
        });
    });
