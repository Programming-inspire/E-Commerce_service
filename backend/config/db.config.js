const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(URI);
        console.log('MongoDB connected');
    } catch(err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;