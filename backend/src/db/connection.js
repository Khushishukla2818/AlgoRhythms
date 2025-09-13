import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Use env variable directly
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected successfully: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        process.exit(1);
    }
};

export default connectDB;
