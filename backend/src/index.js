import dotenv from 'dotenv';
import connectDB from './db/connection.js';
import app from './app.js';


dotenv.config();

// Connect to MongoDB
connectDB()
    .then(() => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error);
        process.exit(1);
    });
