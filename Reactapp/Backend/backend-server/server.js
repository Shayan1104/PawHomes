require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const app = require('./App'); // Import the app instance from app.js\node


// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
