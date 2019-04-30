const ItemMenu = require('../models/item_menu');
const Repository = require('../services/repository');

module.exports = {

  criar: (dados, resposta) =>{
    const item = new ItemMenu({
        nome: dados.nome,
        idCard: dados.idCard,
        subMenu: dados.subMenu,
        cor: dados.cor,
        icone: dados.icone
     })
     Repository.novoItem(item, resposta)
  },

  listar: resposta =>
    Repository.obterLista(ItemMenu, resposta),

  atualizar: (atualizado, resposta) =>
    Repository.atualizarItem(ItemMenu, atualizado, resposta),

  remover: (items, resultado) =>
    Repository.remover(ItemMenu, items, resultado)

}
