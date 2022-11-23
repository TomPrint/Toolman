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
    throw Error("Wypełnij wszystkie pola");
  }

  if (!validator.isEmail(email)) {
    throw Error("Nieprawidłowy email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Hasło zbyt słabe");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Tej email już istnieje");
  }

  const sameName = await this.findOne({ name });
  if (sameName) {
    throw Error("Ta nazwa już istnieje");
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
    throw Error("Wypełnij wszystkie pola");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Niewłaściwy email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Niewłaściwe hasło");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
