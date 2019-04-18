const express = require("express");
const router = express.Router();

const Indicador = require('../../models/indicador');


// @route GET api/indicadores
// @desc  GET All Indicadores
// @access Public
router.get('/', (req, res) => {
  Indicador.find()
    .sort({id: -1})
    .then(indicador => res.json(indicador));
});

// @route POST api/indicadores
// @desc  Create A Indicador
// @access Public
router.post('/', (req, res) => {
  const newItem = new Indicador({
    title: req.body.title,
    icon: req.body.icon,
    styles: req.body.iconStyles,
    domId: req.body.domId,
    link: req.body.link
 });
  newItem.save().then(item => res.json(item));
});

// @route DELETE api/indicadores/:id
// @desc  Delete An Indicador
// @access Public
router.delete('/:id', (req, res) => {
  Indicador.findById(req.params.id)
    .then(item => item.remove().then( () => res.json({message: "Indicador excluído!!!"})))
    .catch(err => res.status(404).json({message: `Falha ao excluir o indicador ${req.params.title}`}))
})


module.exports = router;
