const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NumberingSchema = new Schema({
  counter: {
    type: String,
    default: "1",
  },
});

module.exports = mongoose.model("Counter", NumberingSchema);
