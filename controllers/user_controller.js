const User = require("../models/user");
const redis = require("../config/redis");
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth:{
    user: process.env.email,
    pass : process.env.password
  }
});

const sendMail = (receiversEmail)=>{
  const mailOptions = {
    from: 'ashisdutube@gmail.com',
    to: receiversEmail,
    subject: 'Welcome to Our JWT Authenticator Project!',
    text: 'If you like my work please give a star in Github!',
  };


  transporter.sendMail(mailOptions, (error,info)=>{
    if(error){
      console.log('Error:',error);
    }
    else{
      console.log('Email Sent:', info.response);
    }
  })
  
}
// Creating User
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

// Login
module.exports.login = (req, res) => {
  return res.redirect("/users/profile");
};


// Show Profile
module.exports.profile = async (req, res) => {

  let userId = req.userId;
  try {
    let user = await User.findById(userId);
    if (!user) {
      console.log("Cannot find User!");
      return res.redirect("/");
    }
    sendMail(user.email);
    return res.render("profile", {
      user,
    });
  } catch (error) {
    console.log("Error Finding User");
    return res.redirect("back");
  }
};



// Logout
module.exports.logout = async(req,res)=>{
  try {
    let key = 'jwtToken'
    await redis.del(key);
    console.log("Logged Out SuccessFully");
    return res.redirect('/')
  } catch (error) {
    console.log("Error Logging Out!",error);
    return res.redirect('/');
  }
}