const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Import routes
const users = require('./routes/users');
const auth = require('./routes/auth');
const admin = require('./routes/admin');
const resetpassword = require('./routes/resetpassword');
const products = require('./routes/products');

// Import middleware
const logger = require('./middleware/logger');
const morgan = require('morgan');

// Connect DB
connectDB();

// Init Middleware
app.use(express.json());
app.use(logger);

// Dev logging middleware
if (process.env.NODE_ENV === 'dev'){
  app.use(morgan('dev'))
}

// Define routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/admin', admin);
app.use('/api/resetpassword', resetpassword);
app.use('/api/v1/products', products);

// PRODUCTION STATIC ASSETS
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./client/build'));
    app.get('^(?!api\/)[\/\w\.\,-]*', (req, res) => {
      res.sendFile(path.resolve(__dirname, './client', 'build', 'index.html'));
    });
  }
  
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode at port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err} on ${promise}`);
  server.close(() => process.exit(1));
})