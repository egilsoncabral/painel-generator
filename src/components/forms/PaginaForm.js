import React, { Component } from "react";
import "@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css";
import "@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css";
import {Form, Row, Col} from 'react-bootstrap'
import Select from "react-select";
import axios from "axios";

class PaginaForm extends Component {
  state = {
    menuOptions: []
  };


    componentDidMount(){
        axios.get('http://localhost:3000/api/itens_menu').then((response) =>{
            console.log(response)
            let selectOption = []
            if (response.data && response.data.length > 0 ) {
                for (const menu of response.data) {
                    selectOption.push({value: menu.nome !== null ? menu.nome.replace(/ /g,"-").toLowerCase(): '', label: menu.nome , name:"subMenu"})                    
                }
            }
            this.setState({menuOptions: selectOption})
        }).catch((error) => console.log(error))
    }


    render(){

        return (
            <div>

                <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="inputNome">Titulo</label>
                            <input type="text" name="nome" value={this.props.form && this.props.form.titulo ? this.props.form.titulo : ''} className="form-control" id="inputTitulo" placeholder="Titulo" onChange={this.props.handleInputChange} required/>
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
                                />
                                <Form.Check
                                custom
                                type="radio"
                                inline
                                label="Indicadores/Gráficos"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                />
                                
                            </Col>
                        </Form.Group>
                    </fieldset>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="inputCity">Menus</label>
                                <Select
                                    isMulti
                                    defaultInputValue={this.props.form && this.props.form.conteudo}
                                    onChange={this.props.handleInputChange}
                                    placeholder="Selecione"
                                    options={this.state.menuOptions}
                                />
                            </div>
                            <div className="form-group col-md-12">
                            <label htmlFor="inputCity">Indicadores/Gráficos</label>
                                <Select
                                    isMulti
                                    defaultInputValue={this.props.form && this.props.form.conteudo}
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
