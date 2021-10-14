const express = require('express');
const connectDB = require('./db');
const app = express();

// Import routes
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const admin = require('./routes/api/admin');
const resetpassword = require('./routes/api/resetpassword');

// Connect DB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));


// Define routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/admin', admin);
app.use('/api/resetpassword', resetpassword);

console.log(process.env.NODE_ENV)

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});