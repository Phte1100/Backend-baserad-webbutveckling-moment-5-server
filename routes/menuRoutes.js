const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const authenticateToken = require('../middleware/authenticateToken')

// Hämta alla menyposter
router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Hämta en enskild menypost
router.get('/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Skapa en ny menypost
router.post('/', authenticateToken, async (req, res) => {
    const { name, description, price, category } = req.body;
    const menuItem = new MenuItem({ name, description, price, category });
    try {
        const newMenuItem = await menuItem.save();
        res.status(201).json(newMenuItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Uppdatera en menypost
router.put('/:id', async (req, res) => {
    try {
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMenuItem) return res.status(404).json({ message: 'Menu not found' });
        res.json(updatedMenuItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ta bort en menypost
router.delete('/:id', async (req, res) => {
    try {
        await MenuItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted Menu item' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
