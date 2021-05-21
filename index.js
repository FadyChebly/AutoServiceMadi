const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Customer = require("./models/customer");
const Numfile = require("./models/FileNumbering");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const number = await Numfile.find({});
  const num = number.length;
  const customer = "";
  res.render("home", { customer, num });
});

app.get("/clients", async (req, res) => {
  const { client } = req.query;
  const customer = await Customer.find({
    client: { $regex: ".*" + client + ".*" },
  });
  res.render("client", { customer });
});

app.get("/home/:id", async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findById(id);
  const number = await Numfile.find({});
  const num = number.length;
  res.render("home", { customer, num });
});

app.post("/billing", async (req, res) => {
  const number = await Numfile.find({});
  const num = number.length;
  const newNum = new Numfile({ counter: "1" });
  await newNum.save();

  const customerFilled = req.body.Cust;
  const Panne = req.body.Panne;
  const type = req.body.choice;
  const Pieces = req.body.Piece;
  const comments = req.body.comment;
  const Pro = req.body.PRO;
  const BL = req.body.BL;
  const BC = req.body.BC;

  const foundCust = await Customer.find({ client: `${customerFilled.client}` });
  console.log(foundCust.length);
  if (foundCust.length > 0) {
    console.log("not saved");
  } else {
    const MyNewCust = new Customer(req.body.Cust);
    await MyNewCust.save();
    console.log("saved");
  }
  let str = "";
  if (Panne) {
    let j = 1;
    Object.values(Panne).forEach(val => {
      str += ` -${j}-${val}  `;
      j++;
    });
  }
  let newstr = "";
  if (Pieces) {
    let i = 1;
    Object.values(Pieces).forEach(val => {
      newstr += ` -${i}-${val}  `;
      i++;
    });
  }

  res.render("bill", {
    type,
    num,
    customerFilled,
    str,
    newstr,
    comments,
    Pro,
    BL,
    BC,
  });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
