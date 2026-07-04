# SharedGrid

Real-Time Collaborative Block Claiming Platform

## Tech Stack
**Frontend:** React 19 (Vite), Tailwind CSS, React Router DOM, Axios, Socket.IO Client
**Backend:** Node.js, Express, Socket.IO, MySQL2, dotenv, cors, nodemon

## Folder Structure
```
shared-grid/
├── client/          # React frontend
└── server/          # Express/Socket.IO backend
```

## Setup Steps

1. **Install Dependencies**
   ```bash
   npm run install:all
   ```

2. **Environment Variables**
   - Copy `server/.env.example` to `server/.env`
   ```bash
   cp server/.env.example server/.env
   ```

## Development Commands

- **Run both frontend and backend concurrently:**
  ```bash
  npm run dev
  ```
- **Frontend only:**
  ```bash
  cd client && npm run dev
  ```
- **Backend only:**
  ```bash
  cd server && npm run dev
  ```
