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
  }
});

module.exports = mongoose.model('indicadores', IndicadorSchema);
