import dotenv from 'dotenv';
import connectDB from './db/connection.js';
import app from './app.js';

dotenv.config(); 

connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
});
