import React, { Component } from "react";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import "@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css";
import "@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css";
import { icones } from "../ListaIcones";
import { listaCores } from "../ListaCores";
import Select from "react-select";
import axios from "axios";

class IndicadorForm extends Component {
  state = {
    menuOptions: []
  };


    componentDidMount(){

    }


    render(){
        const props = {
            icons: icones,
            theme: 'bluegrey',
            onChange: this.props.handleChange,
            isMulti: false,
            renderUsing:'class',
            closeOnSelect: true,
            searchPlaceholder:'Pesquise pelo ícone'
          };
        if (this.state.form && this.props.form.subMenu) {
            this.setState({menuOptions: this.props.form.subMenu})
        };


        return (
            <div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputNome">Nome</label>
                    <input type="text" name="nome" value={this.props.form && this.props.form.nome ? this.props.form.nome : ''} className="form-control" id="inputNome" placeholder="Nome" onChange={this.props.handleInputChange} required/>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputIcone">Icone</label>
                    <FontIconPicker {...props} value={this.props.form && this.props.form.icone}/>
                  </div>
                </div>
                <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="inputColor">Cor do Ícone</label>
                            <Select
                                defaultInputValue={this.props.form && this.props.form.cor}
                                onChange={this.props.handleInputChange}
                                placeholder="Selecione"
                                options={listaCores}
                            />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputIdCard">Identificador do Card</label>
                    <input
                      type="text"
                      name="idCard"
                      value={this.props.form && this.props.form.idCard ?
                              this.props.form.idCard : ''
                            }
                      className="form-control"
                      id="inputIdCard"
                      placeholder="identificador"
                      onChange={this.props.handleInputChange}
                      required/>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputCity">Nome do Rótulo Quantidade</label>
                      <input
                        type="text"
                        name="labelQtd"
                        value={this.props.form && this.props.form.labelQtd ?
                                this.props.form.labelQtd : ''
                              }
                        className="form-control"
                        id="inputQtdLabel"
                        placeholder="Rótulo Quantidade"
                        onChange={this.props.handleInputChange}
                        required/>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputCity">Nome do Rótulo Valor</label>
                      <input
                        type="text"
                        name="labelValor"
                        value={this.props.form && this.props.form.labelValor ?
                                  this.props.form.labelValor : ''
                              }
                        className="form-control"
                        id="inputVlLabel"
                        placeholder="Rótulo Valor"
                        onChange={this.props.handleInputChange}
                        required/>
                  </div>
                </div>

            </div>
        )
    }

}

export default IndicadorForm;
