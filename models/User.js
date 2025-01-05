const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 
  },
  password: {
    type: String,
    required: true,
    minlength: 6, 
  },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

module.exports = mongoose.model('User', userSchema);
