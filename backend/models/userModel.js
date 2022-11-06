const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

// ! MODEL SCHEMA
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      minlength: 3,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ! MODEL METHODS & VALIDATION
// static signup method
userSchema.statics.signup = async function (name, email, password, isAdmin) {
  // fields validation for signup
  if (!email || !password || !name || !isAdmin) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const sameName = await this.findOne({ name });
  if (sameName) {
    throw Error("Name already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash, isAdmin });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  // fields validation for signup
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
