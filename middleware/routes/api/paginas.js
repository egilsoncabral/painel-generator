const express = require("express");
const router = express.Router();

const Pagina = require('../../models/pagina');

// @route GET api/paginas
// @desc  GET All Paginas
// @access Public
router.get('/', (req, res) => {
  Pagina.find()
    .sort({id: -1})
    .then(Pagina => res.json(Pagina));
});

// @route POST api/paginas
// @desc  Create A Pagina
// @access Public
router.post('/', (req, res) => {
  console.log(req.body)
  const newItem = new Pagina({
    nome: req.body.nome,
    domId: req.body.domId,
    items: req.body.items
 });
  newItem.save().then(item => res.json(item));
});

// @route DELETE api/paginas/:id
// @desc  Delete An Pagina
// @access Public
router.delete('/:id', (req, res) => {
  Pagina.findById(req.params.id)
    .then(item => item.remove().then( () => res.json({message: "Página excluída!!!"})))
    .catch(err => res.status(404).json({message: `Falha ao excluir a Página ${req.params.nome}`}))
})


module.exports = router;
