const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Import routes
const users = require('./routes/api/users');

// Connect DB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));


// Define routes
app.use('/api/users', users);

console.log(process.env.NODE_ENV)

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});