const express = require('express');
const router = express.Router();
const { MOCK_VEHICLES } = require('../services/mockData');

// GET all vehicles with optional filters
router.get('/', (req, res) => {
  let vehicles = [...MOCK_VEHICLES];
  const { type, segment, search, sort } = req.query;
  
  if (type && type !== 'All') vehicles = vehicles.filter(v => v.type === type);
  if (segment && segment !== 'All') vehicles = vehicles.filter(v => v.segment === segment);
  if (search) vehicles = vehicles.filter(v => 
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.brand.toLowerCase().includes(search.toLowerCase())
  );
  
  if (sort === 'score_desc') vehicles.sort((a, b) => b.carbonLabelScore - a.carbonLabelScore);
  if (sort === 'score_asc') vehicles.sort((a, b) => a.carbonLabelScore - b.carbonLabelScore);
  if (sort === 'emissions_asc') vehicles.sort((a, b) => 
    (a.emissions.manufacturing + a.emissions.annualUsage * 10) - (b.emissions.manufacturing + b.emissions.annualUsage * 10)
  );

  res.json({ vehicles, total: vehicles.length });
});

// GET single vehicle
router.get('/:id', (req, res) => {
  const vehicle = MOCK_VEHICLES.find(v => v._id === req.params.id);
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
  res.json(vehicle);
});

// GET vehicle types summary
router.get('/meta/types', (req, res) => {
  const summary = ['EV', 'Hybrid', 'ICE', 'PHEV'].map(type => ({
    type,
    count: MOCK_VEHICLES.filter(v => v.type === type).length,
    avgScore: Math.round(
      MOCK_VEHICLES.filter(v => v.type === type).reduce((a, v) => a + v.carbonLabelScore, 0) /
      (MOCK_VEHICLES.filter(v => v.type === type).length || 1)
    )
  }));
  res.json(summary);
});

module.exports = router;
