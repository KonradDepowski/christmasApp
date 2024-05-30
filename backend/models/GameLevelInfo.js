const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameLevelInfo = new Schema(
  {
    key: String,
    info: String,
    description: String,
    level: Number,
  },
  { collection: "gameLevelInfo" }
);

module.exports = mongoose.model("gameLevelInfo", GameLevelInfo);
