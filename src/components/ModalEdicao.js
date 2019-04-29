import React, {Component} from 'react'
// import PropTypes from 'prop-types';
import MenuForm from './forms/MenuForm'
import {Button, Modal} from 'react-bootstrap'
import '../assets/css/modal.css'
import axios from 'axios'

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
    

    handleInputChange(event) {
        const target = event.target !== undefined ? event.target : event;
        let formAtual = this.state.form
        if (Array.isArray(target)) {
            formAtual[target[0].name] = target
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
        event.preventDefault()
        let form = this.state.form
        if (form.subMenu === undefined) {
            form.subMenu = ''
        }
        let link = this.props.selectedMenu.link
        axios.post('http://localhost:3000/api/items_menu', form, { responseType: 'document' }).then((response) =>{
            this.props.cargaItems(link)    
            this.props.onHide()
        }).catch((error) => console.log(error))
        // console.log(this.state.form)
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
                            <this.props.component handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} handleChange={this.handleChange} 
                            form={this.state.form}/>
                        </React.Fragment>
                        
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
