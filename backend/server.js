// backend/server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import initializeDatabase from './src/config/dbConfig.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Initialize the database
const initializeDB = async () => {
    await initializeDatabase();
    console.log('Connected to MongoDB');
};

initializeDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});