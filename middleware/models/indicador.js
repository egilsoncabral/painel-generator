const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IndicadorSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  styles: {
    type: Object,
    required: false
  },
  domId: {
    type: String,
    required: true
  },
 link: {
   type: String,
   required: true
 }

});

module.exports = Indicador = mongoose.model('indicador', IndicadorSchema);
