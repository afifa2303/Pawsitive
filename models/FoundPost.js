// models/FoundPost.js
const mongoose = require('mongoose');

const foundPostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Reference to the user who posted
  },
  description: {
    type: String,
    required: true,
    maxlength: 100, // Limit to 100 characters
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set created date
  },
});

const FoundPost = mongoose.model('FoundPost', foundPostSchema);

module.exports = FoundPost;
