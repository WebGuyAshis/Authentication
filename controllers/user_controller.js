const User = require("../models/user");

module.exports.create = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
        if(req.body.password === req.body.confirmPassword){
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

module.exports.createSession = async (req, res) => {};

module.exports.profile = async (req, res) => {
  return res.render("profile", {
    user: req.user,
  });
};
