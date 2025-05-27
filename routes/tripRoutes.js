const express = require('express');
const Trip = require('../models/Trip');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/save', authMiddleware, async (req, res) => {
    try {
        let trip = new Trip({ ...req.body, user: req.user.userId });

        trip.accommodations.forEach(accommodation => {
            if (accommodation.price === "Price: N/A" || isNaN(accommodation.price)) {
                accommodation.price = null;
            } else {
                accommodation.price = parseFloat(accommodation.price);
            }
        });

        await trip.save();
        res.status(201).json({ message: 'Trip saved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save trip' });
    }
});

router.get('/saved', authMiddleware, async (req, res) => {
    try {
        const savedTrips = await Trip.find({ user: req.user.userId }).populate('user', '-password');
        res.status(200).json(savedTrips);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch saved trips' });
    }
});

router.get('/:tripId', authMiddleware, async (req, res) => {
    try {
        const trip = await Trip.findOne({ _id: req.params.tripId, user: req.user.userId });
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found or unauthorized' });
        }
        res.status(200).json(trip);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch trip details' });
    }
});
module.exports = router;