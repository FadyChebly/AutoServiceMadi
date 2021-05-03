const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NumberingSchema = new Schema({
  counter: String,
});

module.exports = mongoose.model("Counter", NumberingSchema);
