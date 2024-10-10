const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        else {
          let createdUser = await userModel.create({
            fullname,
            email,
            password: hash,
          });

          let token = generateToken(createdUser);
          res.cookie("token", token);

          res.status(201).json({
            message: "User created successfully",
            owner: createdUser,
          });
        }
      });
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(409).json({
        message: "User does not exist",
      });
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        res.status(200).json({
          message: "Logged In successfully",
        });
      } else {
        res.status(409).json({
          message: "Incorrect Password",
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      message: "Error loging in",
      error: err.message,
    });
  }
};

module.exports.logout = function(req, res){
    res.cookie("token", "");
    res.redirect("/");
}