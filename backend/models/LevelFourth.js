const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LevelFourthSchema = new Schema(
  {
    valid: Boolean,
    cat: String,
  },
  { collection: "levelFourth" }
);

module.exports = mongoose.model("levelFourth", LevelFourthSchema);
