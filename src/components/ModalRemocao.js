import React, {Component} from 'react'
// import PropTypes from 'prop-types';
import {Button, Modal} from 'react-bootstrap'
import '../assets/css/modal.css'
import axios from 'axios'

class ModalRemocao extends  Component{

    constructor(props){
        super(props)
        this.removeItens = this.removeItens.bind(this)
    }


    removeItens(){
        let itensRemocao = this.props.itensExclusao
        axios.delete('http://localhost:3000/api/items_menu', {data: itensRemocao}).then((response) =>{
            this.props.onHide()
        }).catch((error) => console.log(error))
    }

    render(){

        return (
            <Modal
                {...this.props}
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
                            {this.props.itensExclusao.map(item => 
                                <li key={item.nome} className="list-group-item">{item.nome}</li>
                            )}
                        </ul>
                        </div>                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Fechar</Button>
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
