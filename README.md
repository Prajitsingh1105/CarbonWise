# 🌍 CarbonWise

**AI-Powered Vehicle Emission Analytics & Greenwashing Detection**

CarbonWise is a full-stack sustainability platform that analyzes vehicle lifecycle emissions and detects greenwashing in automotive marketing claims using AI + rule-based intelligence. Built for hackathon-level rapid deployment with scalable architecture.

## 🚀 Problem Statement

Many automotive brands market vehicles as:
- "Zero Emission"
- "Eco-Friendly" 
- "Sustainable"

**However:**
- Manufacturing emissions
- Lifecycle emissions
- Disposal emissions
- Electricity source emissions (for EVs)
are often **hidden or ignored**.

**CarbonWise solves this by:**
- Providing emission analytics
- Comparing vehicle types (EV / Hybrid / ICE)
- Detecting potential greenwashing in marketing claims

## 🧠 Key Features

### ✅ 1. Greenwashing Detection Engine
Hybrid scoring system:
- Rule-based risk detection
- Manufacturing emission logic
- Tailpipe emission analysis
- Optional Local LLM explanation engine
- Confidence scoring (0–100%)
- High/Low Risk classification
- Dynamic keyword highlighting in UI

### 📊 2. Emission Analytics Dashboard
- 100+ seeded vehicles
- Brand-wise analysis
- Vehicle-type comparison (EV / Hybrid / ICE)
- Lifecycle emission breakdown:
  - Manufacturing Emission
  - Tailpipe Emission  
  - Disposal Emission
- Average emission insights
- High-risk greenwashing category detection

### 🔍 3. Vehicle Comparison
- Compare emissions between multiple vehicles
- View lifecycle carbon footprint
- Analyze sustainability performance

## 🏗️ Tech Stack

### Frontend (Client)
- React
- Vite
- TailwindCSS
- FramerMotion
- Chart.js/Recharts
- Axios
- Run with:
  - cd client
  - npm install
  - npm run dev
### Backend (Server - Node.js)
- Express.js
- MongoDB (Mongoose)
- REST APIs
- Analytics route
- AI route integration
- Run with:
  - cd server
  - npm install
  - npm run dev
 
### Local AI Engine:
- Located in:
    - server/ai_local/
- Build with
    - FastAPI
    - Lightweight HuggingFace model (for explanation only)
    - Deterministic scoring logic
- Run with:
    - uvicorn server.ai_local.server:app --reload --port 5000
- Note:
The system works even without LLM.
LLM is only used for explanation generation.

## 🗂️ Project Structure
- carbonwise/
- │
- ├── client/ → React Frontend
- │
- ├── server/
- │ ├── ai_local/ → Local LLM (FastAPI)
- │ ├── models/
- │ ├── routes/
- │ ├── server.js → Express backend
- │
- └── README.md

## 🌱 Database Setup
- Create MongoDB Atlas cluster
- Add connection string to .env inside server
- Example:
  - PORT=5000
  - MONGO_URI=your_mongodb_connection_string
  - JWT_SECRET=your_secret_key

 ## 🌍 Seed Vehicle Data
 - To seed 100+ vehicles:
    - cd server
    - npm run seed
- Vehicles include:
Tesla
Toyota
Ford
Honda
Hyundai
Tata
Mahindra
BMW
Audi
Rivian
GMC
and more
- Each vehicle includes:
    - Manufacturing Emission
    - Emission Per KM
    - Disposal Emission
    - Vehicle Type
## 🧮 Greenwashing Risk Logic
- Hybrid Detection Model:
  - Suspicious marketing keywords
  - Claim vs real emission mismatch
  - Manufacturing emission penalty
  - Vehicle type emission weight
  - Deterministic scoring
  - LLM explanation generation
- This ensures:
  - Stable scoring
  - No random AI outputs
 
## 👨‍💻 Developed By
- Team: Code Quients
- Team Members:
    - Prajit Kumar Singh
    - Abhinav Singh
    - Umang Rana
    - Kashaf Noor
- *CarbonWise : Hackthon Project*
