const express = require('express');
const router = express.Router();
const Cat = require('../models/Cat');

// GET all cats
router.get('/', async (req, res) => {
    try {
        const cats = await Cat.find();
        res.json(cats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new cat
router.post('/', async (req, res) => {
    try {
        const newCat = new Cat(req.body);
        await newCat.save();
        res.json(newCat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Bulk insert cats
router.post('/bulk', async (req, res) => {
    try {
        // Use insertMany to add multiple cats at once
        const newCats = await Cat.insertMany(req.body);
        res.status(201).json(newCats); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Toggle favorite status
router.put('/:id/favorite', async (req, res) => {
    try {
        const cat = await Cat.findById(req.params.id);
        cat.favorited = !cat.favorited;
        await cat.save();
        res.json(cat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

// GET all favorited cats
router.get('/favorites', async (req, res) => {
    try {
        const favorites = await Cat.find({ favorited: true }); 
        res.json(favorites); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});