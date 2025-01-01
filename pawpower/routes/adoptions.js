const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the Adoption schema
const AdoptionSchema = new mongoose.Schema({
    name: String,
    email: String,
    selectedCat: String,
    submittedAt: { type: Date, default: Date.now }
});

// Create the Adoption model
const Adoption = mongoose.model('Adoption', AdoptionSchema);

// POST route for submitting an application
router.post('/', async (req, res) => {
    try {
        const newApplication = new Adoption(req.body);
        await newApplication.save();
        res.status(201).json(newApplication); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;