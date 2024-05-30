const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorMsg = "";
    errors.array().forEach((err) => {
      errorMsg += `${err.msg}\n`;
    });
    const error = new Error(errorMsg);
    error.statusCode = 422;
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        password: hashedPw,
      });
      return user.save();
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: "User create succesfully", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("User doesn't exist!");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Invalid Credentials");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        "secretKey",
        { expiresIn: "1h" }
      );
      return res.status(200).json({ token: token, userId: loadedUser._id });
    })
    .catch((err) => {
      const error = new Error("Invalid Credentials");
      error.statusCode = 401;
      next(error);
    });
};
