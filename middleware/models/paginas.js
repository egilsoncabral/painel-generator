const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaginaSchema = new Schema({
  nome: {
    type: String,
    required: false
  },
  conteudo: {
    type: Array,
    required: false
  }, 
  tipo:{
    type: String,
    required: true
  }

});

module.exports = mongoose.model('paginas', PaginaSchema);
