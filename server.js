const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import DB connection
const authMiddleware = require('./middlewares/authMiddleware'); // Import authentication middleware
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const petsRouter = require('./routes/pets');

const lostRoutes = require('./routes/lost');
const path = require('path');





  // Your pet model


// Serve pet-related routes


dotenv.config(); // Load environment variables
connectDB(); // Connect to the database



const app = express();

// Middleware to parse JSON
app.use(express.json());
const foundRoutes = require('./routes/found'); // Import found routes




// Use the found routes
app.use('/api/found', foundRoutes);

// Use the authRoutes for handling API authentication endpoints
app.use('/api/auth', authRoutes);
app.use('/api/pets', petsRouter);
app.use('/uploads', express.static('public/uploads'));
app.use('/introduce', express.static('public'));
app.use('/api/lost', lostRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));




// Protected route example
app.get('/api/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Access granted to protected route.', user: req.user });
  });




// Static file serving (for frontend assets like CSS, JS, etc.)
app.use(express.static('public'));
app.use(express.static('public/templates'));
app.use(express.static('public/uploads'));
app.use(express.static('public/js'));
app.use(express.static(path.join(__dirname, 'public')));


// Define the port to listen on, default to 3000 if not specified in environment
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
