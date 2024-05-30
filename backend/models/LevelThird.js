const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LevelThirdSchema = new Schema(
  {
    value: String,
    answer: String,
    video: String,
  },
  { collection: "levelThird" }
);

module.exports = mongoose.model("levelThird", LevelThirdSchema);
