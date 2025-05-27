const express = require('express');
const router = express.Router();
const axios = require('axios');

// Geocoding using Nominatim
router.get('/geocode', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }

    try {
        const encodedQuery = encodeURIComponent(query); // Encode the query to handle special characters
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${encodedQuery}&format=json`
        );

        if (response.data.length > 0) {
            res.json({
                latitude: response.data[0].lat,
                longitude: response.data[0].lon,
                displayName: response.data[0].display_name,
            });
        } else {
            res.status(404).json({ message: 'Location not found' });
        }
    } catch (err) {
        console.error('Error geocoding:', err);
        res.status(500).json({ message: 'Error geocoding' });
    }
});


// Wikipedia Place Details
// Wikipedia Place Details - Return only first 200 words
router.get('/wikipedia/:placeName', async (req, res) => {
    const { placeName } = req.params;

    try {
        const response = await axios.get(
            `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&explaintext=true&titles=${placeName}&origin=*`
        );

        const pages = response.data.query.pages;
        const pageId = Object.keys(pages)[0];

        if (pageId !== '-1') {
            const fullExtract = pages[pageId].extract;
            const words = fullExtract.split(' ').slice(0, 200).join(' '); // Get first 200 words
            res.json({
                title: pages[pageId].title,
                summary: words + '...',
            });
        } else {
            res.status(404).json({ message: 'Wikipedia page not found' });
        }
    } catch (err) {
        console.error('Error fetching Wikipedia data:', err);
        res.status(500).json({ message: 'Error fetching Wikipedia data' });
    }
});


module.exports = router;