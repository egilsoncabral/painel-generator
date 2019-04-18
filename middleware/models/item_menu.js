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
  menuSelectOption: {
    type: String,
    required: false
  },
  colorSelectOption: {
    type: String,
    required: false
  },
 selectedIcon: {
   type: String,
   required: false
 }

});

module.exports = ItemMenu = mongoose.model('itemMenu', ItemMenuSchema);
