import React, { Component } from "react";
import "@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css";
import "@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css";
import {Form, Row, Col} from 'react-bootstrap'
import Select from "react-select";
import axios from "axios";

class PaginaForm extends Component {
  state = {
    menuOptions: [],
    selectedRadio: 0
  };


  componentDidMount(){
    axios.get('http://localhost:3000/api/items_menu').then((response) =>{
        let selectOption = []
        if (response.data && response.data.length > 0 ) {
            for (const menu of response.data) {
                selectOption.push({value: menu.nome !== null ? menu.nome.replace(/ /g,"-").toLowerCase(): '', label: menu.nome , name:"conteudo"})                    
            }
        }
        this.setState({menuOptions: selectOption})
    }).catch((error) => console.log(error))
}
    handleRadioButton(){
        this.setState({selectedRadio: this.state.selectedRadio === 0 ? 1 : 0})
    }

    render(){

        return (
            <div>

                <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="inputNome">Nome</label>
                            <input type="text" name="nome" value={this.props.form && this.props.form.nome ? this.props.form.nome : ''} className="form-control" id="inputNome" placeholder="Nome" onChange={this.props.handleInputChange} required/>
                        </div>
                       
                    </div>
                    <div className="form-row">
                    <fieldset>
                        <Form.Group as={Row}>
                            <Form.Label as="legend" column sm={12}>
                                Radios
                            </Form.Label>
                            <Col sm={12}>
                                <Form.Check
                                custom
                                type="radio"
                                inline
                                label="Menus"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                onChange={() =>this.handleRadioButton()}
                                defaultChecked
                                />
                                <Form.Check
                                custom
                                type="radio"
                                inline
                                label="Indicadores/Gráficos"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                onChange={() =>this.handleRadioButton()}
                                />
                                
                            </Col>
                        </Form.Group>
                    </fieldset>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12" style={this.state.selectedRadio === 0 ? {display:'block'} : {display:'none'}}>
                            <label htmlFor="inputCity">Menus</label>
                                <Select
                                    isMulti
                                    value={this.props.form && this.props.form.conteudo && this.props.form.conteudo.filter(option => option.label)}
                                    onChange={this.props.handleInputChange}
                                    placeholder="Selecione"
                                    options={this.state.menuOptions}
                                />
                            </div>
                            <div className="form-group col-md-12" style={this.state.selectedRadio === 1 ? {display:'block'} : {display:'none'}}>
                            <label htmlFor="inputCity">Indicadores/Gráficos</label>
                                <Select
                                    isMulti
                                    value={this.props.form && this.props.form.conteudo && this.props.form.conteudo.filter(option => option.label)}
                                    onChange={this.props.handleInputChange}
                                    placeholder="Selecione"
                                    options={this.state.menuOptions}
                                />
                        </div>

                    </div>
                </div>
        )
    }

}

export default PaginaForm;