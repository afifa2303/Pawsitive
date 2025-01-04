// routes/pets.js

const express = require('express');
const multer = require('multer');  // Import Multer
const router = express.Router();
const Pet = require('../models/Pet');
const mongoose = require('mongoose');


// Configure Multer for storing files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');  // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;  // Unique filename
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Route to handle pet registration with image upload
router.post('/introduce', upload.single('petImage'), async (req, res) => {
  const { name, age, breed, gender, dietNutrition, healthWellness, uniqueCharacteristics, miscellaneous } = req.body;

  // Generate unique petId
  const petId = new mongoose.Types.ObjectId().toString();

  try {
    const newPet = new Pet({
      petId,
      name,
      age,
      breed,
      gender,
      dietNutrition,
      healthWellness,
      uniqueCharacteristics,
      miscellaneous,
      image: req.file.filename  // Store the filename of the uploaded image
    });

    await newPet.save();  // Save the pet with the image to the database
    res.status(201).json({ message: 'Pet registered successfully', pet: newPet });
  } catch (error) {
    res.status(400).json({ message: 'Error registering pet', error });
  }
});



// In pets.js
router.get('/all', async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.json(pets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch pet profiles' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const petId = req.params.id;
    const pet = await Pet.findOneAndDelete({ petId });
    if (!pet) return res.status(404).json({ error: 'Pet not found' });
    res.status(200).json({ message: 'Pet removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove pet' });
  }
});


module.exports = router;
