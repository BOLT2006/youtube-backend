import jwt from "jsonwebtoken";
import "dotenv/config";

export const checkAuth = async (req, res, next) => {
  try {
    // get token from headers
    const token = req.headers.authorization?.split(" ")[1];

      // check if token is present
    if (!token) {
      return res.status(401).json({
        success: false,
        mesaage: "No token is provided",
      });
    }

    // verify token
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    // save decoded user in request object
    req.user = decodedUser;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.mesaage,
    });
  }
};
