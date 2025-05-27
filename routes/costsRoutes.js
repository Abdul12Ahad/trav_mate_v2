const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// Currency Conversion
router.get('/convert', async (req, res) => {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
        return res.status(400).json({ message: 'From, to, and amount parameters are required' });
    }

    try {
        const response = await axios.get(
            `https://api.exchangerate-api.com/v4/latest/${from}`
        );

        const rate = response.data.rates[to];
        if (rate) {
            res.json({ convertedAmount: amount * rate });
        } else {
            res.status(404).json({ message: 'Currency conversion rate not found' });
        }
    } catch (err) {
        console.error('Error converting currency:', err);
        res.status(500).json({ message: 'Error converting currency' });
    }
});

module.exports = router;