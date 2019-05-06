const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IndicadorSchema = new Schema({
  nome: {
    type: String,
    required: false
  },
  idCard: {
    type: String,
    required: false
  },
  cor: {
    type: String,
    required: false
  },
  icone: {
   type: String,
   required: false
  },
  labelValor: {
   type: String,
   required: false
  },
  labelQtd: {
   type: String,
   required: false
  },
  master:{
   type: String,
   required: true
  },
  camposMaster:{
   type: Array,
   required: true
  }
});

module.exports = mongoose.model('indicadores', IndicadorSchema);
