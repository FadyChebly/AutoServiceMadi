const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  client: String,
  car: String,
  tel: String,
  cellulaire: String,
});

module.exports = mongoose.model("Customer", CustomerSchema);
