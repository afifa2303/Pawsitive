const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // Store the image file path or URL
    category: { type: String, required: true, enum: ['food', 'toy', 'litter'] }, // New category field
});

module.exports = mongoose.model('Product', productSchema);
