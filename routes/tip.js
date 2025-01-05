const express = require('express');
const router = express.Router();

// API to fetch all tips (sample data)
router.get('/api/tips', (req, res) => {
    const tips = {
        health: ["Your cat is good.", "Keep your pets hydrated.", "Regular vet check-ups are important."],
        behavioral: ["Your rabbit is good.", "Train your pets with positive reinforcement.", "Understand your pets' body language."],
        nutritional: ["Your dog is good.", "Provide a balanced diet for your pets.", "Avoid overfeeding to prevent obesity."]
    };

    res.json(tips);
});

module.exports = router;
