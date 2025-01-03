const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController'); // Adjust this based on your controller functions


// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

module.exports = router;
