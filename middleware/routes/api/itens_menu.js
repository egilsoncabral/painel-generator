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

router.post('/', (req, res) => {
  if (req.body._id === undefined) {
    insertItem(req, res)
  }else{
    updateItem(req,res)
  }
});

function insertItem(req, res){
  const newItem = new ItemMenu({
        nome: req.body.nome,
        idCard: req.body.idCard,
        subMenu: req.body.subMenu,
        cor: req.body.cor,
        icone: req.body.icone
     });
  newItem.save().then(item => res.json(item));
}

function updateItem(req, res){
    ItemMenu.findOneAndUpdate({_id: req.body._id}, req.body, {new:true}, (err, doc) =>{
      if(!err) {
        res.status(200).json(doc)
      }else{
        res.status(500).json({message: "Failed to update by " + err})
      }
    })
}

// @route DELETE api/items_menu/:id
// @desc  Delete A Item
// @access Public
router.delete('/', (req, res) => {
 
    ItemMenu.deleteMany({_id: req.body.map(item => item._id)})
    .then(() => res.json({message: "Item deleted!!!"}))
    .catch(err => res.status(500).json({message: "Failed to delete by " + err}))
  
})

module.exports = router;
