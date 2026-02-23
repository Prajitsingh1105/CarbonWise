import express from "express";
import Vehicle from "../models/Vehicle.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();

    if (!vehicles.length) {
      return res.json({
        totalVehicles: 0,
        distribution: { EV: 0, Hybrid: 0, ICE: 0 },
        averages: { manufacturing: 0, tailpipe: 0 },
        highRiskVehicles: 0,
      });
    }

    const total = vehicles.length;

    const evCount = vehicles.filter(v => v.vehicleType === "EV").length;
    const hybridCount = vehicles.filter(v => v.vehicleType === "Hybrid").length;
    const iceCount = vehicles.filter(v => v.vehicleType === "ICE").length;

    const avgManufacturing =
      vehicles.reduce((sum, v) => sum + v.manufacturingEmission, 0) / total;

    const avgTailpipe =
      vehicles.reduce((sum, v) => sum + v.tailpipeEmission, 0) / total;

    const highRisk = vehicles.filter(v => v.greenwashScore > 70).length;

    res.json({
      totalVehicles: total,
      distribution: {
        EV: evCount,
        Hybrid: hybridCount,
        ICE: iceCount,
      },
      averages: {
        manufacturing: avgManufacturing.toFixed(2),
        tailpipe: avgTailpipe.toFixed(2), 
      },
      highRiskVehicles: highRisk,
    });
  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({ message: "Analytics fetch failed" });
  }
});

router.get("/vehicles", async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Vehicle fetch failed" });
  }
});

export default router;
