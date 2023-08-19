const userModel = require("./models/User.model");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("./db/db");
const { default: mongoose } = require("mongoose");

const urlencodedParser = express.urlencoded({ extended: false });

app.use(cors());
app.use(bodyParser.json());

const data = [];

app.use(urlencodedParser, function (request, response, next) {
  next();
});

app.get("/info", async (req, res) => {
  res.send(JSON.stringify(data));
});

app.post("/registration", async (req, res) => {
  console.log(req.body);
  data.push(req.body);
  const text2 = req.body.text2;
  await userModel.create({ text2 });
  res.send({});
});

mongoose.connection.once("open", () => {
  app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${3000}`);
  });
  console.log("DB connection established");
});
