const mongoose = require('mongoose');

// Definierar schemat för en bokning
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
