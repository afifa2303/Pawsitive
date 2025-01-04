const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  petId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  breed: { type: String, required: true },
  gender: { type: String, required: true },
  dietNutrition: { type: String },
  healthWellness: { type: String },
  uniqueCharacteristics: { type: String },
  miscellaneous: { type: String },
  image: { type: String, required: true } // Added field for storing image path or URL
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;

