const User = require("../models/user");

module.exports.create = async (req, res) => {
  try {
    const user = User.findOne({
      email: req.body.email,
    });

    if (user) {
      console.log("User Already Exists", user);
      return res.redirect("/back");
    }

    let createdUser = await User.create({
      email: req.body.email,
      password: req.body.password,
    });

    console.log("User Created Successfull!", createdUser);
    return res.redirect("/");
  } catch (error) {
    console.log("Error Creating User!", error);
    return res.redirect("/");
  }
};
