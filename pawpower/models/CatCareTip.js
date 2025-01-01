const mongoose = require('mongoose');

const CatCareTipSchema = new mongoose.Schema({
    breed: { type: String, required: true },
    tip: { type: String, required: true, maxlength: 100 },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CatCareTip', CatCareTipSchema);