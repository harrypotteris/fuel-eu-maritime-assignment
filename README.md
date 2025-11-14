# 🚢 FuelEU Maritime — Full-Stack Developer Assignment

### **Backend:** Express + Prisma + PostgreSQL  
### **Frontend:** React + TypeScript + Vite + TailwindCSS  

This project implements core components of a **FuelEU Maritime Compliance Platform**, including:

- Maritime Route Management  
- Baseline & Intensity Comparison  
- Carbon Balance (CB) Calculations  
- Banking of Surplus Credits  
- Pooling with Greedy Allocation  
- Dashboard Insights  

The system follows **clean hexagonal architecture** and demonstrates strong engineering quality and structure.

---

## 📦 Project Structure

fuel-eu-maritime-assignment/
│
├── backend/
│ ├── prisma/
│ └── src/
│
└── frontend/
├── public/
└── src/

yaml
Copy code

---

# 🛠️ 1. Backend Overview (Express + Prisma)

## ✨ Features

### 🚢 Routes
- Fetch routes (with filters: year, vessel type, fuel type)
- Set baseline route
- Compare all routes of a given year with the baseline
- Compliance check

### 📉 Compliance
- Compute GHG intensity  
- Compute Carbon Balance (CB)  
- Check if values cross allowed thresholds  

### 💰 Banking
- Add banked surplus credits  
- View banking history  
- Apply stored credits to specific years  

### 🤝 Pooling
- Create pool for a year  
- Apply greedy allocation algorithm to distribute CB  
- Store pool results  

---

## 📁 Backend Folder Structure

backend/
├── prisma/
│ ├── schema.prisma
│ └── seed.ts
├── src/
│ ├── core/
│ │ ├── domain/
│ │ └── application/
│ ├── adapters/
│ │ ├── inbound/http/
│ │ └── outbound/
│ ├── infra/
│ ├── index.ts
│ └── server.ts
├── package.json
└── tsconfig.json

yaml
Copy code

---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup

```bash
cd backend
npm install
2️⃣ Environment Setup (backend/.env)
ini
Copy code
DATABASE_URL="postgresql://user:password@localhost:5432/fueleu"
3️⃣ Prisma Migration
bash
Copy code
npx prisma generate
npx prisma migrate dev
4️⃣ Start Backend
bash
Copy code
npm run dev
➡ Backend runs at: http://localhost:3000



 ##📡 API Endpoints
   ##🛳️ Routes
   Method	Endpoint	Description
   GET	/api/routes	Fetch routes with filters
   POST	/api/routes/:id/baseline	Set baseline route
   GET	/api/routes/comparison	Compare intensities
   
   ##📉 Compliance
   Method	Endpoint	Description
   GET	/api/compliance/cb?routeId=R001	Calculate Carbon Balance
   
   ##💰 Banking
   Method	Endpoint	Description
   GET	/api/banking/records	Get banking history
   POST	/api/banking/bank	Add banked credit
   POST	/api/banking/apply	Use banked credits
   
   ##🤝 Pooling
   Method	Endpoint	Description
   POST	/api/pools	Create pool
   
   ##🎨 2. Frontend Overview (React + Tailwind)
   ##✨ Features
   Route list + filter UI
   
   Baseline selection screen
   
   Intensity comparison charts
   
   Carbon Balance (CB) calculator
   
   Banking: add, apply, history
   
   Pool creation UI + greedy result table
   
   Dashboard visual analytics
   
   ##📁 Frontend Structure
   pgsql
   Copy code
   frontend/
    ├── public/
    ├── src/
    │    ├── components/
    │    ├── pages/
    │    ├── hooks/
    │    ├── services/
    │    ├── App.tsx
    │    ├── main.tsx
    │    └── index.css
    ├── package.json
    └── vite.config.ts
   ##⚙️ Frontend Setup
   1️⃣ Install
   bash
   Copy code
   cd frontend
   npm install
   2️⃣ Environment Setup (frontend/.env)
   ini
   Copy code
   VITE_API_URL="http://localhost:3000"
   3️⃣ Run Frontend
   bash
   Copy code
   npm run dev
   ➡ Frontend runs at: http://localhost:5173
   
   ##🔗 API Integration (Axios)
   ts
   Copy code
   const api = axios.create({
     baseURL: import.meta.env.VITE_API_URL,
   });
   ##🚀 Build & Deployment
   Backend
   bash
   Copy code
   npm run build
   npm start
   Frontend
   bash
   Copy code
   npm run build
   npm run preview
   Deployment Targets:
   Vercel
   
   Netlify
   
   GitHub Pages
   
   Cloudflare Pages
   
   AWS S3
   
   ##📊 Recommendations & Enhancements
   Add JWT Auth (Admin / User)
   
   Add Swagger API documentation
   
   Add Docker Compose (DB + backend + frontend)
   
   Add error boundary screens
   
   Add Lighthouse-optimized UX
   
   Add unit + integration tests
   

