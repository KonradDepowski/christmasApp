const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const profileController = require("../controllers/profile");
const isAuth = require("../middleware/is-auth");

router.get("/profile", isAuth, profileController.getProfile);

router.patch(
  "/profile",
  [
    body("name", "Please set your name").trim().not().isEmpty().isString(),
    body("email", "Please set a correct email")
      .isEmail()
      .trim()
      .not()
      .isEmpty(),
    body("age", "Please set a correct age").isNumeric().not().isEmpty(),
    body("avatar", "Please choose a avatar").not().isEmpty().isString(),
  ],
  isAuth,
  profileController.updateProfile
);

module.exports = router;
