const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const registerData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    let user = await User.findOne({ where: { email: registerData.email } });
    if (user) {
      return res.status(400).json({
        statusCode: 400,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(registerData.password, salt);
    registerData.password = hashedPassword;

    console.log("registerData", registerData);
    let data = await User.create(registerData);
    if (!data) {
      return res.status(400).json({
        statusCode: 400,
        message: "Error while creating the user",
      });
    }

    const token = jwt.sign({ userId: data.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      status: 200,
      data: data,
      token: token,
      message: "User Register Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      data: {},
      error: "Something Went Wrong",
      err,
    });
  }
};

// Log in a user
exports.loginUser = async (req, res) => {
  try {
    const loginData = {
      email: req.body.email,
      password: req.body.password,
    };
    const user = await User.findOne({ where: { email: loginData.email } });

    if (!user) {
      return res.status(400).json({
        statusCode: 400,
        message: "User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(loginData.password, user.password);
    if (!isMatch)
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid credentials",
      });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      status: 200,
      token: token,
      message: "User Login Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      data: {},
      error: "Something Went Wrong",
      err,
    });
  }
};
