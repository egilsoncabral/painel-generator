import React, { Component } from "react";
import "@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css";
import "@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css";
import {Form, Row, Col} from 'react-bootstrap'
import Select from "react-select";
import axios from "axios";

class PaginaForm extends Component {
  state = {
    menuOptions: [],
    indicadoresOptions: [],
    selectedRadio: -1
  };


  componentDidMount(){
    let indicadoresOption = []
    let selectOption = []
    axios.all([
        axios.get('http://localhost:3000/api/items_menu'),
        axios.get('http://localhost:3000/api/indicadores'),
        axios.get('http://localhost:3000/api/graficos')
      ])
      .then(axios.spread((itemMenuRes, indicadoresRes, graficosRes) => {
        // do something with both responses
        if (itemMenuRes.data && itemMenuRes.data.length > 0 ) {
            for (const menu of itemMenuRes.data) {
                selectOption.push({value: menu, label: menu.nome , name:"conteudo"})                    
            }
            this.setState({menuOptions: selectOption})
        }
        
        if (indicadoresRes.data && indicadoresRes.data.length > 0 ) {
            for (const menu of indicadoresRes.data) {
                indicadoresOption.push({value: menu, label: menu.nome , name:"conteudo"})                    
            }
        }
        if (graficosRes.data && graficosRes.data.length > 0 ) {
            for (const menu of graficosRes.data) {
                indicadoresOption.push({value: menu, label: menu.nome , name:"conteudo"})                    
            }
        }
        this.setState({indicadoresOptions: indicadoresOption})
      })).catch((error) => console.log(error))
   
}
    handleRadioButton(event){
        this.props.handleInputChange(event)
        this.setState({selectedRadio: event.target.value.toLowerCase() === 'menu' ? 0 : 1})
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
                     <label htmlFor="tipoPagina">Tipo de Página</label>
                        <Form.Group as={Row}>
                             
                            <Col sm={12} id="tipoPagina">
                                <Form.Check
                                custom
                                type="radio"
                                inline
                                label="Menus"
                                name="tipo"
                                id="formHorizontalRadios1"
                                onChange={(event) =>this.handleRadioButton(event)}
                                value="Menu"
                                defaultChecked={this.props.form && this.props.form.tipo === 'menu' ? true : false}
                                />
                                <Form.Check
                                custom
                                type="radio"
                                inline
                                label="Indicadores/Gráficos"
                                name="tipo"
                                id="formHorizontalRadios2"
                                onChange={(event) =>this.handleRadioButton(event)}
                                value="Indicadores/Graficos"
                                defaultChecked={this.props.form && this.props.form.tipo === 'indicadores/graficos' ? true : false}
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
                                    value={this.props.form && this.props.form.conteudo && this.props.form.conteudo.map(option => {return {label:option.nome, value: option}})}
                                    onChange={this.props.handleInputChange}
                                    placeholder="Selecione"
                                    options={this.state.menuOptions}
                                    getOptionValue={option => option.name}
                                />
                            </div>
                            <div className="form-group col-md-12" style={this.state.selectedRadio === 1 ? {display:'block'} : {display:'none'}}>
                            <label htmlFor="inputCity">Indicadores/Gráficos</label>
                                <Select
                                    isMulti
                                    value={this.props.form && this.props.form.conteudo && this.props.form.conteudo.map(option => {return {label:option.nome, value: option}})}
                                    onChange={this.props.handleInputChange}
                                    placeholder="Selecione"
                                    options={this.state.indicadoresOptions}
                                />
                        </div>

                    </div>
                </div>
        )
    }

}

export default PaginaForm;
