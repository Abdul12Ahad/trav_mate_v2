const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String },
    region: { type: String },
    description: { type: String },
    image: { type: String }, // URL to image
    averageCostPerDay: { type: Number }, // Average cost per person per day
    popularActivities: [String],
    culturalHighlights: [String],
    latitude: { type: Number},
    longitude: { type: Number}
});

module.exports = mongoose.model('Destination', destinationSchema);