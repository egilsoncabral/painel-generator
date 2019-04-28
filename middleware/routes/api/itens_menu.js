const express = require("express");
const router = express.Router();

const ItemMenu = require('../../models/item_menu');
const ItemMenuController = require('../../controllers/itemMenuController')

// @route GET api/items_menu
// @desc  GET All Items
// @access Public
router.get('/', (req, res) => {
  ItemMenuController.listar(res);
});

router.post('/', (req, res) => {
  if (req.body._id === undefined) {
    ItemMenuController.criar(req.body,res);
  }else{
    ItemMenuController.atualizar(req,res)
  }
});

// @route DELETE api/items_menu/:id
// @desc  Delete A Item
// @access Public
router.delete('/', (req, res) => {
  ItemMenuController.remover(req.body, res)
})

module.exports = router;
