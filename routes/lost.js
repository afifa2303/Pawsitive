const express = require('express');
const LostPost = require('../models/LostPost');

const router = express.Router();

// Route to fetch all lost posts or search by description and sort
router.get('/', async (req, res) => {
  const { q, sort } = req.query; // Get the search query and sort parameter

  try {
    let query = {};
    if (q) {
      query.description = { $regex: q, $options: 'i' }; // Case-insensitive search
    }

    let sortOption = {};
    if (sort === 'newest') {
      sortOption = { createdAt: -1 }; // Sort by newest first
    } else if (sort === 'oldest') {
      sortOption = { createdAt: 1 }; // Sort by oldest first
    }

    const posts = await LostPost.find(query).sort(sortOption);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lost posts' });
  }
});

// Route to create a new lost post
router.post('/create', async (req, res) => {
  const { description } = req.body;

  if (!description || !req.file) {
    return res.status(400).json({ error: 'Description and image are required' });
  }

  try {
    const newPost = new LostPost({
      description,
      image: req.file.filename,
    });

    await newPost.save();
    res.status(201).json({ message: 'Lost post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create lost post' });
  }
});

module.exports = router;
