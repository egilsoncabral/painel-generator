const ItemMenu = require('../models/item_menu');
const Repository = require('../services/repository');

module.exports = ItemMenuController = {

  criar: create = (dados, resposta) =>{
    const item = new ItemMenu({
        nome: dados.nome,
        idCard: dados.idCard,
        subMenu: dados.subMenu,
        cor: dados.cor,
        icone: dados.icone
     })
     Repository.novoItem(item, resposta)
  },

  listar: listar = resposta =>
    Repository.obterLista(ItemMenu, resposta),

  atualizar: atualizar = (atualizado, resposta) =>
    Repository.atualizarItem(ItemMenu, atualizado, resposta),

  remover: remover = (items, resultado) =>
    Repository.remover(ItemMenu, items, resultado)

}
