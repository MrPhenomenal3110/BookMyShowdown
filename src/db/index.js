import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();


const connectDB = async () => {
    try {
        console.log(`${process.env.DB_CONNECTION_STRING}/${process.env.DB_NAME}`)
        const connectionInstance = await mongoose.connect(`${process.env.DB_CONNECTION_STRING}/${process.env.DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB