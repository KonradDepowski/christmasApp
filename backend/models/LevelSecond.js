const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LevelSecondSchema = new Schema(
  {
    code: String,
    value: String,
    answer: String,
    hint: String,
  },
  { collection: "levelSecond" }
);

module.exports = mongoose.model("levelSecond", LevelSecondSchema);
