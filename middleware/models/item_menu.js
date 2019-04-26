const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemMenuSchema = new Schema({
  nome: {
    type: String,
    required: false
  },
  idCard: {
    type: String,
    required: false
  },
  subMenu: {
    type: Array,
    required: false
  },
  cor: {
    type: String,
    required: false
  },
 icone: {
   type: String,
   required: false
 }

});

module.exports = ItemMenu = mongoose.model('itemMenu', ItemMenuSchema);
