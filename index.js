import express from "express"
import "dotenv/config"
import { connectDB } from "./database/db.js"
const app = express();



app.listen(process.env.PORT , () =>{

    connectDB();
    console.log(`Server is listining at port ${process.env.PORT}`);
    
})