import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },

    vehicleType: {
      type: String,
      enum: ["EV", "Hybrid", "ICE"],
      required: true,
    },

    // Lifecycle Emissions
    manufacturingEmission: { type: Number, required: true },
    emissionPerKm: { type: Number, required: true }, 
    disposalEmission: { type: Number, required: true },

    // Derived Emission Metrics
    tailpipeEmission: { type: Number, default: 0 }, 

    // Greenwashing Intelligence
    greenwashScore: { type: Number, default: 0 }, 
    isGreenwashingRisk: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Vehicle", vehicleSchema);