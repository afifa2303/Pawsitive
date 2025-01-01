const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// POST a new donation
router.post('/', async (req, res) => {
    try {
        const { donorName, amount, category, message } = req.body;

        if (!donorName || !amount || !category) {
            return res.status(400).json({ error: 'Donor name, amount, and category are required.' });
        }

        const newDonation = new Donation({ donorName, amount, category, message });
        await newDonation.save();
        res.status(201).json({ message: 'Thank you for your donation!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// GET donation totals by category
router.get('/categories', async (req, res) => {
    try {
        const totals = await Donation.aggregate([
            { $group: { _id: '$category', totalAmount: { $sum: '$amount' } } }, // Group by category
        ]);

        res.json(totals); // Return grouped totals
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET donation progress
router.get('/progress', async (req, res) => {
    try {
        const donations = await Donation.find();
        const total = donations.reduce((sum, donation) => sum + donation.amount, 0);
        res.json({ total });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Export the router
module.exports = router;