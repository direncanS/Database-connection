const User = require("../models/User");

exports.registerValidation = async (username, email, password) => {
  const errors = [];
  if (username.length === 0) {
    errors.push({ message: "Please enter a username" });
  }
  if (password.length === 0) {
    errors.push({ message: "Please enter a password" });
  }
  if (email.length === 0) {
    errors.push({ message: "Please enter an email" });
  }

  await User.findOne({ username: username }).then((user) => {
    if (user) {
      errors.push({ message: "Username already exists" });
    }
  });

  await User.findOne({ email: email }).then((user) => {
    if (user) {
      errors.push({ message: "Email already exists" });
    }
  });

  return errors;
};

exports.loginValidation = async (username, password) => {
  const errors = [];
  if (username.length === 0) {
    errors.push({ message: "Please enter a username" });
  }
  if (password.length === 0) {
    errors.push({ message: "Please enter a password" });
  }

  await User.findOne({ username: username }).then((user) => {
    if (!user) {
      errors.push({ message: "Username does not exist" });
    }
  });

  return errors;
}
