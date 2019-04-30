const MSG_ERRO = "Ocorreu um erro durante a operação ";
const MSG_SUCESSO = "Operação bem sucedida ";

module.exports = Repository = {

  obterLista: obterLista = (deItensDoTipo, resposta) =>
      deItensDoTipo.find()
                   .sort({ id: -1})
                   .then(items => resposta.json(items))
                   .catch(err => resposta.json({msg: MSG_ERRO + "de inclusão: " + err})),

  novoItem: novoItem = (doTipo, resposta) => {
    doTipo.save().then(item => resposta.json(item));
  },

  atualizarItem: atualizarItem = (doTipo, atualizado, resposta) => {
    doTipo.findOneAndUpdate({_id: atualizado.body._id}, atualizado.body, {new:true}, (err, doc) =>{
      if(!err) {
        resposta.status(200).json(doc)
      }else{
        resposta.status(500).json({msg: MSG_ERRO + "de atualização " + err})
      }
    })
  },

  remover: remover = (itemDoTipo, items, resultado) => {
    itemDoTipo.deleteMany({_id: items.map(item => item._id)})
      .then(() => resultado.json({msg: MSG_SUCESSO + "Item removido!!!"}))
      .catch(err => resultado.status(500).json({msg: MSG_ERRO + "de remoção " + err}))
  }

}
