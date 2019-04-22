const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaginaSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  domId: {
    type: String,
    required: true
  },
 items: {
   type: Object,
   required: false
 }

});

module.exports = Pagina = mongoose.model('pagina', PaginaSchema);
