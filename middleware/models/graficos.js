const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GraficoSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  idGrafico: {
    type: String,
    required: true
  },
  tipoGrafico:{
    type:String,
    required:true
  },
  master: {
    type: String,
    required: true
  },
  camposMaster: {
   type: Array,
   required: true
  }
});

module.exports = mongoose.model('graficos', GraficoSchema);
