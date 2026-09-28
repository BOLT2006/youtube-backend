import express from "express"
import mongoose from "mongoose"

import User from "../models/user.model.js"
import Video from "../models/video.model.js"
import cloudinary from "../utils/cloudinary.js"
import { checkAuth } from "../middleware/auth.middleware.js"
import {uploadVideo} from "../controllers/video.controller.js"

const router = express.Router()

//upload video
router.post("/upload", checkAuth , uploadVideo)

export default router;
