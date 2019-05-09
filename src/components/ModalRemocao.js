import React, {Component} from 'react'
// import PropTypes from 'prop-types';
import {Button, Modal} from 'react-bootstrap'
import '../assets/css/modal.css'

import DBManager from '../utils/DBManager';

class ModalRemocao extends  Component{

    constructor(props){
        super(props)
        this.removeItens = this.removeItens.bind(this)
    }


    removeItens(){
        let daColecao = this.props.selectedMenu.link

        DBManager.removerItem(this.props.itens, daColecao, (resposta) => {            
          if (resposta.status === 200) {
            this.props.cargaItems(daColecao)
            this.props.onHide()
          } else {
             console.log("Ocorreu um erro.")
          }
        })
    }

    render(){

        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Deseja remover os itens selecionados:
                    </Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <div>

                        <ul className="nav">
                            {this.props.itens ? this.props.itens.map(item =>
                                <li key={item.nome} className="list-group-item">{item.nome}</li>
                            ) : ''}
                        </ul>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Cancelar</Button>
                        <Button type="submit" variant="primary" onClick={this.removeItens}>Remover</Button>
                    </Modal.Footer>
            </Modal>
        )
    }


}

// Modal.propTypes ={
//     venue: PropTypes.object.isRequired
// };

export default ModalRemocao
