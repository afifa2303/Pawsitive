const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Validate email format
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Enforce minimum password length
  },
});

module.exports = mongoose.model('User', userSchema);
