const express = require('express');
const mongoose = require('mongoose'); // Declare mongoose once
const bodyParser = require('body-parser');

const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'pawpower', 'public'))); // Serve static files

// MongoDB Connection
mongoose.connect('mongodb+srv://ft231411:demxov-jekha1-vybKyz@cluster0.nr6nt.mongodb.net/pawpower?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connected Successfully!'))
    .catch(err => console.error('MongoDB Connection Error:', err));


// Routes
const catRoutes = require('./pawpower/routes/cats');
app.use('/api/cats', catRoutes);


const resourceRoutes = require('./pawpower/routes/resources');
app.use('/api/resources', resourceRoutes);

const communityRoutes = require('./pawpower/routes/community');
app.use('/api/community', communityRoutes);

const adoptionRoutes = require('./pawpower/routes/adoptions');
app.use('/api/adoptions', adoptionRoutes);

const donationRoutes = require('./pawpower/routes/donations');
const storeRoutes = require('./pawpower/routes/store');

app.use('/api/donations', donationRoutes);
app.use('/api/store', storeRoutes);



const submitTipsRoutes = require('./pawpower/routes/submit-tips'); // Match the file name
app.use('/api/tips', submitTipsRoutes);


// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pawpower', 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});