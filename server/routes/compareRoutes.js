import express from "express";
const router = express.Router();


const calculateEmission = (vehicle, annualMileage, years) => {
  return (
    vehicle.manufacturingEmission +
    annualMileage * years * vehicle.emissionPerKm +
    vehicle.disposalEmission
  );
};

router.post("/", async (req, res) => {
  try {
    const { vehicleA, vehicleB, annualMileage, years } = req.body;

    // Validate input
    if (!vehicleA || !vehicleB) {
      return res.status(400).json({ message: "Vehicle data missing" });
    }

    const totalA = calculateEmission(vehicleA, annualMileage, years);
    const totalB = calculateEmission(vehicleB, annualMileage, years);

    const betterOption = totalA < totalB ? vehicleA.name : vehicleB.name;

    const savingsPercentage =
      Math.abs(totalA - totalB) / Math.max(totalA, totalB) * 100;

    // Break-even calculation
    let breakEvenYear = null;

    for (let i = 1; i <= years; i++) {
      const cumulativeA =
        vehicleA.manufacturingEmission +
        annualMileage * i * vehicleA.emissionPerKm +
        vehicleA.disposalEmission;

      const cumulativeB =
        vehicleB.manufacturingEmission +
        annualMileage * i * vehicleB.emissionPerKm +
        vehicleB.disposalEmission;

      if (cumulativeA < cumulativeB) {
        breakEvenYear = i;
        break;
      }
    }

    // Yearly data for chart
    const yearlyData = [];

    for (let i = 1; i <= years; i++) {
      yearlyData.push({
        year: i,
        vehicleA:
          vehicleA.manufacturingEmission +
          annualMileage * i * vehicleA.emissionPerKm +
          vehicleA.disposalEmission,
        vehicleB:
          vehicleB.manufacturingEmission +
          annualMileage * i * vehicleB.emissionPerKm +
          vehicleB.disposalEmission
      });
    }

    res.json({
      vehicleA: { ...vehicleA, totalEmission: totalA },
      vehicleB: { ...vehicleB, totalEmission: totalB },
      betterOption,
      savingsPercentage: savingsPercentage.toFixed(2),
      breakEvenYear,
      yearlyData
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;