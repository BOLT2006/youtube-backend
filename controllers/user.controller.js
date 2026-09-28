import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"

/* User Sign Up Controller */
const userSignUp = async (req, res) => {
  try {
    // hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // upload the logo image to cloudinary
    const uploadImage = await cloudinary.uploader.upload(
      req.files.logoUrl.tempFilePath,
    );
    // create a new user object
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hashedPassword,
      channelName: req.body.channelName,
      phone: req.body.phone,
      logoUrl: uploadImage.secure_url,
      logoId: uploadImage.public_id,
    });

    // save the new user to the database
    const user = await newUser.save();

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("SIGNUP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* User Sign Up Controller */
const userLogin = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isvalid = await bcrypt.compare(req.body.password , existingUser.password)

    if(!isvalid){
        return res.status(500).json({
            success : "false",
            message : "Invalod Credentials"
        })
    }
    
    const token = jwt.sign({
        _id : existingUser._id,
        email : existingUser.email,
        channelName : existingUser.channelName,
        phone : existingUser.phone,
        logoId : existingUser.logoId,
    } , process.env.JWT_SECRET , {expiresIn : "12h"})

    return res.status(200).json({
        success : true,
        message : "Login Successfull",
        _id : existingUser._id,
        email : existingUser.email,
        channelName : existingUser.channelName,
        phone : existingUser.phone,
        logoId : existingUser.logoId,
        logourl : existingUser.logoUrl,
        token : token
    })


  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export {  userSignUp, userLogin };
