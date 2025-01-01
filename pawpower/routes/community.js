const express = require('express');
const Community = require('../models/Community'); // Community model
const router = express.Router();

// GET all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Community.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch community posts' });
    }
});

// POST a new post
router.post('/', async (req, res) => {
    try {
        const newPost = new Community(req.body);
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});

module.exports = router;