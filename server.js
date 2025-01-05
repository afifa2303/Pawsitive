const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db'); // Database connection

// Import Routes
const authRoutes = require('./routes/authRoutes'); // User authentication routes
const petsRouter = require('./routes/pets'); // Generic pets-related routes
const lostRoutes = require('./routes/lost'); // Lost pets routes
const foundRoutes = require('./routes/found');
const tipRoutes = require('./routes/tip'); // Found pets routes


// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, 'uploads/lost');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}


// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define API routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/pets', petsRouter); // Pets-related routes
app.use('/api/lost', lostRoutes); // Lost pets routes
app.use('/api/found', foundRoutes); // Found pets routes
app.use(tipRoutes);

// Catch-all route for undefined API endpoints
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found.' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An unexpected error occurred.', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
