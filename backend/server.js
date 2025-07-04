// Entry point for backend (Express server)
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();


const cors = require('cors');
app.use(cors({
  origin: 'https://todo-frontend-8in7.onrender.com', // your deployed frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());


// MongoDB connection
const connectDB = require('./config/db');
connectDB();



// Auth routes
app.use('/api/auth', require('./routes/authRoutes'));
// Todo routes
app.use('/api/todos', require('./routes/todoRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
