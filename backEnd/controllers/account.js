const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");

const {
  registerValidation,
  loginValidation,
} = require("../validations/formValidation");
const User = require("../models/User");

env.config();
const whiteList = [];

exports.setScore = async (req, res, next) => {
  const token = req.headers.authorization;
  const { username, score } = req.body;
  if (whiteList.includes(token)) {
    User.findOne({ username: username }).populate("highScore").then((user) => {
      user.highScore.score = score;
      user.highScore.save();
      return res.status(201).json({ message: "Score updated", score: score });
    });
  } 
  else {
    return res.status(401).json({ message: "Token is invalid" });
  }
};

exports.postLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const errors = await loginValidation(username, password);

  if (errors.length > 0) {
    return res.status(400).json({ errors: errors });
  } else {
    const user = await User.findOne({ username: username });
    bcrypt.compare(password, user.password).then((doMatch) => {
      if (doMatch) {
        const accessToken = jwt.sign(
          { user: user },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
        whiteList.push(accessToken);
        return res
          .status(200)
          .json({ message: "Logged in", user: user, accessToken: accessToken });
      } else {
        return res.status(401).json({ message: "Invalid password" });
      }
    });
  }
};

exports.postRegister = async (req, res, next) => {
  const { username, email, password } = req.body;
  const errors = await registerValidation(username, email, password);

  if (errors.length > 0) {
    return res.status(400).json({ errors: errors });
  } else {
    bcrypt.hash(password, 12).then((hashedPassword) => {
      const newUser = new User({username: username, email: email, password: hashedPassword});
      newUser.save();
      return res.status(201).json({ message: "User created" });
    });
  }
};

exports.postLogout = (req, res, next) => {
  const token = req.headers.authorization;
  if (whiteList.includes(token)) {
    whiteList.splice(whiteList.indexOf(token), 1);
    return res.status(200).json({ message: "Logged out" });
  } else {
    return res.status(401).json({ message: "Token is invalid" });
  }
};

exports.getUser = async (req, res, next) => {
  const username = req.params.username;
  const user = await User.findOne({ username: username }).populate("highScore");
  return res.status(200).json({ user: user });
};

exports.getAllUsers = async (req, res, next) => {
  const token = req.headers.authorization;

  if (whiteList.includes(token)) {
  User.find().populate("highScore").then((users) => {
    return res.status(200).json({ users: users });
  });
  } else {
    return res.status(401).json({ message: "Token is invalid" });
  }
}

exports.getUserWithToken = (req, res, next) => {
  const token = req.params.accessToken;
  if (whiteList.includes(token)) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      return res.status(200).json({ user: user });
    });
  } else {
    return res.status(401).json({ message: "Token is invalid" });
  }
};
