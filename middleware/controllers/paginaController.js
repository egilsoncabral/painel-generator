const Pagina = require('../models/paginas');
const Repository = require('../services/repository');

module.exports = PaginaController = {

  criar: create = (dados, resposta) =>{
    const item = new Pagina({
        titulo: dados.titulo,
        conteudo: dados.conteudo
     })
     Repository.novoItem(item, resposta)
  },

  listar: listar = resposta =>
    Repository.obterLista(Pagina, resposta),

  atualizar: atualizar = (atualizado, resposta) =>
    Repository.atualizarItem(Pagina, atualizado, resposta),

  remover: remover = (items, resultado) =>
    Repository.remover(Pagina, items, resultado)

}
