const User = require("../models/userModel");
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");


const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};


//! Sign up a user
const signupUser = async (req, res) => {
  const {name, email, password, isAdmin} = req.body;

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
  const {email, password} = req.body;

  try {
    const user = await User.login(email, password);
 
    // create a token
    const token = createToken(user._id);
    // checks if created user isAdmin == true
    if (user.isAdmin){
    res.status(200).json({ email, token });
  } else {
    return res.status(404).json({error: 'Admin Access only'})
  }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//! GET all users
const getUsers = async (req, res) => {
  //grab all users and sort descending by creation date
  try {
  const user = await User.find({}).sort({createdAt:-1})
  res.status(200).json(user)
} catch (error) {
  res.status(400).json({ error: error.message });
}
}


module.exports = { signupUser, loginUser, getUsers };
