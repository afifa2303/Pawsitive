const express = require('express');
const router = express.Router();
const Adoption = require('../models/Adoption'); 

// POST route to handle adoption applications
router.post('/', async (req, res) => {
    try {
        const { applicantName, applicantEmail, selectedCat } = req.body;

        
        if (!applicantName || !applicantEmail || !selectedCat) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Create a new adoption document
        const newApplication = new Adoption({
            name: applicantName.trim(),
            email: applicantEmail.trim(),
            catName: selectedCat.trim(),
        });

        
        await newApplication.save();

        res.status(201).json({ message: 'Application submitted successfully!' });
    } catch (error) {
        console.error('Error submitting adoption application:', error);

        
        res.status(500).json({ error: 'Failed to submit application. Please try again later.' });
    }
});


router.get('/', async (req, res) => {
    try {
        const applications = await Adoption.find(); 
        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching adoption applications:', error);
        res.status(500).json({ error: 'Failed to fetch applications.' });
    }
});

module.exports = router; // Ensure the router is exported properly