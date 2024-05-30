const LevelFirst = require("../models/LevelFirst");
const LevelSecond = require("../models/LevelSecond");
const User = require("../models/User");
const correctOrder = require("../data/data");
const bcrypt = require("bcrypt");
const LevelThird = require("../models/LevelThird");
const LevelFourth = require("../models/LevelFourth");
const GameLevelInfo = require("../models/GameLevelInfo");

exports.getLevelInfo = (req, res, next) => {
  GameLevelInfo.find()
    .then((result) => {
      if (!result) {
        console.log("err");
        const error = new Error("Could not find a level information");
        error.statusCode = 404;
        throw error;
      }
      return res.status(200).json({ data: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    });
};

exports.updateUserLevel = (req, res, next) => {
  const userId = req.userId;
  const level = req.body.level;
  User.findByIdAndUpdate(userId, { level: +level })
    .then((result) => {
      if (!result) {
        const error = new Error("Could update user level");
        error.statusCode = 304;
        throw error;
      }
      return res.status(200).json({ message: "Updated" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    });
};

exports.checkUserProgress = (req, res, next) => {
  const userId = req.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("Could not find a user");
        error.statusCode = 404;
        throw error;
      }
      return res.status(200).json({ level: user.level });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    });
};

exports.getLevelFirstData = (req, res, next) => {
  LevelFirst.find()
    .then((data) => {
      if (!data) {
        const error = new Error("Could not find a level data");
        error.statusCode = 404;
        throw error;
      }

      return res.status(200).json({ data: data });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    });
};

exports.checkLevelFirstResult = (req, res, next) => {
  try {
    const answers = req.body;
    let wrong = false;

    for (let i = 0; i < answers.length; i++) {
      if (answers[i].order !== correctOrder[i]) {
        wrong = true;
      }
    }
    if (wrong) {
      res.status(200).json({ result: false });
    } else {
      res.status(200).json({ result: true });
    }
  } catch (err) {
    const error = new Error("Could not check level data");
    error.statusCode = 500;
    throw error;
  }
};

exports.checkLevelResult = (req, res, next) => {
  const answers = req.body;
  let wrong = false;

  async function compareAnswers() {
    for (let i = 0; i < answers.length; i++) {
      const result = await new Promise((resolve, reject) => {
        bcrypt.compare(
          answers[i].value.toLowerCase(),
          answers[i].answer,
          (err, result) => {
            if (err) {
              reject(err);
              const error = new Error("Could not compare answers");
              error.statusCode = 500;
              throw error;
            } else {
              resolve(result);
            }
          }
        );
      });

      if (result === false) {
        wrong = true;
      }
    }

    if (wrong) {
      res.status(200).json({ result: false });
    } else {
      res.status(200).json({ result: true });
    }
  }

  compareAnswers();
};

exports.getLevelSecondData = (req, res, next) => {
  LevelSecond.find()
    .then((data) => {
      if (!data) {
        const error = new Error("Could not find a level data");
        error.statusCode = 404;
        throw error;
      }

      return res.status(200).json({ data: data });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    });
};

exports.getLevelThirdData = (req, res, next) => {
  LevelThird.find()
    .then((data) => {
      if (!data) {
        const error = new Error("Could not find a level data");
        error.statusCode = 404;
        throw error;
      }

      return res.status(200).json({ data: data });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    });
};

exports.getLevelFourthData = (req, res, next) => {
  LevelFourth.find()
    .then((data) => {
      if (!data) {
        const error = new Error("Could not find a level data");
        error.statusCode = 404;
        throw error;
      }

      return res.status(200).json({ data: data });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    });
};
