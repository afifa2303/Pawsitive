const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation'); 

// POST a new donation
router.post('/', async (req, res) => {
    try {
        const { donorName, amount, message } = req.body;

        if (!donorName || !amount) {
            return res.status(400).json({ error: 'Donor name and amount are required.' });
        }

        const newDonation = new Donation({ donorName, amount, message });
        await newDonation.save();
        res.status(201).json({ message: 'Thank you for your donation!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all donations
router.get('/', async (req, res) => {
    try {
        const donations = await Donation.find().sort({ donatedAt: -1 }); 
        res.json(donations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;