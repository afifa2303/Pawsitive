const mongoose = require('mongoose');

const lostPostSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    maxlength: 100,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const LostPost = mongoose.model('LostPost', lostPostSchema);
module.exports = LostPost;
