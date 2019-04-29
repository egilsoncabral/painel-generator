const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaginaSchema = new Schema({
  titulo: {
    type: String,
    required: false
  },
  conteudo: {
    type: Array,
    required: false
  }

});

module.exports = Pagina = mongoose.model('paginas', PaginaSchema);
