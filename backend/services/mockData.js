// Mock vehicle data based on real-world LCA research
const MOCK_VEHICLES = [
  {
    _id: '1', name: 'Tesla Model 3', brand: 'Tesla', model: 'Model 3', year: 2024, type: 'EV', segment: 'Sedan',
    emissions: { manufacturing: 8800, batteryProduction: 5900, annualUsage: 1800, disposal: 400, fuelType: 'Electric', kwhPer100km: 14.9 },
    standard: 'EPA', carbonLabelScore: 88, greenwashingRisk: 'Low', greenwashingFlags: [], verified: true,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400'
  },
  {
    _id: '2', name: 'Toyota Camry', brand: 'Toyota', model: 'Camry', year: 2024, type: 'ICE', segment: 'Sedan',
    emissions: { manufacturing: 6200, batteryProduction: 0, annualUsage: 4100, disposal: 500, fuelType: 'Petrol', mpg: 32 },
    standard: 'EPA', carbonLabelScore: 52, greenwashingRisk: 'Low', greenwashingFlags: [], verified: true,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400'
  },
  {
    _id: '3', name: 'Toyota Prius', brand: 'Toyota', model: 'Prius', year: 2024, type: 'Hybrid', segment: 'Sedan',
    emissions: { manufacturing: 7100, batteryProduction: 1200, annualUsage: 2600, disposal: 520, fuelType: 'Hybrid', mpg: 57 },
    standard: 'EPA', carbonLabelScore: 71, greenwashingRisk: 'Low', greenwashingFlags: [], verified: true,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400'
  },
  {
    _id: '4', name: 'Ford F-150', brand: 'Ford', model: 'F-150', year: 2024, type: 'ICE', segment: 'Truck',
    emissions: { manufacturing: 9800, batteryProduction: 0, annualUsage: 6800, disposal: 720, fuelType: 'Petrol', mpg: 20 },
    standard: 'EPA', carbonLabelScore: 28, greenwashingRisk: 'Medium', greenwashingFlags: ['High usage emissions vs advertised efficiency'], verified: true,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400'
  },
  {
    _id: '5', name: 'BMW i4', brand: 'BMW', model: 'i4', year: 2024, type: 'EV', segment: 'Sedan',
    emissions: { manufacturing: 11200, batteryProduction: 7100, annualUsage: 1900, disposal: 450, fuelType: 'Electric', kwhPer100km: 16.0 },
    standard: 'WLTP', carbonLabelScore: 79, greenwashingRisk: 'Low', greenwashingFlags: [], verified: true,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400'
  },
  {
    _id: '6', name: 'Jeep Wrangler', brand: 'Jeep', model: 'Wrangler', year: 2024, type: 'ICE', segment: 'SUV',
    emissions: { manufacturing: 8500, batteryProduction: 0, annualUsage: 7200, disposal: 600, fuelType: 'Petrol', mpg: 17 },
    standard: 'EPA', carbonLabelScore: 22, greenwashingRisk: 'High', greenwashingFlags: ['EcoGreen badge misleading', 'Actual usage 34% above stated'], verified: true,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400'
  },
  {
    _id: '7', name: 'Hyundai Ioniq 6', brand: 'Hyundai', model: 'Ioniq 6', year: 2024, type: 'EV', segment: 'Sedan',
    emissions: { manufacturing: 8200, batteryProduction: 5400, annualUsage: 1650, disposal: 380, fuelType: 'Electric', kwhPer100km: 13.8 },
    standard: 'WLTP', carbonLabelScore: 91, greenwashingRisk: 'Low', greenwashingFlags: [], verified: true,
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400'
  },
  {
    _id: '8', name: 'Ford F-150 Lightning', brand: 'Ford', model: 'F-150 Lightning', year: 2024, type: 'EV', segment: 'Truck',
    emissions: { manufacturing: 14500, batteryProduction: 9800, annualUsage: 2800, disposal: 780, fuelType: 'Electric', kwhPer100km: 25 },
    standard: 'EPA', carbonLabelScore: 63, greenwashingRisk: 'Medium', greenwashingFlags: ['High battery production emissions'], verified: true,
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400'
  },
  {
    _id: '9', name: 'Kia EV6', brand: 'Kia', model: 'EV6', year: 2024, type: 'EV', segment: 'SUV',
    emissions: { manufacturing: 9100, batteryProduction: 6200, annualUsage: 1750, disposal: 400, fuelType: 'Electric', kwhPer100km: 15.1 },
    standard: 'WLTP', carbonLabelScore: 85, greenwashingRisk: 'Low', greenwashingFlags: [], verified: true,
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400'
  },
  {
    _id: '10', name: 'Honda Accord Hybrid', brand: 'Honda', model: 'Accord Hybrid', year: 2024, type: 'Hybrid', segment: 'Sedan',
    emissions: { manufacturing: 7300, batteryProduction: 900, annualUsage: 2400, disposal: 490, fuelType: 'Hybrid', mpg: 48 },
    standard: 'EPA', carbonLabelScore: 74, greenwashingRisk: 'Low', greenwashingFlags: [], verified: true,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400'
  },
  {
    _id: '11', name: 'Volkswagen ID.4', brand: 'Volkswagen', model: 'ID.4', year: 2024, type: 'EV', segment: 'SUV',
    emissions: { manufacturing: 9600, batteryProduction: 6500, annualUsage: 1820, disposal: 420, fuelType: 'Electric', kwhPer100km: 15.7 },
    standard: 'WLTP', carbonLabelScore: 83, greenwashingRisk: 'Low', greenwashingFlags: [], verified: true,
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400'
  },
  {
    _id: '12', name: 'Ram 1500 EcoDiesel', brand: 'Ram', model: '1500 EcoDiesel', year: 2024, type: 'ICE', segment: 'Truck',
    emissions: { manufacturing: 9200, batteryProduction: 0, annualUsage: 5900, disposal: 680, fuelType: 'Diesel', mpg: 26 },
    standard: 'EPA', carbonLabelScore: 35, greenwashingRisk: 'High', greenwashingFlags: ['"Eco" naming misleading', 'Diesel emissions exceed marketing claims by 28%'], verified: true,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400'
  }
];

function getLifecycleCO2(vehicle, years = 10) {
  return vehicle.emissions.manufacturing
    + vehicle.emissions.batteryProduction
    + (vehicle.emissions.annualUsage * years)
    + vehicle.emissions.disposal;
}

function getYearlyBreakdown(vehicle, years = 15) {
  const data = [];
  for (let y = 1; y <= years; y++) {
    data.push({
      year: y,
      total: getLifecycleCO2(vehicle, y),
      cumulative: vehicle.emissions.manufacturing + vehicle.emissions.batteryProduction + (vehicle.emissions.annualUsage * y)
    });
  }
  return data;
}

module.exports = { MOCK_VEHICLES, getLifecycleCO2, getYearlyBreakdown };
