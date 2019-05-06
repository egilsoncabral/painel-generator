import React, { Component } from "react";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import "@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css";
import "@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css";
import { icones } from "../ListaIcones";
import { listaCores } from "../ListaCores";
import Select from "react-select";
import axios from "axios";

var _contextlocation = window.location.origin;
var _urlContent = "/run.bip?BIP_REQUEST_TYPE=BIP_RUN&BIP_folder=IBFS:/WFC/Repository/";
var _ibiapp = "painelestrategicoinss/";

class IndicadorForm extends Component {
  state = {
    listaMasters: [],
    listaCamposMaster:[]
  };


  componentDidMount(){
      axios.get(`${_contextlocation}/ibi_apps${_urlContent}${_ibiapp}comum&BIP_item=lista_masters.fex&rnd=${Math.random()}`).then((response) =>{
          let selectOption = []
          if (response.data && response.data.records.length > 0 ) {
              for (const master of response.data.records) {
                  selectOption.push({value: master.FILENAME !== null && master.FILENAME !== undefined ? master.FILENAME : '', label: master.FILENAME , name:"master"})                    
              }
          }
          this.setState({listaMasters: selectOption})
      }).catch((error) => console.log(error))
  }

  handleMasterSelected(event){
    this.setState({listaCamposMaster:[]})
    this.props.handleInputChange([{name:'camposMaster', value:''}])
    axios.get(`${_contextlocation}/ibi_apps${_urlContent}${_ibiapp}comum&BIP_item=lista_nome_colunas.fex&TABELA=${event.label}&rnd=${Math.random()}`).then((response) =>{
      let selectOption = []
      if (response.data && response.data.records.length > 0 ) {
          for (const master of response.data.records) {
              selectOption.push({value: master.NAME !== null && master.NAME !== undefined ? master.NAME : '', label: master.NAME , name:"camposMaster"})                    
          }
      }
      this.setState({listaCamposMaster: selectOption})
    }).catch((error) => console.log(error))
  }


    render(){
        const props = {
            icons: icones,
            theme: 'bluegrey',
            onChange: this.props.handleChange,
            disabled: this.props.isDisable,
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
                    <input type="text" name="nome" value={this.props.form && this.props.form.nome ? this.props.form.nome : ''} 
                    className="form-control" id="inputNome" placeholder="Nome" 
                    onChange={this.props.handleInputChange} 
                    disabled={this.props.isDisable}
                    required/>
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
                                isDisabled={this.props.isDisable}
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
                      disabled={this.props.isDisable}
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
                        disabled={this.props.isDisable}
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
                        disabled={this.props.isDisable}
                        required/>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputCity">Lista de Masters</label>
                      <Select
                        defaultInputValue={this.props.form && this.props.form.master}
                        onChange={(event) => {this.props.handleInputChange(event); this.handleMasterSelected(event)}}
                        isDisabled={this.props.isDisable}
                        placeholder="Selecione"
                        options={this.state.listaMasters}/>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputCity">Campos da Master</label>
                      <Select
                        isMulti
                        isDisabled={this.state.listaCamposMaster.length === 0 && this.props.isDisable}
                        value={this.props.form && this.props.form.camposMaster && this.props.form.camposMaster.filter(option => option.label)}
                        onChange={this.props.handleInputChange}
                        placeholder="Selecione"
                        options={this.state.listaCamposMaster}
                      />
                  </div>
                  
              </div>
            </div>
        )
    }

}

export default IndicadorForm;
