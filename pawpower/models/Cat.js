const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
    name: String,
    age: Number,
    breed: String,
    description: String,
    image: String,
    favorited: { type: Boolean, default: false }
});

module.exports = mongoose.model('Cat', CatSchema);