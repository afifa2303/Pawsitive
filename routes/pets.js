const express = require('express');
const multer = require('multer');  // Import Multer
const router = express.Router();
const Pet = require('../models/Pet');

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
router.post('/register', upload.single('petImage'), async (req, res) => {
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

module.exports = router;
