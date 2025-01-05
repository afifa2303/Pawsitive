const mongoose = require('mongoose');

const foundPostSchema = new mongoose.Schema({
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

const FoundPost = mongoose.model('FoundPost', foundPostSchema);
module.exports = FoundPost;
