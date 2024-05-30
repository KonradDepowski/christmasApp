const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const User = require("../models/User");
const authController = require("../controllers/auth");

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("E-mail addres already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password", "Password must have miniumim 6 characters")
      .trim()
      .isLength({ min: 6 }),
  ],
  authController.signup
);
router.post("/login", authController.login);
module.exports = router;
