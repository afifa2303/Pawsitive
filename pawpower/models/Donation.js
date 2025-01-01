const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    donorName: { type: String, required: true },
    amount: { type: Number, required: true },
    message: { type: String },
    category: { type: String, required: true },
    donatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', DonationSchema);