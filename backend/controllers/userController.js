const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
};

//! Sign up a user
const signupUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  try {
    const user = await User.signup(name, email, password, isAdmin);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ name, email, token, isAdmin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//! Log in a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);
    if (token) {
      res.status(200).json({
        isAdmin: user.isAdmin,
        email: user.email,
        name: user.name,
        token,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//! GET all users
const getUsers = async (req, res) => {
  //grab all users and sort descending by creation date
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ! DELETE a user

const deleteUser = async (req, res) => {
  //grab id from req.params
  const { id } = req.params;
  //check if id is valid type of mongoose id. If not res error.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Brak Użytkownika" });
  }
  //in mongoose id = _id. So function - finds and delete the user that _id is id that we took from req.params
  const user = await User.findOneAndDelete({ _id: id });

  // if no user - res error
  if (!user) {
    return res.status(404).json({ error: "Brak Użytkownika" });
  }
  //if item is present, response ok status
  res.status(200).json(user);
};

//! RESET password
const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("coś nie tak");
      return res.status(404).json({ error: "Brak Użytkownika" });
    }

    const payload = { _id: user._id };
    console.log(payload);

    // Generate token to reset password
    const resetToken = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "20m",
    });
    // Set the reset token on the user
    user.resetPasswordToken = resetToken;
    await user.save();

    // Send an email to the user with the reset link
    const resetLink = `http://localhost:3000/api/user/reset-password/${resetToken}`;
    console.log("resetLink");

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "toolmanapp@gmail.com",
        pass: process.env.EMAIL,
      },
    });

    const mailOptions = {
      from: "toolmanapp@gmail.com",
      to: email,
      subject: "Password Reset Link",
      text: "Please use this link to reset your password: " + resetLink,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res
      .status(200)
      .json({ message: "Password reset request with link has been sent" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetPasswordToken = async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  try {
    // Verify the reset token
    const decoded = jwt.verify(resetToken, process.env.SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ error: "Brak Użytkownika" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUsers,
  deleteUser,
  resetPassword,
  resetPasswordToken,
};
