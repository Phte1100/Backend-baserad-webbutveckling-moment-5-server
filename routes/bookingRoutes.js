const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authenticateToken = require('../middleware/authenticateToken');

// Hämta alla bokningar (kräver autentisering)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Skapa en ny bokning (kräver inte autentisering)
router.post('/', async (req, res) => {
    const { name, phone, email, numberOfPeople, date, time } = req.body;
    const booking = new Booking({ name, phone, email, numberOfPeople, date, time });
    try {
        const newBooking = await booking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Uppdatera en bokning (kräver autentisering)
router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ta bort en bokning (kräver autentisering)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted Booking' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
