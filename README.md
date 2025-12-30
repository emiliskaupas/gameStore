# Game Store App

## Technologies Used

- **Backend:** Node.js (Express)
- **Frontend:** React (Vite)
- **Database:** PostgreSQL

## Deployment

- **Backend & Database Hosting:** [Render](https://render.com/) (free tier)
- **Frontend Hosting:** [Vercel](https://vercel.com/) (free tier)

All deployments use free service tiers.

A full-stack game store application with a Node.js/Express backend and a React (Vite) frontend.

---

## Deployed URLs

- **Frontend (Vercel):** https://game-store-drab-delta.vercel.app
- **Backend (Render):** https://gamestore-hn2a.onrender.com/api/list

---

## Public API Endpoints

All endpoints are prefixed with `/api` (e.g., `http://localhost:5000/api/list`).

| Method | Endpoint         | Description                        |
|--------|------------------|------------------------------------|
| GET    | /list            | Get all games (optionally filtered by search) |
| GET    | /games/:id       | Get a single game by ID            |
| POST   | /games           | Create a new game                  |
| PUT    | /games/:id       | Update a game by ID                |
| DELETE | /games/:id       | Delete a game by ID                |

---

## Local Development Setup

### 1. Clone the Repository
```
git clone https://github.com/emiliskaupas/gameStore.git
cd gameStore
```

### 2. Start the Backend
1. Open a terminal and navigate to the backend folder:
   ```
   cd Game_Store_Server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in `Game_Store_Server` with your PostgreSQL connection string:
   ```
   DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
   ```
4. Start the backend server:
   ```
   npm start
   ```
   The backend will run at http://localhost:5000

### 3. Start the Frontend
1. Open a new terminal and navigate to the frontend folder:
   ```
   cd Game_Store_Client
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in `Game_Store_Client` with:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```
4. Start the frontend (Vite dev server):
   ```
   npm run dev
   ```
   The frontend will run at http://localhost:5173

---

##  API Documentation (locally)
- Swagger UI is available at `/api-docs` on the backend URL.
