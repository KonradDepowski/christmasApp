const { validationResult } = require("express-validator");
const User = require("../models/User");

exports.getProfile = (req, res, next) => {
  const userId = req.userId;
  User.find({ _id: userId })
    .then((user) => {
      if (!user) {
        const error = new Error("Could not find a user");
        error.statusCode = 500;
        throw error;
      }
      const profileInfo = {
        email: user[0].email,
        name: user[0].name,
        age: user[0].age,
        avatar: user[0].avatar,
      };
      return res.status(200).json({ ...profileInfo });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateProfile = (req, res, next) => {
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
  const userId = req.userId;
  const name = req.body.name;
  const email = req.body.email;
  const age = req.body.age;
  const avatar = req.body.avatar;

  User.findByIdAndUpdate(userId, {
    age: age,
    name: name,
    email: email,
    avatar: avatar,
  })
    .then((result) => {
      if (!result) {
        const error = new Error("Could not updated a user profile");
        error.statusCode = 500;
        throw error;
      }
      return res.status(200).json({ message: "Updated" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
