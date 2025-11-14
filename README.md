FuelEU Maritime — Full-Stack Developer Assignment
Backend: Express + Prisma + PostgreSQL
Frontend: React + TypeScript + Vite + Tailwind

This full-stack project implements parts of a FuelEU Maritime Compliance Platform, designed to support:

Maritime route management

GHG intensity comparisons

Compliance calculations (Carbon Balance, thresholds)

Banking of surplus credits

Pool creation with greedy allocation

Dashboard insights

The repository demonstrates clean engineering, hexagonal architecture, and use of AI-assisted productivity tools.

🚢 1. Project Architecture
📦 fuel-eu-maritime-assignment
 ├── backend/
 │    ├── prisma/
 │    └── src/
 └── frontend/
      ├── src/
      └── public/

🛠 2. Backend Overview (Express + Prisma + PostgreSQL)
✨ Features
Routes

Fetch routes with filters (year, vessel type, fuel type)

Set baseline route

Compare yearly routes vs baseline

Return compliance status

Compliance

GHG intensity calculation

Carbon Balance (CB) computation

Threshold evaluation

Banking

Bank surplus credits

View banked credit history

Apply credits to years

Pooling

Create pool

Greedy CB allocation

Store pool results

📁 Backend Structure
backend/
 ├── prisma/
 │    ├── schema.prisma
 │    └── seed.ts
 ├── src/
 │    ├── core/
 │    │    ├── domain/
 │    │    └── application/
 │    ├── adapters/
 │    │    ├── inbound/http/
 │    │    └── outbound/
 │    ├── infra/
 │    ├── server.ts
 │    └── index.ts
 ├── package.json
 └── tsconfig.json

⚙️ Setup
1. Install
cd backend
npm install

2. Configure DB

Create backend/.env:

DATABASE_URL="postgresql://user:password@localhost:5432/fueleu"

3. Prisma setup
npx prisma generate
npx prisma migrate dev

4. Run server
npm run dev


Backend runs at: http://localhost:3000

📡 API Endpoints
Routes
Method	Endpoint	Description
GET	/api/routes	Fetch routes with filters
POST	/api/routes/:id/baseline	Set baseline route
GET	/api/routes/comparison	Compare intensities
Compliance
Method	Endpoint	Description
GET	/api/compliance/cb?routeId=R001	Calculate CB
Banking
Method	Endpoint	Description
GET	/api/banking/records	Bank history
POST	/api/banking/bank	Add banked credit
POST	/api/banking/apply	Use banked credits
Pooling
Method	Endpoint	Description
POST	/api/pools	Create pool
🎨 3. Frontend Overview (React + TypeScript + Vite + Tailwind)
✨ Features

Route list + filter UI

Baseline selection interface

Intensity comparison charts

CB calculation UI

Banking pages (add, apply, history)

Pool creation UI + greedy result table

Dashboard analytics

📁 Frontend Structure
frontend/
 ├── src/
 │    ├── components/
 │    ├── pages/
 │    ├── hooks/
 │    ├── services/
 │    ├── App.tsx
 │    ├── main.tsx
 │    └── index.css
 ├── public/
 └── package.json

⚙️ Setup
1. Install
cd frontend
npm install

2. Configure environment

Create frontend/.env:

VITE_API_URL="http://localhost:3000"

3. Run
npm run dev


Frontend runs at: http://localhost:5173

🔗 4. API Integration (Axios)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

📦 5. Build & Deploy
Backend
npm run build
npm start

Frontend
npm run build
npm run preview


Host build directory (dist/) on:

Vercel

Netlify

GitHub Pages

AWS S3

📊 6. Suggested Enhancements

Add JWT login system

Add admin/user roles

Add proper error boundary components

Add dark/light mode

Add Swagger API documentation

Add Docker Compose (DB + backend + frontend)

👨‍💻 7. Technologies Used
Layer	Tech
Frontend	React, TypeScript, Vite, Tailwind, React Router, Axios
Backend	Node.js, Express, Prisma, PostgreSQL, Zod
Infra	Hexagonal Architecture
Tools	GitHub Copilot, Cursor, Claude, OpenAI
