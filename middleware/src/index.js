const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const itemMenu = require('../routes/api/itens_menu');

const app = express();

app.use(bodyParser.json());

const db = require("../config/connection").mongoURI.local;

mongoose
  .connect(db, {useNewUrlParser: true, useFindAndModify: false})
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

app.use('/api/items_menu', itemMenu);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server runinng on port ${PORT}`));
