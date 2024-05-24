const mongoose = require('mongoose');

// Definierar schemat för menypost
const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
