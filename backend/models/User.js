const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "Anonim",
  },
  age: {
    type: Number,
    default: 18,
  },
  avatar: {
    type: String,
    default: "1",
  },
  level: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("user", userSchema);
