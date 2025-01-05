const express = require('express');
const FoundPost = require('../models/FoundPost');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/found'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route to create a new found post
router.post('/create', upload.single('foundImage'), async (req, res) => {
  const { description } = req.body;

  try {
    const newPost = new FoundPost({
      description,
      image: req.file.filename, // Store the filename of the uploaded image
    });

    await newPost.save(); // Save the post to the database
    res.status(201).json({ message: 'Found post created successfully', post: newPost });
  } catch (error) {
    res.status(400).json({ message: 'Error creating found post', error });
  }
});

// Route to fetch all found posts or search by description and sort
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

    const posts = await FoundPost.find(query).sort(sortOption);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch found posts' });
  }
});

module.exports = router;
