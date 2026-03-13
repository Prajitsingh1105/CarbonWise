const express = require('express');
const router = express.Router();
const { MOCK_VEHICLES, getLifecycleCO2, getYearlyBreakdown } = require('../services/mockData');

// POST /api/compare - full lifecycle comparison
router.post('/', (req, res) => {
  const { vehicleIds, years = 10, dailyMileage = 40 } = req.body;
  
  if (!vehicleIds || vehicleIds.length < 2) {
    return res.status(400).json({ error: 'Select at least 2 vehicles to compare' });
  }

  const vehicles = vehicleIds.map(id => MOCK_VEHICLES.find(v => v._id === id)).filter(Boolean);
  
  if (vehicles.length < 2) return res.status(400).json({ error: 'Vehicles not found' });

  // Mileage adjustment factor (base = 40km/day = 14600km/year)
  const baseMileage = 14600;
  const actualMileage = dailyMileage * 365;
  const mileageFactor = actualMileage / baseMileage;

  const results = vehicles.map(v => {
    const adjustedAnnual = v.emissions.annualUsage * mileageFactor;
    const lifecycle = {
      manufacturing: v.emissions.manufacturing,
      battery: v.emissions.batteryProduction,
      usage: Math.round(adjustedAnnual * years),
      disposal: v.emissions.disposal,
      total: Math.round(v.emissions.manufacturing + v.emissions.batteryProduction + (adjustedAnnual * years) + v.emissions.disposal)
    };

    // Year-by-year breakdown
    const yearlyData = [];
    for (let y = 1; y <= Math.min(years + 5, 20); y++) {
      yearlyData.push({
        year: y,
        cumulative: Math.round(v.emissions.manufacturing + v.emissions.batteryProduction + (adjustedAnnual * y))
      });
    }

    // Breakeven calculation vs best EV
    const bestEV = MOCK_VEHICLES.filter(x => x.type === 'EV').sort((a,b) => a.emissions.annualUsage - b.emissions.annualUsage)[0];
    let breakevenYear = null;
    if (v.type !== 'EV' && bestEV) {
      const evAnnual = bestEV.emissions.annualUsage * mileageFactor;
      const evUpfront = bestEV.emissions.manufacturing + bestEV.emissions.batteryProduction;
      const vUpfront = v.emissions.manufacturing + v.emissions.batteryProduction;
      const annualDiff = adjustedAnnual - evAnnual;
      if (annualDiff > 0) {
        breakevenYear = Math.ceil((evUpfront - vUpfront) / annualDiff);
      }
    }

    return {
      vehicle: {
        _id: v._id, name: v.name, brand: v.brand, type: v.type,
        carbonLabelScore: v.carbonLabelScore, greenwashingRisk: v.greenwashingRisk,
        greenwashingFlags: v.greenwashingFlags, standard: v.standard, image: v.image
      },
      lifecycle,
      yearlyData,
      breakevenYear: breakevenYear && breakevenYear > 0 ? breakevenYear : null,
      co2PerKm: Math.round((adjustedAnnual / actualMileage) * 1000) / 1000 // kg CO2/km
    };
  });

  // Rank by total lifecycle
  results.sort((a, b) => a.lifecycle.total - b.lifecycle.total);
  results[0].isLowest = true;

  // CO2 savings vs worst
  const highest = Math.max(...results.map(r => r.lifecycle.total));
  results.forEach(r => {
    r.savingsVsWorst = highest - r.lifecycle.total;
    r.savingsPercent = Math.round((r.savingsVsWorst / highest) * 100);
  });

  res.json({ results, years, dailyMileage, comparedAt: new Date() });
});

// GET quick compare (2 vehicles)
router.get('/:id1/:id2', (req, res) => {
  const v1 = MOCK_VEHICLES.find(v => v._id === req.params.id1);
  const v2 = MOCK_VEHICLES.find(v => v._id === req.params.id2);
  if (!v1 || !v2) return res.status(404).json({ error: 'Vehicle(s) not found' });

  const calc = (v) => ({
    total10yr: getLifecycleCO2(v, 10),
    breakdown: { mfg: v.emissions.manufacturing, battery: v.emissions.batteryProduction, usage10yr: v.emissions.annualUsage * 10, disposal: v.emissions.disposal }
  });

  res.json({ vehicle1: { ...v1, ...calc(v1) }, vehicle2: { ...v2, ...calc(v2) } });
});

module.exports = router;
