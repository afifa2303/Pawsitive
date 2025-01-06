const productForm = document.getElementById('product-form');
const productList = document.getElementById('product-list');
const payNowModal = document.getElementById('pay-now-modal');
const selectedProductPrice = document.getElementById('selected-product-price');
const totalPrice = document.getElementById('total-price');
const closeModal = document.getElementById('close-modal');
const confirmPayment = document.getElementById('confirm-payment');

const filterCategory = document.getElementById('filter-category');
const sortPrice = document.getElementById('sort-price');
const searchProduct = document.getElementById('search-product');

let currentProductPrice = 0;


function loadProducts(filter = '', sort = '', search = '') {
    fetch(`/api/shops/products?filter=${filter}&sort=${sort}&search=${search}`)
        .then(response => response.json())
        .then(products => {
            productList.innerHTML = '';
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" />
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Category: ${product.category}</p>
                    <p>Price: ${product.price} Tk</p>
                    <button onclick="openPayNow(${product.price})">Buy Now</button>
                    <button onclick="handleAddToCart('${product._id}', '${product.name}', ${product.price})">Add to Cart</button>
                `;
                productList.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}



productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('product-name').value);
    formData.append('description', document.getElementById('product-description').value);
    formData.append('price', document.getElementById('product-price').value);
    formData.append('category', document.getElementById('product-category').value);
    formData.append('image', document.getElementById('product-image').files[0]);

    await fetch('/api/shops/products', {
        method: 'POST',
        body: formData,
    });

    loadProducts();
    productForm.reset();
});


function openPayNow(price) {
    currentProductPrice = price;
    selectedProductPrice.textContent = `Product Price: ${price} Tk`;
    totalPrice.textContent = price + 60; 
    payNowModal.classList.remove('hidden');

    document.querySelectorAll('input[name="delivery"]').forEach(input => {
        input.addEventListener('change', () => {
            totalPrice.textContent = currentProductPrice + parseInt(input.value);
        });
    });
}


closeModal.addEventListener('click', () => {
    payNowModal.classList.add('hidden');
});


confirmPayment.addEventListener('click', () => {
    alert('SSL Commerz or onno kono payment option e niye jabe. Integrate kora hoini.');
    payNowModal.classList.add('hidden');
});


filterCategory.addEventListener('change', () => loadProducts(filterCategory.value, sortPrice.value, searchProduct.value));
sortPrice.addEventListener('change', () => loadProducts(filterCategory.value, sortPrice.value, searchProduct.value));
searchProduct.addEventListener('input', () => loadProducts(filterCategory.value, sortPrice.value, searchProduct.value));

function handleAddToCart(productId, productName, productPrice, productImage) {    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    
    cart.push({ id: productId, name: productName, price: productPrice, image: productImage });

    
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${productName} has been added to your cart!`);
}



document.getElementById('view-cart-button').addEventListener('click', () => {
    window.location.href = 'cart.html';
});

loadProducts();
