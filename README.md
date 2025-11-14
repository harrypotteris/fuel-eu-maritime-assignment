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



 
