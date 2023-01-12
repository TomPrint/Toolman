const User = require("../models/userModel");
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");



const createToken = (_id) => {
  return jwt.sign({ _id}, process.env.SECRET, { expiresIn: "2d" });
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
    if (token){
      res.status(200).json({
        isAdmin: user.isAdmin,
        email: user.email,
        name: user.name,
        token
       })
    }
  }
 catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//! GET all users
const getUsers = async (req, res) => {
  //grab all users and sort descending by creation date
  try {
  const users = await User.find({}).sort({createdAt:-1})
  res.status(200).json(users)
} catch (error) {
  res.status(400).json({ error: error.message });
}
}

// ! DELETE a user

const deleteUser = async (req,res) => {
  //grab id from req.params
  const { id } = req.params 
  //check if id is valid type of mongoose id. If not res error.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Brak Użytkownika'})
  }
  //in mongoose id = _id. So function - finds and delete the user that _id is id that we took from req.params
  const user = await User.findOneAndDelete({_id: id })

  // if no user - res error
  if (!user) {
    return res.status(404).json({error: 'Brak Użytkownika'})
  }
  //if item is present, response ok status
  res.status(200).json(user)

}


module.exports = { signupUser, loginUser, getUsers, deleteUser };
