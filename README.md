# todo_manager

A fullstack MERN (MongoDB, Express, React, Node.js) todo manager app.

## Structure

- `frontend/` — React app (client)
- `backend/` — Express API server (Node.js)

## Getting Started


### Frontend
1. Navigate to `frontend` and run:
   - `npm install` (install dependencies)
   - `npm start` (start the React dev server)

### Backend
1. Navigate to `backend` and run:
   - `npm install` (install dependencies)
   - `npm install dotenv` (for environment variables)
   - Create a `.env` file with your MongoDB Atlas connection string:
     ```
     MONGO_URI=your_connection_string
     ```
   - `node server.js` (start the backend server)

---

## Features
- Add, edit, complete, and delete todos
- All data is stored in MongoDB Atlas (cloud)
- React frontend communicates with Express backend via REST API

---