# FuelEU Maritime Backend – Express + Prisma + TypeScript

This backend provides APIs for:

- Maritime routes, baselines, and comparisons
- GHG compliance calculations (CB, intensity comparisons)
- Banking (surplus banking, applying banked amounts)
- Pooling (greedy allocation algorithm)
- Storage using Prisma + PostgreSQL

The project follows a clean hexagonal architecture:

backend/
prisma/
src/
core/
domain/
application/
adapters/
inbound/http
outbound/
infra/

yaml
Copy code

---

## Features

### 1. Route Management
- Fetch routes with optional filters (year, vessel type, fuel type)
- Set baseline route per year
- Compare all routes of a year with the baseline
- Determine compliance against a threshold

### 2. Compliance Calculations
Compute CB (Compliance Balance) for any route using:

```ts
computeCB(ghgIntensity, fuelConsumption)
3. Banking System
Ships can:

Bank surplus compliance

View banked records

Apply banked credits

4. Pooling System
Create pools for a given year

Distribute CB using allocatePoolGreedy()

Save pool and member results to the database

Installation
1. Clone the repository
bash
Copy code
git clone <your-repo-url> backend
cd backend
2. Install dependencies
bash
Copy code
npm install
3. Setup environment variables
Create a .env file in the root:

ini
Copy code
DATABASE_URL="postgresql://user:password@localhost:5432/yourdb"
4. Prisma setup
bash
Copy code
npx prisma generate
npx prisma migrate dev
5. Run the development server
bash
Copy code
npm run dev
API Endpoints
Routes
GET /api/routes
Optional query parameters:

bash
Copy code
/api/routes?year=2024&vesselType=Tanker&fuelType=LNG
Returns all routes matching filters.

POST /api/routes/:routeId/baseline
Sets the specified route as the baseline for its year.

GET /api/routes/comparison
Generates baseline-vs-other route comparisons:

baseline intensity

other route intensity

percent difference

compliance status (<= 89.3368)

Compliance
GET /api/compliance/cb?routeId=R001
Returns:

json
Copy code
{ "cb": number }
Computed using:

ts
Copy code
computeCB(ghgIntensity, fuelConsumption)
Banking
GET /api/banking/records?shipId=SHIP1&year=2025
Fetch banking history for a ship.

POST /api/banking/bank
Body:

json
Copy code
{
  "shipId": "SHIP1",
  "year": 2025,
  "amount": 12.4
}
POST /api/banking/apply
Body:

json
Copy code
{
  "shipId": "SHIP1",
  "year": 2025,
  "amount": 5
}
Pooling
POST /api/pools
Body:

json
Copy code
{
  "year": 2025,
  "members": [
    { "shipId": "A", "cbBefore": 5 },
    { "shipId": "B", "cbBefore": -3 }
  ]
}
Uses:

allocatePoolGreedy()

Saves pool + poolMember entries to DB

Project Structure
pgsql
Copy code
backend/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   ├── core/
│   │   ├── domain/           # Entity types, interfaces
│   │   └── application/      # computeCB, banking, pooling, etc.
│   │
│   ├── adapters/
│   │   ├── inbound/http      # Express route handlers
│   │   └── outbound/         # Prisma client
│   │
│   ├── infra/                # Server, config, middleware
│   ├── server.ts
│   └── index.ts
│
└── package.json
Testing (Optional)
Install Jest:

bash
Copy code
npm install --save-dev jest ts-jest @types/jest
npx ts-jest config:init
Build & Deploy
Build:
bash
Copy code
npm run build
Start production server:
bash
Copy code
npm start
yaml
Copy code
