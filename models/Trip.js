const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    destination: { type: String, required: true },
    budget: { type: Number, required: true },
    currency: { type: String, required: true },
    travelClass: { type: String, required: true },
    numTravelers: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    costPerPerson: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    accommodations: [{ name: String, address: String, price: { type: Number, default: null }, url: String }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;