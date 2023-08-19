const User = require("../models/user");
const passport = require("passport");
const jwtWebToken = require("jsonwebtoken");

module.exports.create = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      if (req.body.password === req.body.confirmPassword) {
        let createdUser = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        console.log("User Created Successfull!", createdUser);
        return res.redirect("/");
      }
      console.log("Password and Confirm Password Doesn't Match!");
      return res.redirect("/");
    }
    console.log("User Already Exists", user);
    return res.redirect("back");
  } catch (error) {
    console.log("Error Creating User!", error);
    return res.redirect("back");
  }
};

module.exports.profile = async (req, res) => {
  return res.render("profile", {
    user: req.user,
  });
};

module.exports.createSession = async (req, res) => {
    console.log("Req in Session:", req);
  console.log("Succseefully Logged In!");
  return res.redirect("/users/profile");
};

// Token Generator,
module.exports.genrateToken = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send("User doesnt exist");
    }
    const webToken = await jwtWebToken.sign(
      { _id: user.id },
      process.env.jwtSecret,
      {
        expiresIn: "1h",
        issuer: "Jwt Authenticator",
        audience: "http://127.0.0.1:8000/",
      }
    );
    console.log("Token:", webToken);
    // Set the token in the Authorization header
    req.headers.authorization = `Bearer ${webToken}`;
    console.log('request headers having bearer token: ',req.headers.authorization);
    next();

  } catch (error) {
    console.log("Error Generating Token!", err);
  }
};
