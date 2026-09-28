import express from "express";
import "dotenv/config";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";

import userRoutes from "./routes/user.route.js";
import videoRoutes from "./routes/video.route.js";
import { connectDB } from "./database/db.js";
const app = express();

/* Middleware First */
app.use(bodyParser.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  }),
);

/* Routes */
app.use("/api/v1/user/", userRoutes);
app.use("/api/v1/video", videoRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is listining at port ${process.env.PORT}`);
});
