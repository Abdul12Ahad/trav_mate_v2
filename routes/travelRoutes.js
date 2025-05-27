const express = require('express');
const router = express.Router();

// Dummy suggestions for now
const travelData = {
  manali: [
    { name: 'Hadimba Temple', cost: 200 },
    { name: 'Solang Valley', cost: 800 },
    { name: 'Mall Road', cost: 100 }
  ],
  goa: [
    { name: 'Baga Beach', cost: 0 },
    { name: 'Fort Aguada', cost: 100 },
    { name: 'Cruise Ride', cost: 1500 }
  ]
};

// POST /api/suggestions
router.post('/suggestions', (req, res) => {
  const { destination, budget } = req.body;

  if (!destination || !budget) {
    return res.status(400).json({ error: 'Destination and budget are required' });
  }

  const city = destination.toLowerCase();
  const suggestions = travelData[city] || [];

  // Filter places based on budget
  const filtered = suggestions.filter(place => place.cost <= budget);

  res.json({ destination, budget, places: filtered });
});

module.exports = router;
