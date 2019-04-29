const express = require("express");
const router = express.Router();

const PaginaController = require('../../controllers/paginaController')

// @route GET api/items_menu
// @desc  GET All Items
// @access Public
router.get('/', (req, res) => {
  PaginaController.listar(res);
});

router.post('/', (req, res) => {
  if (req.body._id === undefined) {
    PaginaController.criar(req.body,res);
  }else{
    PaginaController.atualizar(req,res)
  }
});

// @route DELETE api/items_menu/:id
// @desc  Delete A Item
// @access Public
router.delete('/', (req, res) => {
  PaginaController.remover(req.body, res)
})

module.exports = router;
