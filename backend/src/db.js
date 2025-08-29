import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const MONGO_DB = process.env.MONGO_DB;

const connectDB = async () =>{
    try {

        const conn = await mongoose.connect(MONGO_DB);

        console.log(`${conn.connection.host} is connected`)
        
    } catch (error) {
        console.log("Error to the database ", error);
        process.exit(1);
    }
}

export default connectDB;