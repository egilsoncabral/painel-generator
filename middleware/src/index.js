const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const itemMenu = require('../routes/api/itens_menu');
const indicador = require('../routes/api/indicadores');
const pagina = require('../routes/api/paginas');

const app = express();

app.use(bodyParser.json());

const db = require("../config/connection").mongoURI;

mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

app.use('/api/items_menu', itemMenu);
app.use('/api/indicadores', indicador);
app.use('/api/paginas', pagina);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server runinng on port ${PORT}`));
