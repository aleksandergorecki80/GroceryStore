const express = require('express');
const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});