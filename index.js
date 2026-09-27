import express from "express"
import "dotenv/config"
import fileUpload from "express-fileupload"
import bodyParser from "body-parser"

import userRoutes from "./routes/user.route.js"
import { connectDB } from "./database/db.js"
const app = express();

app.use("/api/v1/user/",userRoutes)


app.use(bodyParser.json())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/temp/"
}))


app.listen(process.env.PORT , () =>{

    connectDB();
    console.log(`Server is listining at port ${process.env.PORT}`);
    
})