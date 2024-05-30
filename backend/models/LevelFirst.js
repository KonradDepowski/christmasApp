const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LevelFirstSchema = new Schema(
  {
    name: String,
    task: String,
    order: String,
    backgroundColor: String,
  },
  { collection: "levelFirst" }
);

module.exports = mongoose.model("levelFirst", LevelFirstSchema);
