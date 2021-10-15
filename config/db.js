const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    const connect = await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`Connected to ${connect.connection.host}`);
}

module.exports = connectDB;