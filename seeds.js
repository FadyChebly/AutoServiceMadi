const mongoose = require("mongoose");
const Filenum = require("./models/FileNumbering");
const customer = require("./models/customer");

mongoose.connect("mongodb://localhost:27017/CarShop", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database Connected");
});

const clients = [
  {
    client: "mavie madi",
    car: "Shangan",
    tel: "01686451",
    cellulaire: "71507775",
  },
  {
    client: "fady chebly",
    car: "kia",
    tel: "01891302",
    cellulaire: "70267284",
  },
];

const numbering = [
  { counter: "1" },
  { counter: "2" },
  { counter: "3" },
  { counter: "4" },
];

Filenum.insertMany(numbering)
  .then(res => {
    console.log("data successfully added");
    console.log(res);
  })
  .catch(err => {
    console.log("error", err);
  });

customer
  .insertMany(clients)
  .then(res => {
    console.log("data successfully added");
    console.log(res);
  })
  .catch(err => {
    console.log("error", err);
  });
