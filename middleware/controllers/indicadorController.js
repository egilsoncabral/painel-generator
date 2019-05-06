const Indicador = require('../models/indicadores');
const Repository = require('../services/repository');

module.exports = {

  criar: (dados, resposta) =>{
    const item = new Indicador({
        nome: dados.nome,
        idCard: dados.idCard,
        cor: dados.cor,
        icone: dados.icone,
        labelValor: dados.labelValor,
        labelQtd: dados.labelQtd,
        master: dados.master,
        camposMaster: dados.camposMaster
     })
     Repository.novoItem(item, resposta)
  },

  listar: resposta =>
    Repository.obterLista(Indicador, resposta),

  atualizar: (atualizado, resposta) =>
    Repository.atualizarItem(Indicador, atualizado, resposta),

  remover: (items, resultado) =>
    Repository.remover(Indicador, items, resultado)

}
