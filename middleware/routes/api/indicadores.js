const express = require("express");
const router = express.Router();

const IndicadorController = require('../../controllers/indicadorController')

// @route GET api/items_menu
// @desc  GET All Items
// @access Public
router.get('/', (req, res) => {
  IndicadorController.listar(res);
});

router.post('/', (req, res) => {
  if (req.body._id === undefined) {
    IndicadorController.criar(req.body,res);
  }else{
    IndicadorController.atualizar(req,res)
  }
});

// @route DELETE api/items_menu/:id
// @desc  Delete A Item
// @access Public
router.delete('/', (req, res) => {
  IndicadorController.remover(req.body, res)
})

module.exports = router;
