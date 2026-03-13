const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  type: { type: String, enum: ['EV', 'Hybrid', 'ICE', 'PHEV'], required: true },
  segment: { type: String, enum: ['Sedan', 'SUV', 'Hatchback', 'Truck', 'Van'], default: 'Sedan' },
  emissions: {
    manufacturing: { type: Number, required: true }, // kg CO2
    batteryProduction: { type: Number, default: 0 }, // kg CO2
    annualUsage: { type: Number, required: true },   // kg CO2 per year
    disposal: { type: Number, required: true },      // kg CO2
    fuelType: { type: String, default: 'Electric' },
    mpg: { type: Number, default: null },
    kwhPer100km: { type: Number, default: null }
  },
  standard: { type: String, enum: ['EPA', 'WLTP', 'EEA', 'Combined'], default: 'EPA' },
  greenwashingRisk: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  greenwashingFlags: [{ type: String }],
  carbonLabelScore: { type: Number, min: 0, max: 100 },
  image: { type: String, default: '' },
  verified: { type: Boolean, default: true }
}, { timestamps: true });

// Compute total lifecycle carbon for N years
vehicleSchema.methods.getLifecycleCO2 = function(years = 10) {
  return this.emissions.manufacturing 
    + this.emissions.batteryProduction
    + (this.emissions.annualUsage * years) 
    + this.emissions.disposal;
};

module.exports = mongoose.model('Vehicle', vehicleSchema);
