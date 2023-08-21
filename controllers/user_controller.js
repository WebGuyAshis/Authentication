const User = require("../models/user");
const redis = require("../config/redis");

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