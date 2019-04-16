import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Button, Modal} from 'react-bootstrap'
import '../assets/css/modal.css'

class ModalEdicao extends  Component{

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
                        Adicionar
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <p>
                       {<this.props.componente />}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Fechar</Button>
                    <Button variant="primary" onClick={this.props.onHide}>Salvar</Button>
                </Modal.Footer>
            </Modal>
        )   
    }
    

}  

// Modal.propTypes ={
//     venue: PropTypes.object.isRequired
// };

export default ModalEdicao