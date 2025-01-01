const express = require('express');
const router = express.Router();
const CatCareTip = require('../models/CatCareTip');

// POST a new tip
router.post('/', async (req, res) => {
    const { breed, tip } = req.body;

    if (!breed || !tip) {
        return res.status(400).json({ error: 'Breed and Tip are required.' });
    }

    try {
        const newTip = new CatCareTip({ breed, tip });
        await newTip.save(); 
        res.status(201).json({ message: 'Tip submitted successfully!', newTip });
    } catch (error) {
        console.error('Error saving tip:', error);
        res.status(500).json({ error: 'Failed to save the tip.' });
    }
});

module.exports = router;