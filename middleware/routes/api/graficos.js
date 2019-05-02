const express = require("express");
const router = express.Router();

const GraficoController = require('../../controllers/graficoController')

// @route GET api/items_menu
// @desc  GET All Items
// @access Public
router.get('/', (req, res) => {
  GraficoController.listar(res);
});

router.post('/', (req, res) => {
  if (req.body._id === undefined) {
    GraficoController.criar(req.body,res);
  }else{
    GraficoController.atualizar(req,res)
  }
});

// @route DELETE api/items_menu/:id
// @desc  Delete A Item
// @access Public
router.delete('/', (req, res) => {
  GraficoController.remover(req.body, res)
})

module.exports = router;
