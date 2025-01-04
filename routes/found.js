// routes/found.js
const express = require('express');
const multer = require('multer');  // Import Multer
const router = express.Router();
const FoundPost = require('../models/FoundPost');
const mongoose = require('mongoose');

// Configure Multer for storing files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/found');  // Destination for found pet images
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Route to create a new found post
router.post('/create', upload.single('foundImage'), async (req, res) => {
  const { description } = req.body;
  const userId = req.user.id;  // Assuming user is authenticated

  try {
    const newPost = new FoundPost({
      user: userId,
      description,
      image: req.file.filename,  // Store the filename of the uploaded image
    });

    await newPost.save();  // Save the post to the database
    res.status(201).json({ message: 'Found post created successfully', post: newPost });
  } catch (error) {
    res.status(400).json({ message: 'Error creating found post', error });
  }
});

// Route to fetch all found posts
router.get('/', async (req, res) => {
  try {
    const posts = await FoundPost.find().populate('user', 'username');  // Populate user data
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch found posts' });
  }
});

module.exports = router;
