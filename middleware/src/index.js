const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const itemMenu = require('../routes/api/itens_menu');
const paginas = require('../routes/api/paginas');
const indicadores = require('../routes/api/indicadores');
const graficos = require('../routes/api/graficos');

const app = express();

app.use(bodyParser.json());

const db = require("../config/connection").mongoURI.machine;

mongoose
  .connect(db, {useNewUrlParser: true, useFindAndModify: false})
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

app.use('/api/items_menu', itemMenu);
app.use('/api/paginas', paginas);
app.use('/api/indicadores', indicadores);
app.use('/api/graficos', graficos);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server runinng on port ${PORT}`));
