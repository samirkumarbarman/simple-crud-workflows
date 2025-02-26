import mongoose from "mongoose";
import { DB_NAME } from "../constarints.js";

const connectDB = async () =>{
    try {
        const connect = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        console.log("Database connected :", connect.connection.host);

    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};

export default connectDB;