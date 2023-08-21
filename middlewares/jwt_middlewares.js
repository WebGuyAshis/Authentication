const User = require("../models/user");
const jwt = require("jsonwebtoken");
const redis = require("../config/redis");


// Generating Token
module.exports.generateToken = async (req, res, next) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user || user.password !== password) {
      //Verifying User Credentials
      console.log("Invalid Credentials!");
      return res.redirect("/"); //Redirecting to Sign In Page
    }
    // Generating token
    try {
      const token = await jwt.sign(
        {
          _id: user._id,
        },
        process.env.jwtSecret,
        {
          expiresIn: "300s",
          issuer: "Jwt Authenticator",
          audience: "http://127.0.0.1:8000",
        }
      );
      console.log("Token Generated Successfully!");
      // Saving the toke in Redis For future Verification
      await redis.set("jwtToken", token);
  
      let value = await redis.get('jwtToken')
      console.log("Set Token To Redis:", value);
  
      next();
    } catch (error) {
      console.error("Error generating token:", error);
      return res.redirec("/");
    }
  };


// Verify Token

module.exports.verifyToken = async (req, res,next) => {
    try {
      const token = await redis.get("jwtToken");
      console.log("Get Token from Redis:", token);
  
      if (!token) {
        //Checking token existence
        console.log("Token Expired");
        return res.redirect("/");
      }
  
      let userToken = await jwt.verify(token, process.env.jwtSecret);
      if (!userToken) {
        console.log("Session Expired");
        return res.redirect("/");
      }
      req.userId = userToken._id;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        console.log("Token expired");
        await redis.del('jwtToken');
        console.log("Remove Token From redis!");
        return res.redirect("/");
      }
      console.log("Invalid Token", error);
      return res.redirect("/");
    }
  };