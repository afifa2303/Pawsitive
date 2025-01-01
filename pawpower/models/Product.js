const mongoose = require('mongoose');

// Define the Product schema
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    stock: { type: Number, default: 0 },
    image: { type: String }, 
    rating: { type: Number, default: 0 },
    reviews: [{ body: String, date: Date }],
});

module.exports = mongoose.model('Product', ProductSchema);