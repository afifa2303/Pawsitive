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

// Fetch and display products
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
                    <button onclick="openPayNow(${product.price})">Pay Now</button>
                    <button>Add to Cart</button>
                `;
                productList.appendChild(productCard);
            });
        });
}

// Handle form submission to add a product
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

// Open Pay Now modal
function openPayNow(price) {
    currentProductPrice = price;
    selectedProductPrice.textContent = `Product Price: ${price} Tk`;
    totalPrice.textContent = price + 60; // Default delivery inside Dhaka
    payNowModal.classList.remove('hidden');

    document.querySelectorAll('input[name="delivery"]').forEach(input => {
        input.addEventListener('change', () => {
            totalPrice.textContent = currentProductPrice + parseInt(input.value);
        });
    });
}

// Close modal
closeModal.addEventListener('click', () => {
    payNowModal.classList.add('hidden');
});

// Confirm Payment (Add Logic Later)
confirmPayment.addEventListener('click', () => {
    alert('Payment confirmed!');
    payNowModal.classList.add('hidden');
});

// Filter, Sort, and Search
filterCategory.addEventListener('change', () => loadProducts(filterCategory.value, sortPrice.value, searchProduct.value));
sortPrice.addEventListener('change', () => loadProducts(filterCategory.value, sortPrice.value, searchProduct.value));
searchProduct.addEventListener('input', () => loadProducts(filterCategory.value, sortPrice.value, searchProduct.value));

// Load products on page load
loadProducts();
