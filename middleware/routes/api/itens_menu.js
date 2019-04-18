const express = require("express");
const router = express.Router();

const ItemMenu = require('../../models/item_menu');

// @route GET api/items_menu
// @desc  GET All Items
// @access Public
router.get('/', (req, res) => {
  ItemMenu.find()
    .sort({ id: -1})
    .then(items => res.json(items))
});

// @route POST api/items_menu
// @desc  Create A Item
// @access Public
router.post('/', (req, res) => {
  const newItem = new ItemMenu({
    nome: req.body.nome,
    idCard: req.body.idCard,
    menuSelectOption: req.body.menuSelectOption,
    colorSelectOption: req.body.colorSelectOption,
    selectedIcon: req.body.selectedIcon
 });
  newItem.save().then(item => res.json(item));
});

// @route DELETE api/items_menu/:id
// @desc  Delete A Item
// @access Public
router.delete('/', (req, res) => {
 
    ItemMenu.deleteMany({_id: req.body.map(item => item._id)})
    .then(() => res.json({message: "Item deleted!!!"}))
    .catch(err => res.status(500).json({message: "Failed to delete by " + err}))
  
})

module.exports = router;
