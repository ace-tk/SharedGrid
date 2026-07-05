# SharedGrid

A real-time collaborative block claiming platform where multiple users can simultaneously claim cells on a shared 30×30 grid. Built as a full-stack internship assignment demonstrating production-quality software engineering across a modern web stack.

[![Node.js](https://img.shields.io/badge/Node.js-22.x-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-black)](https://socket.io/)
[![MySQL](https://img.shields.io/badge/MySQL-9.x-orange)](https://www.mysql.com/)

---

## Features

- 🔲 **30×30 Interactive Grid** — 900 individually claimable blocks rendered from MySQL
- ⚡ **Real-Time Synchronization** — Socket.IO broadcasts every claim to all connected clients instantly
- 🎨 **Custom Color Claiming** — Users pick their own display color when claiming a block
- 🛡️ **Conflict Prevention** — Server-side validation prevents duplicate claims; already-claimed blocks are non-interactive
- 👥 **Live Online Users** — Shows the current number of connected users updated in real-time
- 📊 **Live Stats** — Total, claimed, and available block counts update automatically after each claim
- 📱 **Responsive Design** — Full desktop grid with horizontal scroll on mobile/tablet
- 🔌 **Connection Status** — Live/Reconnecting/Disconnected indicator in the header

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 (Vite) | UI framework and build tool |
| Tailwind CSS | Utility-first styling |
| React Router DOM | Client-side routing |
| Axios | HTTP API client |
| Socket.IO Client | Real-time WebSocket communication |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express | HTTP server and REST API |
| Socket.IO | Real-time bidirectional event layer |
| MySQL2 (Promise API) | Database driver with connection pooling |
| dotenv | Environment variable management |
| cors | Cross-origin request handling |
| nodemon | Development auto-restart |

### Database
- **MySQL** — Stores all 900 blocks with ownership and claim metadata

---

## Architecture

```
Browser (React + Socket.IO Client)
        │
        │  HTTP REST (Axios)
        ▼
Express Server  ──────►  MySQL Database
        │                (Connection Pool)
        │  Socket.IO Broadcast
        ▼
All Connected Clients
(Grid updates in real-time)
```

**Data flow for a block claim:**
1. User clicks an unclaimed cell → ClaimModal opens
2. User submits name + color → `POST /api/grid/claim/:id`
3. Server validates the block is unclaimed in MySQL
4. Server writes `owner_name`, `owner_color`, `claimed = true`, `claimed_at` to DB
5. Server emits `block-claimed` event via Socket.IO to **all** connected clients
6. Every browser updates only the affected block in React state — no page refresh

---

## Folder Structure

```
SharedGrid/
├── client/                        # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ClaimModal.jsx     # Claim form modal
│   │   │   ├── Grid.jsx           # 30x30 grid container
│   │   │   ├── GridCell.jsx       # Individual block cell
│   │   │   ├── GridLegend.jsx     # Color key above grid
│   │   │   └── Header.jsx         # Top bar with stats + status
│   │   ├── context/
│   │   │   └── SocketContext.jsx  # Global socket state provider
│   │   ├── hooks/
│   │   │   └── useSocket.js       # Socket context consumer hook
│   │   ├── pages/
│   │   │   └── Home.jsx           # Main page — owns grid state
│   │   ├── services/
│   │   │   ├── api.js             # Axios instance
│   │   │   ├── grid.api.js        # Grid API calls
│   │   │   └── socket.js          # Socket.IO client instance
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx                # Router + SocketProvider wrapper
│   │   └── index.css              # Tailwind base styles
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                        # Express backend
│   ├── config/
│   │   ├── db.js                  # MySQL connection pool
│   │   └── env.js                 # Environment variable exports
│   ├── controllers/
│   │   ├── grid.controller.js     # Grid route handlers
│   │   └── health.controller.js  # Health check handler
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   │   ├── grid.routes.js         # /api/grid route definitions
│   │   └── index.routes.js        # / route definitions
│   ├── services/
│   │   ├── grid.service.js        # Grid DB operations
│   │   └── health.service.js      # Health DB queries
│   ├── sockets/
│   │   └── socketManager.js       # Socket.IO event handlers + broadcaster
│   ├── utils/
│   ├── app.js                     # Express app config (middleware + routes)
│   ├── server.js                  # HTTP server + Socket.IO bootstrap
│   ├── schema.sql                 # Database table definition
│   ├── seed.sql                   # 900-row grid seed data
│   ├── .env.example               # Environment variable template
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## API Endpoints

### `GET /health`
Returns server and database status with block statistics.

**Response**
```json
{
  "server": "running",
  "database": "connected",
  "totalBlocks": 900,
  "claimedBlocks": 12,
  "availableBlocks": 888
}
```

**Error Response (503)**
```json
{
  "server": "running",
  "database": "disconnected",
  "error": "Database connection failed: ..."
}
```

---

### `GET /api/grid`
Returns all 900 blocks ordered by row then column.

**Response**
```json
{
  "success": true,
  "total": 900,
  "blocks": [
    {
      "id": 1,
      "row_index": 0,
      "col_index": 0,
      "owner_name": null,
      "owner_color": null,
      "claimed": false,
      "claimed_at": null,
      "created_at": "2026-07-04T00:00:00.000Z",
      "updated_at": "2026-07-04T00:00:00.000Z"
    }
  ]
}
```

---

### `POST /api/grid/claim/:id`
Claims a specific block. Fails if the block is already claimed.

**Request Body**
```json
{
  "ownerName": "Tisha",
  "ownerColor": "#6366f1"
}
```

**Success Response (200)**
```json
{
  "success": true,
  "block": {
    "id": 42,
    "row_index": 1,
    "col_index": 11,
    "owner_name": "Tisha",
    "owner_color": "#6366f1",
    "claimed": true,
    "claimed_at": "2026-07-05T10:30:00.000Z"
  }
}
```

**Error Response (400)**
```json
{
  "success": false,
  "error": "Block is already claimed"
}
```

---

## Socket.IO Events

| Event | Direction | Payload | Description |
|---|---|---|---|
| `connection-success` | Server → Client | `{ socketId, connectedAt }` | Emitted only to the connecting socket |
| `online-users` | Server → All | `{ onlineUsers }` | Broadcast on connect and disconnect |
| `block-claimed` | Server → All | `{ block }` | Broadcast after every successful claim |

---

## Installation

### Prerequisites
- Node.js v18+
- MySQL 8+ running locally

### 1. Clone the Repository
```bash
git clone https://github.com/ace-tk/SharedGrid.git
cd SharedGrid
```

### 2. Install Dependencies

**Backend**
```bash
cd server
npm install
```

**Frontend**
```bash
cd ../client
npm install
```

### 3. Configure Environment Variables
```bash
cd server
cp .env.example .env
```

Open `server/.env` and fill in your MySQL credentials:
```
PORT=5001
CLIENT_URL=http://localhost:5173
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=shared_grid
```

### 4. Create the Database
```sql
CREATE DATABASE shared_grid;
```

### 5. Import Schema
```bash
mysql -u root -p shared_grid < server/schema.sql
```

### 6. Import Seed Data
```bash
mysql -u root -p shared_grid < server/seed.sql
```

### 7. Verify Database
```bash
mysql -u root -p -e "SELECT COUNT(*) FROM shared_grid.blocks;"
# Expected: 900
```

### 8. Start the Backend
```bash
cd server
npm run dev
# Server running on http://localhost:5001
```

### 9. Start the Frontend
```bash
cd client
npm run dev
# App running on http://localhost:5173
```

---

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | No | `5001` | Express server port |
| `CLIENT_URL` | No | `http://localhost:5173` | CORS origin for frontend |
| `DB_HOST` | No | `localhost` | MySQL host |
| `DB_PORT` | No | `3306` | MySQL port |
| `DB_USER` | Yes | — | MySQL username |
| `DB_PASSWORD` | Yes | — | MySQL password |
| `DB_NAME` | Yes | — | MySQL database name |

---

## Development Commands

| Command | Location | Description |
|---|---|---|
| `npm run dev` | `server/` | Start backend with nodemon |
| `npm start` | `server/` | Start backend (production) |
| `npm run dev` | `client/` | Start Vite dev server |
| `npm run build` | `client/` | Build production bundle |

---

## Future Improvements

- 🔐 **Authentication** — JWT-based user accounts to tie claims to persistent identities
- 🧑‍💼 **Persistent User Sessions** — Remember users across page reloads via localStorage or cookies
- ↩️ **Undo Claim** — Allow owners to release their claimed blocks within a time window
- 🔍 **Search by Owner** — Filter or highlight grid cells by owner name
- 📊 **Analytics Dashboard** — Visualize claiming activity, top claimers, and time-series stats
- 🐳 **Docker Deployment** — Containerize backend, frontend, and MySQL with Docker Compose
- ☸️ **Kubernetes Deployment** — Orchestrate containers for horizontal scaling
- ⚡ **Redis Caching** — Cache the full grid state to reduce MySQL queries under high load
- 🎨 **Color Themes** — Allow users to toggle between light, dark, and custom themes
- 🗺️ **Claim History** — Audit log of who claimed what block and when

---


