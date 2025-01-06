const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

// Get all products with filters, sorting, and search
router.get('/products', async (req, res) => {
    const { filter, sort, search } = req.query;
    let query = {};

    if (filter) query.category = filter;
    if (search) query.$or = [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }];

    let products = await Product.find(query);

    if (sort === 'asc') products = products.sort((a, b) => a.price - b.price);
    if (sort === 'desc') products = products.sort((a, b) => b.price - a.price);

    res.json(products);
});

// Add a new product
router.post('/products', upload.single('image'), async (req, res) => {
    const { name, description, price, category } = req.body;
    const image = `/uploads/${req.file.filename}`;
    const product = new Product({ name, description, price, image, category });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
