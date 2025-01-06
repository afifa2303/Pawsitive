// **shop.html** (HTML for the Shop)
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Shop</title>
    <link rel="stylesheet" href="store.css">
</head>
<body>
    <h1>Cat Shop</h1>

    <div id="product-list" class="product-list"></div>

    <div class="cart">
        <h2>Your Cart</h2>
        <div id="cart-items" class="cart-items"></div>
        <h3>Total: $<span id="cart-total">0</span></h3>
    </div>

    <script src="store.js"></script>
</body>
</html>

// **store.css** (Styling for the Shop)
.product-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.product {
    border: 1px solid #ccc;
    padding: 10px;
    width: 200px;
}

.cart {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
}

.cart-item {
    border-bottom: 1px solid #ddd;
    padding: 5px 0;
}

// **store.js** (Frontend logic for the Shop)
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let cart = [];

// Fetch products from backend
fetch('/api/products')
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';

            productDiv.innerHTML = `
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <button onclick="addToCart('${product.productId}', '${product.name}', ${product.price})">Add to Cart</button>
            `;

            productList.appendChild(productDiv);
        });
    })
    .catch(err => console.error(err));

function addToCart(productId, name, price) {
    cart.push({ productId, name, price });
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';

        cartItemDiv.innerHTML = `<p>${item.name} - $${item.price}</p>`;
        cartItems.appendChild(cartItemDiv);

        total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
}

// **Backend API (Express.js)**
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new product (for sellers)
router.post('/products', async (req, res) => {
    const { productId, name, description, price } = req.body;
    const product = new Product({ productId, name, description, price });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

// **Product Model (Mongoose)**
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Product', productSchema);

// **Integration with Routes in the Main App (app.js)**
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');
const app = express();

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/cat-shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB')).catch(err => console.error(err));

// Routes
app.use('/api', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
