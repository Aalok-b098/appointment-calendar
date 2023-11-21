// backend/config/dbConfig.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

async function initializeDatabase() {

    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            console.error('MongoDB URI is missing in .env file.');
            process.exit(1);
        }
        mongoose.connect(mongoUri);
        console.log("connected to db successfully")
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default initializeDatabase;