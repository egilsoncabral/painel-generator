import React, {Component} from 'react'
// import PropTypes from 'prop-types';
import {Button, Modal} from 'react-bootstrap'
import '../assets/css/modal.css'
// import axios from 'axios'
import DBManager from '../utils/DBManager'

class ModalEdicao extends  Component{

    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentWillReceiveProps(nextProps){
        if (nextProps.form !== this.props.itens[0]) {
          this.setState({ form: nextProps.itens[0] })
        }else{
            this.setState({ form: {}})
        }
      }


    handleInputChange(event, selectedOption) {
        const target = event.target !== undefined ? event.target : event;
        let formAtual = this.state.form
        if (Array.isArray(target)) {
            if (selectedOption.action === 'select-option') {
                if (formAtual[selectedOption.name] === undefined) {
                    formAtual[selectedOption.name] = []
                }    
                formAtual[selectedOption.name].push(selectedOption.option.value)
            }else{
                formAtual[selectedOption.name] = formAtual[selectedOption.name].filter(val => val.nome !== selectedOption.removedValue.nome)
            }
            
        }else{
            formAtual[target.name] = target.value
        }
        this.setState({
            form: formAtual
        });
    }

    handleChange = (value) => {
        let formAtual = this.state.form
        if (formAtual) {
            formAtual.icone = value
        this.setState({ form: formAtual});
        }

    }

    handleSubmit(event) {
        for (const elemento of event.target.elements) {
            console.log(elemento)
        }
        debugger
        // event.preventDefault()
        // let form = this.state.form
        // let link = this.props.selectedMenu.link
        // if (form.subMenu === undefined && link === 'items_menu') {
        //     form.subMenu = []
        // }

        // DBManager.addItem(form, link, (resposta) => {
        //     if (resposta.status === 200) {
        //         this.props.cargaItems(link)
        //         this.props.onHide()
        //     } else {
        //         console.log("Erro message")
        //     }
        // });

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
                        Adicionar
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={this.handleSubmit}>
                    <Modal.Body>
                        <React.Fragment>
                            <this.props.component handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} handleChange={this.handleChange} isDisable={this.props.isDisable}
                            form={this.state.form}/>
                        </React.Fragment>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Fechar</Button>
                        {!this.props.isDisable && <Button type="submit" variant="primary" value="Submit">Salvar</Button>}
                    </Modal.Footer>
                </form>
            </Modal>
        )
    }


}

// Modal.propTypes ={
//     venue: PropTypes.object.isRequired
// };

export default ModalEdicao
