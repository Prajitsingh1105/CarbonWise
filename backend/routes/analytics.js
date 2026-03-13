const express = require('express');
const router = express.Router();
const { MOCK_VEHICLES } = require('../services/mockData');

router.get('/summary', (req, res) => {
  const types = ['EV', 'Hybrid', 'ICE', 'PHEV'];
  
  const typeStats = types.map(type => {
    const vehicles = MOCK_VEHICLES.filter(v => v.type === type);
    if (!vehicles.length) return null;
    const avgMfg = Math.round(vehicles.reduce((a, v) => a + v.emissions.manufacturing + v.emissions.batteryProduction, 0) / vehicles.length);
    const avgAnnual = Math.round(vehicles.reduce((a, v) => a + v.emissions.annualUsage, 0) / vehicles.length);
    const avg10yr = Math.round(vehicles.reduce((a, v) => a + v.emissions.manufacturing + v.emissions.batteryProduction + v.emissions.annualUsage * 10 + v.emissions.disposal, 0) / vehicles.length);
    return { type, count: vehicles.length, avgMfg, avgAnnual, avg10yr, avgScore: Math.round(vehicles.reduce((a,v)=>a+v.carbonLabelScore,0)/vehicles.length) };
  }).filter(Boolean);

  const greenwashStats = {
    low: MOCK_VEHICLES.filter(v => v.greenwashingRisk === 'Low').length,
    medium: MOCK_VEHICLES.filter(v => v.greenwashingRisk === 'Medium').length,
    high: MOCK_VEHICLES.filter(v => v.greenwashingRisk === 'High').length
  };

  const topGreen = [...MOCK_VEHICLES].sort((a, b) => b.carbonLabelScore - a.carbonLabelScore).slice(0, 3)
    .map(v => ({ name: v.name, type: v.type, score: v.carbonLabelScore }));

  res.json({ typeStats, greenwashStats, topGreen, totalVehicles: MOCK_VEHICLES.length });
});

router.get('/emissions-breakdown', (req, res) => {
  const data = MOCK_VEHICLES.map(v => ({
    name: v.name, type: v.type,
    manufacturing: v.emissions.manufacturing,
    battery: v.emissions.batteryProduction,
    usage10yr: v.emissions.annualUsage * 10,
    disposal: v.emissions.disposal,
    total: v.emissions.manufacturing + v.emissions.batteryProduction + v.emissions.annualUsage * 10 + v.emissions.disposal
  })).sort((a, b) => a.total - b.total);
  res.json(data);
});

module.exports = router;
