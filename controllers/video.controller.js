import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import Video from "../models/video.model.js";
import jwt from "jsonwebtoken";

/*Upload video*/
const uploadVideo = async (req, res) => {
  try {
    // get title, description, category and tags from request body
    const { title, description, category, tags } = req.body;

    // check if video and thumbnail files are present in the request
    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res.status(400).json({
        success: false,
        message: "Video and thumbnail are required",
      });
    }

    // upload video and thumbnail to cloudinary
    const videoUpload = await cloudinary.uploader.upload(
      req.files.video.tempFilePath,
      {
        resource_type: "video",
        folder: "videos",
      },
    );

    const thumbnailUpload = await cloudinary.uploader.upload(
      req.files.thumbnail.tempFilePath,
      {
        folder: "thumbnails",
      },
    );

    // create a new video object and save it to the database
    const newVideo = new Video({
      _id: new mongoose.Types.ObjectId(),
      title,
      description,
      userId: req.user._id,
      videoUrl: videoUpload.secure_url,
      videoId: videoUpload.public_id,
      thumbnailUrl: thumbnailUpload.secure_url,
      thumbnailId: thumbnailUpload.public_id,
      category,
      tags: tags ? tags.split(",") : [],
    });

    await newVideo.save();

    return res.status(201).json({
      success: true,
      message: "Video Uploaded Successfully",
      video: newVideo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export  {uploadVideo};