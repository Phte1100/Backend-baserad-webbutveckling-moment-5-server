const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
const authenticateToken = require('../middleware/authenticateToken');

// Hämta menu (kräver autentisering)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const menu = await Menu.find();
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Skapa en ny menu (kräver autentisering)
router.post('/', authenticateToken, async (req, res) => {
    const { name, phone, email, numberOfPeople, date, time } = req.body;
    const menu = new Menu({ name, phone, email, numberOfPeople, date, time });
    try {
        const newMenu = await menu.save();
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Uppdatera menu (kräver autentisering)
router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ta bort menu (kräver autentisering)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await Menu.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted Menu' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
