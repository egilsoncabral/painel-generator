const Grafico = require('../models/graficos');
const Repository = require('../services/repository');

module.exports = {

  criar: (dados, resposta) =>{
    const item = new Grafico({
        nome: dados.nome,
        idGrafico: dados.idGrafico,
        tipoGrafico: dados.tipoGrafico,
        master: dados.master,
        camposMaster: dados.camposMaster,
     })
     Repository.novoItem(item, resposta)
  },

  listar: resposta =>
    Repository.obterLista(Grafico, resposta),

  atualizar: (atualizado, resposta) =>
    Repository.atualizarItem(Grafico, atualizado, resposta),

  remover: (items, resultado) =>
    Repository.remover(Grafico, items, resultado)

}
