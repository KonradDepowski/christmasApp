const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const gameControllers = require("../controllers/game");

router.patch("/level", isAuth, gameControllers.updateUserLevel);
router.get("/level", isAuth, gameControllers.checkUserProgress);

router.get("/level/info", isAuth, gameControllers.getLevelInfo);

router.get("/level/first", isAuth, gameControllers.getLevelFirstData);
router.post("/level/first", isAuth, gameControllers.checkLevelFirstResult);
router.get("/level/second", isAuth, gameControllers.getLevelSecondData);
router.post("/level/second", isAuth, gameControllers.checkLevelResult);

router.get("/level/third", isAuth, gameControllers.getLevelThirdData);
router.post("/level/third", isAuth, gameControllers.checkLevelResult);

router.get("/level/fourth", isAuth, gameControllers.getLevelFourthData);

module.exports = router;
