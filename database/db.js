import mongoose from "mongoose";
import "dotenv/config"

export const connectDB = async() =>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/youtube-backend`)
        console.log("MongoDB connected successfully!!")
    } catch (error) {
        console.log("Database Connection Error" , error)
    }
}