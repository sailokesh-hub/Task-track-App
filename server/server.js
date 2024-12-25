const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT token generation

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Import User model
const User = require('./models/Users');
// Routes
app.use('/', require('./routes/users'));

// Import Task route
const taskRoutes = require('./routes/tasks');
app.use('/', taskRoutes); // Use the task routes under /api



// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));