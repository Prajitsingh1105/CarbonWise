import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Vehicle from "./models/Vehicle.js";

dotenv.config();
connectDB();

await Vehicle.deleteMany();

await Vehicle.insertMany([
  {
    name: "Tesla Model S",
    brand: "Tesla",
    vehicleType: "EV",
    manufacturingEmission: 11000,
    emissionPerKm: 0.07,
    disposalEmission: 1500,
    tailpipeEmission: 0,
    greenwashScore: 30,
    isGreenwashingRisk: false
  },
  {
    name: "Tesla Model 3",
    brand: "Tesla",
    vehicleType: "EV",
    manufacturingEmission: 9500,
    emissionPerKm: 0.06,
    disposalEmission: 1400,
    tailpipeEmission: 0,
    greenwashScore: 28,
    isGreenwashingRisk: false
  },
  {
    name: "Tesla Model X",
    brand: "Tesla",
    vehicleType: "EV",
    manufacturingEmission: 12000,
    emissionPerKm: 0.08,
    disposalEmission: 1600,
    tailpipeEmission: 0,
    greenwashScore: 32,
    isGreenwashingRisk: false
  },
  {
    name: "Tesla Model Y",
    brand: "Tesla",
    vehicleType: "EV",
    manufacturingEmission: 10000,
    emissionPerKm: 0.07,
    disposalEmission: 1500,
    tailpipeEmission: 0,
    greenwashScore: 29,
    isGreenwashingRisk: false
  },

  // ================= TOYOTA =================
  {
    name: "Toyota Corolla",
    brand: "Toyota",
    vehicleType: "ICE",
    manufacturingEmission: 7000,
    emissionPerKm: 0.19,
    disposalEmission: 1200,
    tailpipeEmission: 2200,
    greenwashScore: 20,
    isGreenwashingRisk: false
  },
  {
    name: "Toyota Camry",
    brand: "Toyota",
    vehicleType: "ICE",
    manufacturingEmission: 7500,
    emissionPerKm: 0.21,
    disposalEmission: 1300,
    tailpipeEmission: 2400,
    greenwashScore: 22,
    isGreenwashingRisk: false
  },
  {
    name: "Toyota Prius",
    brand: "Toyota",
    vehicleType: "Hybrid",
    manufacturingEmission: 8200,
    emissionPerKm: 0.11,
    disposalEmission: 1350,
    tailpipeEmission: 1400,
    greenwashScore: 25,
    isGreenwashingRisk: false
  },
  {
    name: "Toyota Fortuner",
    brand: "Toyota",
    vehicleType: "ICE",
    manufacturingEmission: 9000,
    emissionPerKm: 0.24,
    disposalEmission: 1500,
    tailpipeEmission: 2800,
    greenwashScore: 35,
    isGreenwashingRisk: true
  },

  // ================= HONDA =================
  {
    name: "Honda Civic",
    brand: "Honda",
    vehicleType: "ICE",
    manufacturingEmission: 7200,
    emissionPerKm: 0.20,
    disposalEmission: 1200,
    tailpipeEmission: 2300,
    greenwashScore: 21,
    isGreenwashingRisk: false
  },
  {
    name: "Honda Accord",
    brand: "Honda",
    vehicleType: "ICE",
    manufacturingEmission: 7600,
    emissionPerKm: 0.22,
    disposalEmission: 1300,
    tailpipeEmission: 2500,
    greenwashScore: 23,
    isGreenwashingRisk: false
  },
  {
    name: "Honda CR-V",
    brand: "Honda",
    vehicleType: "Hybrid",
    manufacturingEmission: 8500,
    emissionPerKm: 0.14,
    disposalEmission: 1400,
    tailpipeEmission: 1600,
    greenwashScore: 27,
    isGreenwashingRisk: false
  },

  // ================= BMW =================
  {
    name: "BMW 3 Series",
    brand: "BMW",
    vehicleType: "ICE",
    manufacturingEmission: 8000,
    emissionPerKm: 0.23,
    disposalEmission: 1400,
    tailpipeEmission: 2600,
    greenwashScore: 30,
    isGreenwashingRisk: false
  },
  {
    name: "BMW 5 Series",
    brand: "BMW",
    vehicleType: "ICE",
    manufacturingEmission: 8500,
    emissionPerKm: 0.25,
    disposalEmission: 1500,
    tailpipeEmission: 2900,
    greenwashScore: 32,
    isGreenwashingRisk: true
  },
  {
    name: "BMW i4",
    brand: "BMW",
    vehicleType: "EV",
    manufacturingEmission: 10500,
    emissionPerKm: 0.08,
    disposalEmission: 1500,
    tailpipeEmission: 0,
    greenwashScore: 26,
    isGreenwashingRisk: false
  },
  {
    name: "BMW iX",
    brand: "BMW",
    vehicleType: "EV",
    manufacturingEmission: 11500,
    emissionPerKm: 0.09,
    disposalEmission: 1600,
    tailpipeEmission: 0,
    greenwashScore: 31,
    isGreenwashingRisk: false
  },

  // ================= MERCEDES =================
  {
    name: "Mercedes-Benz C-Class",
    brand: "Mercedes-Benz",
    vehicleType: "ICE",
    manufacturingEmission: 8200,
    emissionPerKm: 0.24,
    disposalEmission: 1400,
    tailpipeEmission: 2700,
    greenwashScore: 33,
    isGreenwashingRisk: true
  },
  {
    name: "Mercedes-Benz E-Class",
    brand: "Mercedes-Benz",
    vehicleType: "ICE",
    manufacturingEmission: 8800,
    emissionPerKm: 0.26,
    disposalEmission: 1500,
    tailpipeEmission: 3000,
    greenwashScore: 35,
    isGreenwashingRisk: true
  },
  {
    name: "Mercedes EQC",
    brand: "Mercedes-Benz",
    vehicleType: "EV",
    manufacturingEmission: 11000,
    emissionPerKm: 0.09,
    disposalEmission: 1600,
    tailpipeEmission: 0,
    greenwashScore: 28,
    isGreenwashingRisk: false
  },

  // ================= HYUNDAI =================
  {
    name: "Hyundai Elantra",
    brand: "Hyundai",
    vehicleType: "ICE",
    manufacturingEmission: 6800,
    emissionPerKm: 0.18,
    disposalEmission: 1100,
    tailpipeEmission: 2100,
    greenwashScore: 18,
    isGreenwashingRisk: false
  },
  {
    name: "Hyundai Tucson",
    brand: "Hyundai",
    vehicleType: "ICE",
    manufacturingEmission: 7300,
    emissionPerKm: 0.21,
    disposalEmission: 1200,
    tailpipeEmission: 2400,
    greenwashScore: 22,
    isGreenwashingRisk: false
  },
  {
    name: "Hyundai Ioniq 5",
    brand: "Hyundai",
    vehicleType: "EV",
    manufacturingEmission: 9800,
    emissionPerKm: 0.07,
    disposalEmission: 1400,
    tailpipeEmission: 0,
    greenwashScore: 24,
    isGreenwashingRisk: false
  },

  // ================= FORD =================
  {
    name: "Ford Mustang",
    brand: "Ford",
    vehicleType: "ICE",
    manufacturingEmission: 9000,
    emissionPerKm: 0.28,
    disposalEmission: 1500,
    tailpipeEmission: 3200,
    greenwashScore: 40,
    isGreenwashingRisk: true
  },
  {
    name: "Ford F-150",
    brand: "Ford",
    vehicleType: "ICE",
    manufacturingEmission: 9500,
    emissionPerKm: 0.30,
    disposalEmission: 1600,
    tailpipeEmission: 3500,
    greenwashScore: 45,
    isGreenwashingRisk: true
  },
  {
    name: "Ford Mustang Mach-E",
    brand: "Ford",
    vehicleType: "EV",
    manufacturingEmission: 10500,
    emissionPerKm: 0.08,
    disposalEmission: 1500,
    tailpipeEmission: 0,
    greenwashScore: 27,
    isGreenwashingRisk: false
  },
  {
    name: "Audi A4",
    brand: "Audi",
    vehicleType: "ICE",
    manufacturingEmission: 7800,
    emissionPerKm: 0.22,
    disposalEmission: 1300,
    tailpipeEmission: 2500,
    greenwashScore: 28,
    isGreenwashingRisk: false
  },
  {
    name: "Audi A6",
    brand: "Audi",
    vehicleType: "ICE",
    manufacturingEmission: 8300,
    emissionPerKm: 0.24,
    disposalEmission: 1400,
    tailpipeEmission: 2700,
    greenwashScore: 31,
    isGreenwashingRisk: false
  },
  {
    name: "Audi Q5",
    brand: "Audi",
    vehicleType: "ICE",
    manufacturingEmission: 8600,
    emissionPerKm: 0.25,
    disposalEmission: 1500,
    tailpipeEmission: 2900,
    greenwashScore: 33,
    isGreenwashingRisk: true
  },
  {
    name: "Audi e-tron",
    brand: "Audi",
    vehicleType: "EV",
    manufacturingEmission: 10800,
    emissionPerKm: 0.09,
    disposalEmission: 1600,
    tailpipeEmission: 0,
    greenwashScore: 27,
    isGreenwashingRisk: false
  },

  // ================= KIA =================
  {
    name: "Kia Seltos",
    brand: "Kia",
    vehicleType: "ICE",
    manufacturingEmission: 6900,
    emissionPerKm: 0.19,
    disposalEmission: 1100,
    tailpipeEmission: 2200,
    greenwashScore: 20,
    isGreenwashingRisk: false
  },
  {
    name: "Kia Sportage",
    brand: "Kia",
    vehicleType: "Hybrid",
    manufacturingEmission: 7800,
    emissionPerKm: 0.13,
    disposalEmission: 1300,
    tailpipeEmission: 1500,
    greenwashScore: 23,
    isGreenwashingRisk: false
  },
  {
    name: "Kia EV6",
    brand: "Kia",
    vehicleType: "EV",
    manufacturingEmission: 9900,
    emissionPerKm: 0.07,
    disposalEmission: 1400,
    tailpipeEmission: 0,
    greenwashScore: 22,
    isGreenwashingRisk: false
  },

  // ================= VOLKSWAGEN =================
  {
    name: "Volkswagen Golf",
    brand: "Volkswagen",
    vehicleType: "ICE",
    manufacturingEmission: 7200,
    emissionPerKm: 0.20,
    disposalEmission: 1200,
    tailpipeEmission: 2300,
    greenwashScore: 24,
    isGreenwashingRisk: false
  },
  {
    name: "Volkswagen Passat",
    brand: "Volkswagen",
    vehicleType: "ICE",
    manufacturingEmission: 7600,
    emissionPerKm: 0.22,
    disposalEmission: 1300,
    tailpipeEmission: 2500,
    greenwashScore: 26,
    isGreenwashingRisk: false
  },
  {
    name: "Volkswagen Tiguan",
    brand: "Volkswagen",
    vehicleType: "ICE",
    manufacturingEmission: 8000,
    emissionPerKm: 0.23,
    disposalEmission: 1400,
    tailpipeEmission: 2700,
    greenwashScore: 29,
    isGreenwashingRisk: false
  },
  {
    name: "Volkswagen ID.4",
    brand: "Volkswagen",
    vehicleType: "EV",
    manufacturingEmission: 10200,
    emissionPerKm: 0.08,
    disposalEmission: 1500,
    tailpipeEmission: 0,
    greenwashScore: 25,
    isGreenwashingRisk: false
  },

  // ================= NISSAN =================
  {
    name: "Nissan Altima",
    brand: "Nissan",
    vehicleType: "ICE",
    manufacturingEmission: 7100,
    emissionPerKm: 0.19,
    disposalEmission: 1200,
    tailpipeEmission: 2200,
    greenwashScore: 22,
    isGreenwashingRisk: false
  },
  {
    name: "Nissan Rogue",
    brand: "Nissan",
    vehicleType: "ICE",
    manufacturingEmission: 7500,
    emissionPerKm: 0.21,
    disposalEmission: 1300,
    tailpipeEmission: 2400,
    greenwashScore: 24,
    isGreenwashingRisk: false
  },
  {
    name: "Nissan Leaf",
    brand: "Nissan",
    vehicleType: "EV",
    manufacturingEmission: 9200,
    emissionPerKm: 0.06,
    disposalEmission: 1300,
    tailpipeEmission: 0,
    greenwashScore: 21,
    isGreenwashingRisk: false
  },

  // ================= MAHINDRA =================
  {
    name: "Mahindra XUV700",
    brand: "Mahindra",
    vehicleType: "ICE",
    manufacturingEmission: 7800,
    emissionPerKm: 0.22,
    disposalEmission: 1300,
    tailpipeEmission: 2600,
    greenwashScore: 30,
    isGreenwashingRisk: false
  },
  {
    name: "Mahindra Thar",
    brand: "Mahindra",
    vehicleType: "ICE",
    manufacturingEmission: 8200,
    emissionPerKm: 0.25,
    disposalEmission: 1400,
    tailpipeEmission: 2900,
    greenwashScore: 34,
    isGreenwashingRisk: true
  },
  {
    name: "Mahindra XUV400",
    brand: "Mahindra",
    vehicleType: "EV",
    manufacturingEmission: 9500,
    emissionPerKm: 0.07,
    disposalEmission: 1400,
    tailpipeEmission: 0,
    greenwashScore: 23,
    isGreenwashingRisk: false
  },

  // ================= TATA =================
  {
    name: "Tata Nexon",
    brand: "Tata",
    vehicleType: "ICE",
    manufacturingEmission: 7000,
    emissionPerKm: 0.20,
    disposalEmission: 1200,
    tailpipeEmission: 2300,
    greenwashScore: 22,
    isGreenwashingRisk: false
  },
  {
    name: "Tata Harrier",
    brand: "Tata",
    vehicleType: "ICE",
    manufacturingEmission: 7600,
    emissionPerKm: 0.23,
    disposalEmission: 1300,
    tailpipeEmission: 2600,
    greenwashScore: 27,
    isGreenwashingRisk: false
  },
  {
    name: "Tata Nexon EV",
    brand: "Tata",
    vehicleType: "EV",
    manufacturingEmission: 9200,
    emissionPerKm: 0.06,
    disposalEmission: 1300,
    tailpipeEmission: 0,
    greenwashScore: 20,
    isGreenwashingRisk: false
  },

  // ================= CHEVROLET =================
  {
    name: "Chevrolet Malibu",
    brand: "Chevrolet",
    vehicleType: "ICE",
    manufacturingEmission: 7200,
    emissionPerKm: 0.21,
    disposalEmission: 1200,
    tailpipeEmission: 2400,
    greenwashScore: 25,
    isGreenwashingRisk: false
  },
  {
    name: "Chevrolet Tahoe",
    brand: "Chevrolet",
    vehicleType: "ICE",
    manufacturingEmission: 9000,
    emissionPerKm: 0.29,
    disposalEmission: 1500,
    tailpipeEmission: 3300,
    greenwashScore: 42,
    isGreenwashingRisk: true
  },
  {
    name: "Chevrolet Bolt EV",
    brand: "Chevrolet",
    vehicleType: "EV",
    manufacturingEmission: 9300,
    emissionPerKm: 0.06,
    disposalEmission: 1300,
    tailpipeEmission: 0,
    greenwashScore: 21,
    isGreenwashingRisk: false
  },
  {
    name: "Skoda Octavia",
    brand: "Skoda",
    vehicleType: "ICE",
    manufacturingEmission: 7300,
    emissionPerKm: 0.21,
    disposalEmission: 1200,
    tailpipeEmission: 2400,
    greenwashScore: 24,
    isGreenwashingRisk: false
  },
  {
    name: "Skoda Superb",
    brand: "Skoda",
    vehicleType: "ICE",
    manufacturingEmission: 7900,
    emissionPerKm: 0.23,
    disposalEmission: 1300,
    tailpipeEmission: 2600,
    greenwashScore: 28,
    isGreenwashingRisk: false
  },
  {
    name: "Skoda Kodiaq",
    brand: "Skoda",
    vehicleType: "ICE",
    manufacturingEmission: 8200,
    emissionPerKm: 0.24,
    disposalEmission: 1400,
    tailpipeEmission: 2800,
    greenwashScore: 31,
    isGreenwashingRisk: false
  },

  // ================= MG =================
  {
    name: "MG Hector",
    brand: "MG",
    vehicleType: "ICE",
    manufacturingEmission: 7600,
    emissionPerKm: 0.22,
    disposalEmission: 1300,
    tailpipeEmission: 2500,
    greenwashScore: 27,
    isGreenwashingRisk: false
  },
  {
    name: "MG ZS EV",
    brand: "MG",
    vehicleType: "EV",
    manufacturingEmission: 9400,
    emissionPerKm: 0.07,
    disposalEmission: 1400,
    tailpipeEmission: 0,
    greenwashScore: 22,
    isGreenwashingRisk: false
  },

  // ================= RENAULT =================
  {
    name: "Renault Kwid",
    brand: "Renault",
    vehicleType: "ICE",
    manufacturingEmission: 6200,
    emissionPerKm: 0.17,
    disposalEmission: 1000,
    tailpipeEmission: 2000,
    greenwashScore: 18,
    isGreenwashingRisk: false
  },
  {
    name: "Renault Duster",
    brand: "Renault",
    vehicleType: "ICE",
    manufacturingEmission: 7000,
    emissionPerKm: 0.20,
    disposalEmission: 1200,
    tailpipeEmission: 2300,
    greenwashScore: 23,
    isGreenwashingRisk: false
  },

  // ================= JEEP =================
  {
    name: "Jeep Compass",
    brand: "Jeep",
    vehicleType: "ICE",
    manufacturingEmission: 8200,
    emissionPerKm: 0.24,
    disposalEmission: 1400,
    tailpipeEmission: 2800,
    greenwashScore: 32,
    isGreenwashingRisk: true
  },
  {
    name: "Jeep Wrangler",
    brand: "Jeep",
    vehicleType: "ICE",
    manufacturingEmission: 9000,
    emissionPerKm: 0.29,
    disposalEmission: 1500,
    tailpipeEmission: 3300,
    greenwashScore: 40,
    isGreenwashingRisk: true
  },

  // ================= SUBARU =================
  {
    name: "Subaru Impreza",
    brand: "Subaru",
    vehicleType: "ICE",
    manufacturingEmission: 7100,
    emissionPerKm: 0.20,
    disposalEmission: 1200,
    tailpipeEmission: 2300,
    greenwashScore: 25,
    isGreenwashingRisk: false
  },
  {
    name: "Subaru Outback",
    brand: "Subaru",
    vehicleType: "ICE",
    manufacturingEmission: 7800,
    emissionPerKm: 0.23,
    disposalEmission: 1300,
    tailpipeEmission: 2600,
    greenwashScore: 29,
    isGreenwashingRisk: false
  },

  // ================= MAZDA =================
  {
    name: "Mazda CX-5",
    brand: "Mazda",
    vehicleType: "ICE",
    manufacturingEmission: 7400,
    emissionPerKm: 0.21,
    disposalEmission: 1200,
    tailpipeEmission: 2400,
    greenwashScore: 26,
    isGreenwashingRisk: false
  },
  {
    name: "Mazda 3",
    brand: "Mazda",
    vehicleType: "ICE",
    manufacturingEmission: 7000,
    emissionPerKm: 0.19,
    disposalEmission: 1100,
    tailpipeEmission: 2200,
    greenwashScore: 22,
    isGreenwashingRisk: false
  },

  // ================= VOLVO =================
  {
    name: "Volvo XC40",
    brand: "Volvo",
    vehicleType: "Hybrid",
    manufacturingEmission: 8500,
    emissionPerKm: 0.14,
    disposalEmission: 1400,
    tailpipeEmission: 1600,
    greenwashScore: 27,
    isGreenwashingRisk: false
  },
  {
    name: "Volvo XC60",
    brand: "Volvo",
    vehicleType: "Hybrid",
    manufacturingEmission: 8800,
    emissionPerKm: 0.15,
    disposalEmission: 1500,
    tailpipeEmission: 1700,
    greenwashScore: 29,
    isGreenwashingRisk: false
  },
  {
    name: "Volvo C40 Recharge",
    brand: "Volvo",
    vehicleType: "EV",
    manufacturingEmission: 10200,
    emissionPerKm: 0.08,
    disposalEmission: 1500,
    tailpipeEmission: 0,
    greenwashScore: 24,
    isGreenwashingRisk: false
  },

  // ================= LEXUS =================
  {
    name: "Lexus RX 350",
    brand: "Lexus",
    vehicleType: "Hybrid",
    manufacturingEmission: 8700,
    emissionPerKm: 0.15,
    disposalEmission: 1500,
    tailpipeEmission: 1700,
    greenwashScore: 30,
    isGreenwashingRisk: false
  },
  {
    name: "Lexus ES 300h",
    brand: "Lexus",
    vehicleType: "Hybrid",
    manufacturingEmission: 8400,
    emissionPerKm: 0.13,
    disposalEmission: 1400,
    tailpipeEmission: 1500,
    greenwashScore: 28,
    isGreenwashingRisk: false
  },

  // ================= PORSCHE =================
  {
    name: "Porsche Cayenne",
    brand: "Porsche",
    vehicleType: "ICE",
    manufacturingEmission: 9500,
    emissionPerKm: 0.30,
    disposalEmission: 1600,
    tailpipeEmission: 3400,
    greenwashScore: 45,
    isGreenwashingRisk: true
  },
  {
    name: "Porsche Taycan",
    brand: "Porsche",
    vehicleType: "EV",
    manufacturingEmission: 11500,
    emissionPerKm: 0.09,
    disposalEmission: 1600,
    tailpipeEmission: 0,
    greenwashScore: 30,
    isGreenwashingRisk: false
  },

  // ================= LAND ROVER =================
  {
    name: "Land Rover Defender",
    brand: "Land Rover",
    vehicleType: "ICE",
    manufacturingEmission: 9600,
    emissionPerKm: 0.31,
    disposalEmission: 1600,
    tailpipeEmission: 3500,
    greenwashScore: 46,
    isGreenwashingRisk: true
  },
  {
    name: "Range Rover Evoque",
    brand: "Land Rover",
    vehicleType: "Hybrid",
    manufacturingEmission: 8900,
    emissionPerKm: 0.16,
    disposalEmission: 1500,
    tailpipeEmission: 1800,
    greenwashScore: 32,
    isGreenwashingRisk: false
  },

  // ================= MINI =================
  {
    name: "Mini Cooper",
    brand: "Mini",
    vehicleType: "ICE",
    manufacturingEmission: 6800,
    emissionPerKm: 0.18,
    disposalEmission: 1100,
    tailpipeEmission: 2100,
    greenwashScore: 21,
    isGreenwashingRisk: false
  },
  {
    name: "Mini Cooper SE",
    brand: "Mini",
    vehicleType: "EV",
    manufacturingEmission: 9200,
    emissionPerKm: 0.07,
    disposalEmission: 1300,
    tailpipeEmission: 0,
    greenwashScore: 23,
    isGreenwashingRisk: false
  },
  {
    name: "BYD Atto 3",
    brand: "BYD",
    vehicleType: "EV",
    manufacturingEmission: 9600,
    emissionPerKm: 0.07,
    disposalEmission: 1400,
    tailpipeEmission: 0,
    greenwashScore: 22,
    isGreenwashingRisk: false
  },
  {
    name: "BYD Seal",
    brand: "BYD",
    vehicleType: "EV",
    manufacturingEmission: 10000,
    emissionPerKm: 0.08,
    disposalEmission: 1500,
    tailpipeEmission: 0,
    greenwashScore: 24,
    isGreenwashingRisk: false
  },

  // ================= SUZUKI / MARUTI =================
  {
    name: "Maruti Suzuki Swift",
    brand: "Maruti Suzuki",
    vehicleType: "ICE",
    manufacturingEmission: 6400,
    emissionPerKm: 0.17,
    disposalEmission: 1000,
    tailpipeEmission: 2000,
    greenwashScore: 18,
    isGreenwashingRisk: false
  },
  {
    name: "Maruti Suzuki Baleno",
    brand: "Maruti Suzuki",
    vehicleType: "ICE",
    manufacturingEmission: 6600,
    emissionPerKm: 0.18,
    disposalEmission: 1100,
    tailpipeEmission: 2100,
    greenwashScore: 20,
    isGreenwashingRisk: false
  },
  {
    name: "Maruti Suzuki Grand Vitara Hybrid",
    brand: "Maruti Suzuki",
    vehicleType: "Hybrid",
    manufacturingEmission: 7800,
    emissionPerKm: 0.12,
    disposalEmission: 1300,
    tailpipeEmission: 1400,
    greenwashScore: 23,
    isGreenwashingRisk: false
  },

  // ================= MITSUBISHI =================
  {
    name: "Mitsubishi Outlander",
    brand: "Mitsubishi",
    vehicleType: "Hybrid",
    manufacturingEmission: 8400,
    emissionPerKm: 0.14,
    disposalEmission: 1400,
    tailpipeEmission: 1600,
    greenwashScore: 26,
    isGreenwashingRisk: false
  },
  {
    name: "Mitsubishi Pajero Sport",
    brand: "Mitsubishi",
    vehicleType: "ICE",
    manufacturingEmission: 8900,
    emissionPerKm: 0.26,
    disposalEmission: 1500,
    tailpipeEmission: 3000,
    greenwashScore: 34,
    isGreenwashingRisk: true
  },

  // ================= PEUGEOT =================
  {
    name: "Peugeot 208",
    brand: "Peugeot",
    vehicleType: "ICE",
    manufacturingEmission: 6800,
    emissionPerKm: 0.18,
    disposalEmission: 1100,
    tailpipeEmission: 2100,
    greenwashScore: 21,
    isGreenwashingRisk: false
  },
  {
    name: "Peugeot e-208",
    brand: "Peugeot",
    vehicleType: "EV",
    manufacturingEmission: 9300,
    emissionPerKm: 0.07,
    disposalEmission: 1300,
    tailpipeEmission: 0,
    greenwashScore: 23,
    isGreenwashingRisk: false
  },

  // ================= FIAT =================
  {
    name: "Fiat 500",
    brand: "Fiat",
    vehicleType: "ICE",
    manufacturingEmission: 6500,
    emissionPerKm: 0.17,
    disposalEmission: 1000,
    tailpipeEmission: 2000,
    greenwashScore: 19,
    isGreenwashingRisk: false
  },
  {
    name: "Fiat 500e",
    brand: "Fiat",
    vehicleType: "EV",
    manufacturingEmission: 9100,
    emissionPerKm: 0.06,
    disposalEmission: 1300,
    tailpipeEmission: 0,
    greenwashScore: 21,
    isGreenwashingRisk: false
  },

  // ================= JAGUAR =================
  {
    name: "Jaguar F-Pace",
    brand: "Jaguar",
    vehicleType: "ICE",
    manufacturingEmission: 9200,
    emissionPerKm: 0.28,
    disposalEmission: 1500,
    tailpipeEmission: 3200,
    greenwashScore: 38,
    isGreenwashingRisk: true
  },
  {
    name: "Jaguar I-Pace",
    brand: "Jaguar",
    vehicleType: "EV",
    manufacturingEmission: 10800,
    emissionPerKm: 0.09,
    disposalEmission: 1600,
    tailpipeEmission: 0,
    greenwashScore: 29,
    isGreenwashingRisk: false
  },

  // ================= ALFA ROMEO =================
  {
    name: "Alfa Romeo Giulia",
    brand: "Alfa Romeo",
    vehicleType: "ICE",
    manufacturingEmission: 8000,
    emissionPerKm: 0.24,
    disposalEmission: 1400,
    tailpipeEmission: 2700,
    greenwashScore: 30,
    isGreenwashingRisk: false
  },

  // ================= GENESIS =================
  {
    name: "Genesis G70",
    brand: "Genesis",
    vehicleType: "ICE",
    manufacturingEmission: 8200,
    emissionPerKm: 0.23,
    disposalEmission: 1400,
    tailpipeEmission: 2600,
    greenwashScore: 29,
    isGreenwashingRisk: false
  },
  {
    name: "Genesis GV60",
    brand: "Genesis",
    vehicleType: "EV",
    manufacturingEmission: 10100,
    emissionPerKm: 0.08,
    disposalEmission: 1500,
    tailpipeEmission: 0,
    greenwashScore: 25,
    isGreenwashingRisk: false
  },

  // ================= RIVIAN =================
  {
    name: "Rivian R1T",
    brand: "Rivian",
    vehicleType: "EV",
    manufacturingEmission: 12000,
    emissionPerKm: 0.10,
    disposalEmission: 1700,
    tailpipeEmission: 0,
    greenwashScore: 28,
    isGreenwashingRisk: false
  },
  {
    name: "Rivian R1S",
    brand: "Rivian",
    vehicleType: "EV",
    manufacturingEmission: 12500,
    emissionPerKm: 0.11,
    disposalEmission: 1800,
    tailpipeEmission: 0,
    greenwashScore: 30,
    isGreenwashingRisk: false
  },

  // ================= GMC =================
  {
    name: "GMC Sierra",
    brand: "GMC",
    vehicleType: "ICE",
    manufacturingEmission: 9600,
    emissionPerKm: 0.30,
    disposalEmission: 1600,
    tailpipeEmission: 3400,
    greenwashScore: 44,
    isGreenwashingRisk: true
  },
  {
    name: "GMC Hummer EV",
    brand: "GMC",
    vehicleType: "EV",
    manufacturingEmission: 14000,
    emissionPerKm: 0.12,
    disposalEmission: 2000,
    tailpipeEmission: 0,
    greenwashScore: 35,
    isGreenwashingRisk: false
  },

  // ================= DODGE =================
  {
    name: "Dodge Charger",
    brand: "Dodge",
    vehicleType: "ICE",
    manufacturingEmission: 8800,
    emissionPerKm: 0.29,
    disposalEmission: 1500,
    tailpipeEmission: 3200,
    greenwashScore: 41,
    isGreenwashingRisk: true
  },

  // ================= CADILLAC =================
  {
    name: "Cadillac Escalade",
    brand: "Cadillac",
    vehicleType: "ICE",
    manufacturingEmission: 9800,
    emissionPerKm: 0.32,
    disposalEmission: 1700,
    tailpipeEmission: 3600,
    greenwashScore: 47,
    isGreenwashingRisk: true
  },
  {
    name: "Cadillac Lyriq",
    brand: "Cadillac",
    vehicleType: "EV",
    manufacturingEmission: 11000,
    emissionPerKm: 0.09,
    disposalEmission: 1600,
    tailpipeEmission: 0,
    greenwashScore: 27,
    isGreenwashingRisk: false
  }
]);

console.log("Seeded EXACTLY 100 Vehicles - Full Schema Complete!");
process.exit();
