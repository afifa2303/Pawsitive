// routes/lost.js
const express = require('express');
const multer = require('multer');  // Import Multer
const router = express.Router();
const LostPost = require('../models/LostPost');
const mongoose = require('mongoose');

// Configure Multer for storing files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/lost');  // Destination for lost pet images
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Route to create a new lost post
router.post('/create', upload.single('lostImage'), async (req, res) => {
    const { description } = req.body;
  
    try {
      const newPost = new LostPost({
        // Placeholder for `user` until authentication is added
        user: 'anonymous', 
        description,
        image: req.file.filename, // Store the filename of the uploaded image
      });
  
      await newPost.save(); // Save the post to the database
      res.status(201).json({ message: 'Lost post created successfully', post: newPost });
    } catch (error) {
      res.status(400).json({ message: 'Error creating lost post', error });
    }
  });
  

// Route to fetch all lost posts
router.get('/', async (req, res) => {
  try {
    const posts = await LostPost.find().populate('user', 'username');  // Populate user data
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lost posts' });
  }
});

// Route to delete a lost post
router.delete('/delete/:id', async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;  // Assuming user is authenticated

  try {
    const post = await LostPost.findOneAndDelete({ _id: postId, user: userId });
    if (!post) return res.status(404).json({ error: 'Post not found or not authorized' });
    res.status(200).json({ message: 'Lost post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;
