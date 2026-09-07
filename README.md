# PurvaDrishti 🏔️ 🛡️

> A disaster monitoring and early-warning platform for Northeast India that combines rainfall tracking, landslide risk assessment, road vulnerability, forest fire monitoring, drone intelligence, alerts, and emergency simulations in one centralized dashboard.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-REST_API-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-success?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?logo=tailwind-css)

PurvaDrishti is designed to help authorities maintain situational awareness and trigger early warnings before extreme weather events escalate into full-scale disasters across the Northeast region of India (NER).

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [The Solution](#the-solution)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [How The System Works](#how-the-system-works)
- [Risk Calculation Engine](#risk-calculation-engine)
- [Database Models](#database-models)
- [API Documentation](#api-documentation)
- [Installation & Setup](#installation--setup)
- [Running the Project](#running-the-project)
- [Demo Flow](#demo-flow)
- [Project Status & Future Enhancements](#project-status)
- [Contributing](#contributing)

---

## Problem Statement

Northeast India frequently experiences severe natural disasters driven by heavy rainfall, resulting in devastating landslides, flash floods, road blockages, and forest fires. Monitoring these risks traditionally requires checking multiple disparate systems (weather forecasts, geological surveys, traffic advisories, and forestry reports), making it difficult for disaster response teams to maintain a unified, real-time operating picture. 

## The Solution

PurvaDrishti centralizes multiple environmental signals into a single, intuitive MERN-stack dashboard. It ingests weather data, applies weighted risk scoring formulas to calculate regional vulnerability, tracks blocked highways, monitors thermal anomalies for fires, and allows emergency commanders to broadcast early-warning alerts.

```text
Open-Meteo Weather API + Live Telemetry
                ↓
    Express REST APIs & Risk Engine
                ↓
    MongoDB Storage / Memory Fallback
                ↓
          React Dashboard
                ↓
      Alerts + Insights + Actions
```

---

## Key Features

### 🌧️ Rainfall Monitoring
Integrates with the Open-Meteo API to pull live and forecasted precipitation data across Northeast states (Assam, Meghalaya, Arunachal Pradesh, Sikkim, Nagaland, Manipur, Mizoram, Tripura), complete with historical hourly trend charts.

### ⛰️ Landslide Risk Engine
Uses a transparent formula-based scoring engine (0-100) combining rainfall density, slope gradient, soil saturation, and vegetation cover to classify district vulnerabilities (Low, Moderate, High, Critical).

### 🛣️ Road & Highway Risk
Tracks the status of critical mountain passes and highway corridors. Flags roads as "Clear," "Caution," or "Blocked" based on reported active slips.

### 🔥 Forest Fire Risk
Monitors forest zones using thermal hotspots, needle dryness index, and wind speed to issue fire warnings.

### 🚁 Drone Monitoring
A simulated UAV fleet management dashboard showing drone coordinates, battery levels, flight status, and live camera feed placeholders for aerial disaster assessment.

### 🚨 Disaster Alerts Center
A broadcast hub to issue, track, and resolve emergency advisories (e.g., Flash flood warnings) detailing severity, cause, location, and recommended action directives.

### 📜 Historical Incidents Archive
A searchable repository of past disaster events, tracking casualties, damages, and affected areas for pattern analysis.

### 🌩️ Emergency Simulation Sandbox
An interactive tool that lets users simulate massive cloudburst events (e.g., +150mm rainfall) and instantly recalculates the entire region's risk scores and blocked roads to demonstrate predictive capabilities.

### 🗺️ Interactive GIS Map
A fully interactive topographic map powered by Leaflet, visualizing state/district boundaries, heat anomalies, blocked roads, and deployed drones.

---

## System Architecture

```text
React Frontend (Vite, React Router, Tailwind CSS, Recharts, Leaflet)
      │
      ▼
Express REST API (Node.js)
      │
      ├── Mongoose Models & MongoDB
      │
      ├── Risk & Simulation Services
      │
      └── External APIs (Open-Meteo)
```

---

## Project Structure

```text
PurvaDrishti/
├── frontend/             # React Frontend Application
│   ├── src/
│   │   ├── api/          # Axios client for backend communication
│   │   ├── components/   # UI components (Navbar, Hero, Layouts, Charts)
│   │   ├── context/      # React Context (LanguageContext for global state)
│   │   ├── pages/        # Route pages (Dashboard, Map, Rainfall, etc.)
│   │   └── utils/        # Formatting and helper functions
│   └── package.json
├── backend/              # Node.js + Express API
│   ├── data/             # In-memory store fallback and raw seed data
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express router endpoints
│   ├── services/         # Risk engine, Simulation logic, Weather integration
│   ├── server.js         # Entry point for backend
│   ├── seed.js           # Database seeding script
│   └── package.json
├── package.json          # Root scripts for concurrently running both servers
└── README.md
```

---

## Tech Stack

| Technology | Purpose              |
| ---------- | -------------------- |
| **React** | Frontend UI (React 18, React Router v6) |
| **Node.js** | Backend runtime |
| **Express.js** | REST API framework |
| **MongoDB** | Database (Mongoose ORM) |
| **JavaScript** | Core application language |
| **Tailwind CSS** | Utility-first CSS styling |
| **Recharts** | Data visualization & trend charts |
| **Leaflet** | Interactive geospatial mapping |
| **Axios** | HTTP client for API requests |

---

## How The System Works

### 1. The Weather & Risk Workflow
```text
Open-Meteo API
     ↓
Backend Weather Service
     ↓
Risk Calculation Engine (Applies weights to terrain/weather)
     ↓
Risk Score (0-100) & Severity (Low to Critical)
     ↓
Dashboard UI Update
```

### 2. The Simulation Workflow
```text
Base Rainfall Data
     +
User Slider Input (Extra Rainfall mm)
     ↓
Simulation Engine
     ↓
New Risk Score & Generated Alerts
     ↓
UI Delta Comparison (Before vs After)
```

---

## Risk Calculation Engine

PurvaDrishti uses a deterministic mathematical model in the backend (`backend/services/riskEngine.js`) to score risks. 

**Landslide Formula Parameters (Weighted):**
- Rainfall 24h (40%)
- Slope Gradient (25%)
- Soil Saturation (20%)
- Vegetation Cover (15% - acts inversely)

**Severity Thresholds:**
- `0 - 30`: Low
- `31 - 60`: Moderate
- `61 - 80`: High
- `81 - 100`: Critical

*Note: This is a hackathon prototype scoring model, not a certified geological prediction tool.*

---

## Database Models

The system relies on the following MongoDB collections (defined in `backend/models/`):

| Collection / Model | Purpose |
| ------------------ | --------------------------- |
| **District** | District/State weather, geography, and current risk scores |
| **Road** | Mountain passes and highway corridor statuses |
| **Alert** | System-generated or user-broadcasted emergency alerts |
| **Drone** | UAV fleet telemetry, battery levels, and mission status |
| **FireRisk** | Thermal anomalies and forest fire indices |
| **HistoricalIncident**| Archived past disaster records with impact stats |

---

## API Documentation

The Express server exposes the following JSON endpoints:

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| `GET`  | `/api/weather/live` | Fetches aggregated weather & risk data |
| `GET`  | `/api/districts`   | Get district/state risk and geo data |
| `GET`  | `/api/roads`    | Get road vulnerabilities & status |
| `GET`  | `/api/alerts`   | List active and resolved alerts |
| `POST` | `/api/alerts`   | Broadcast a new emergency alert |
| `PATCH`| `/api/alerts/:id/status` | Mark an alert as resolved |
| `GET`  | `/api/drones`   | Fetch live drone fleet telemetry |
| `GET`  | `/api/fire`     | Fetch active forest fire hotspots |
| `GET`  | `/api/history`  | Get historical disaster archive |
| `POST` | `/api/simulation/run` | Execute rainfall surge risk simulation |

---

## Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/your-username/PurvaDrishti.git
cd PurvaDrishti
```

### 2. Install all dependencies
Installs packages for both frontend and backend automatically:
```bash
npm run install:all
```

---

## Environment Variables

Create a `.env` file in the `backend/` directory (you can copy `.env.example`):

```env
# MongoDB Connection String (Required for persistence)
MONGODB_URI=mongodb://127.0.0.1:27017/purvadrishti

# Backend API Port
PORT=5000

# Open-Meteo API URL
OPEN_METEO_URL=https://api.open-meteo.com/v1/forecast
```
*Note: If MongoDB is unavailable, the backend gracefully falls back to a realistic in-memory data store.*

---

## Running the Project

### 1. Seed the Database (Optional but recommended)
Populates MongoDB with realistic starting data for districts, roads, and drones:
```bash
npm run seed
```

### 2. Start the Application
Starts both the Express backend and Vite React frontend concurrently:
```bash
npm run dev
```

- **Frontend Application:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000/api](http://localhost:5000/api)

---

## Demo Flow

For hackathon presentation purposes, try the following flow:
1. **Landing Page:** Open `http://localhost:5173/` to view the public intelligence dashboard.
2. **Dashboard Overview:** Click "Enter PurvaDrishti" to view the executive command center (`/dashboard`).
3. **Rainfall & GIS:** Navigate to `/rainfall` to see live Open-Meteo data, then `/map` for the geospatial view.
4. **Risk Engines:** Check `/landslides` to see how the mathematical formula works.
5. **Issue an Alert:** Go to `/alerts` and broadcast a new manual "Flash Flood" warning.
6. **Simulate a Disaster:** Open `/simulation`, drag the Rainfall Surge slider to `+100mm`, and watch how district vulnerabilities turn "Critical", roads become "Blocked", and automatic alerts are triggered.

---

## Project Status

- **Implemented:** MERN architecture, React Router setup, live Open-Meteo API integration, interactive GIS Leaflet map, mathematical risk engine, drone/fire/road tracking UI, REST APIs, and the emergency simulation sandbox.
- **Planned / Future Enhancement:** Authentication (JWT/OAuth), user roles (Admin, Field Officer), real-time WebSockets for drone telemetry, and a mobile-friendly field responder view.

### Prototype Limitations
- Drone telemetry is currently simulated.
- Risk scores use a deterministic formula, not trained machine learning models.
- If Open-Meteo is rate-limited or MongoDB is offline, the app defaults to fallback memory data to prevent presentation crashes.

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Team

**Smart India Hackathon Team — PurvaDrishti**
