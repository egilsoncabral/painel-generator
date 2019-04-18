import React, {Component} from 'react'
// import PropTypes from 'prop-types';
import {Button, Modal} from 'react-bootstrap'
import '../assets/css/modal.css'
import axios from 'axios'

class ModalEdicao extends  Component{

    constructor(props) {
        super(props);
        this.state = {
            form: {
                nome: '',
                idCard:'',
                colorSelectOption: null,
                menuSelectOption: null,
                selectedIcon:null
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange(event) {
        const target = event.target !== undefined ? event.target : event;
        let formAtual = this.state.form
        formAtual[target.name] = target.value
        this.setState({
            form: formAtual
        });
    }
    handleChange = (value) => {
        let formAtual = this.state.form
        formAtual.selectedIcon = value
        this.setState({ form: formAtual});
    }

    handleSubmit(event) {
        event.preventDefault()
        axios.post('http://localhost:3000/api/items_menu', this.state.form, { responseType: 'document' }).then((response) =>{
            this.props.onHide()
        }).catch((error) => console.log(error))
        // console.log(this.state.form)
    }

    render(){

        const Component = this.props.componente
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
                <form onSubmit={this.handleSubmit}>
                    <Modal.Body>

                        {<Component handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} handleChange={this.handleChange} form={this.state.form}/>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Fechar</Button>
                        <Button type="submit" variant="primary" value="Submit">Salvar</Button>
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
