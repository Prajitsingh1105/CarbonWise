const express = require('express');
const router = express.Router();
const { MOCK_VEHICLES, getLifecycleCO2 } = require('../services/mockData');

// POST /api/recommend
router.post('/', (req, res) => {
  const { dailyMileage = 40, yearsOfUse = 8, drivingPattern = 'Mixed', budget = 'Any', priority = 'carbon' } = req.body;

  const mileageFactor = (dailyMileage * 365) / 14600;

  const scored = MOCK_VEHICLES.map(v => {
    const adjustedAnnual = v.emissions.annualUsage * mileageFactor;
    const totalCarbon = v.emissions.manufacturing + v.emissions.batteryProduction + (adjustedAnnual * yearsOfUse) + v.emissions.disposal;
    
    let score = v.carbonLabelScore;
    
    // Boost EVs for city driving (stop-start efficiency)
    if (drivingPattern === 'City' && v.type === 'EV') score += 10;
    if (drivingPattern === 'Highway' && v.type === 'Hybrid') score += 5;
    if (drivingPattern === 'City' && v.type === 'ICE') score -= 8;
    
    // Longer usage = EVs become better over time
    if (yearsOfUse > 8 && v.type === 'EV') score += 8;
    if (yearsOfUse < 4 && v.type === 'EV') score -= 5; // High upfront mfg not offset yet
    
    // High mileage favors EVs (lower usage emissions)
    if (dailyMileage > 80 && v.type === 'EV') score += 12;
    if (dailyMileage > 80 && v.type === 'ICE') score -= 15;

    return {
      vehicle: { _id: v._id, name: v.name, brand: v.brand, type: v.type, segment: v.segment, carbonLabelScore: v.carbonLabelScore, image: v.image, greenwashingRisk: v.greenwashingRisk },
      totalCarbon: Math.round(totalCarbon),
      adjustedScore: Math.min(100, Math.max(0, score)),
      co2PerDay: Math.round(adjustedAnnual / 365),
      reasons: generateReasons(v, drivingPattern, dailyMileage, yearsOfUse)
    };
  });

  scored.sort((a, b) => b.adjustedScore - a.adjustedScore);
  res.json({ recommendations: scored.slice(0, 5), inputs: { dailyMileage, yearsOfUse, drivingPattern } });
});

function generateReasons(v, pattern, mileage, years) {
  const reasons = [];
  if (v.type === 'EV') {
    reasons.push('Zero tailpipe emissions during use');
    if (mileage > 60) reasons.push('High mileage maximizes EV efficiency advantage');
    if (years > 7) reasons.push('Long ownership offsets higher manufacturing carbon');
  }
  if (v.type === 'Hybrid') {
    reasons.push('Best of both: lower usage emissions than ICE');
    if (pattern === 'City') reasons.push('Regenerative braking maximizes city efficiency');
  }
  if (v.type === 'ICE') {
    reasons.push('Lower manufacturing emissions than EVs');
    if (years < 4) reasons.push('Short ownership avoids EV carbon payback period');
  }
  if (v.greenwashingRisk === 'Low') reasons.push('Verified emissions data — no greenwashing detected');
  return reasons;
}

module.exports = router;
