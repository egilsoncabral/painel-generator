import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import { tiposGrafico } from "../TiposGrafico";

var _contextlocation = window.location.origin;
var _urlContent = "/run.bip?BIP_REQUEST_TYPE=BIP_RUN&BIP_folder=IBFS:/WFC/Repository/";
var _ibiapp = "painelestrategicoinss/";

class GraficoForm extends Component {
  state = {
    listaMasters: [],
    listaCamposMaster:[]
  };


  componentDidMount(){
    axios.get(`${_contextlocation}/ibi_apps${_urlContent}${_ibiapp}comum&BIP_item=lista_masters.fex&rnd=${Math.random()}`).then((response) =>{
        let selectOption = []
        if (response.data && response.data.records && response.data.records.length > 0 ) {
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
      if (response.data && response.data.records && response.data.records.length > 0 ) {
          for (const master of response.data.records) {
              selectOption.push({value: master.NAME !== null && master.NAME !== undefined ? master.NAME : '', label: master.NAME , name:"camposMaster"})                    
          }
      }
      this.setState({listaCamposMaster: selectOption})
    }).catch((error) => console.log(error))
  }


    render(){
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
                  <label htmlFor="inputIdCard">Identificador do Gráfico</label>
                    <input
                      type="text"
                      name="idGrafico"
                      value={this.props.form && this.props.form.idGrafico ?
                              this.props.form.idGrafico : ''
                            }
                      className="form-control"
                      id="inputIdGrafico"
                      placeholder="identificador"
                      onChange={this.props.handleInputChange}
                      disabled={this.props.isDisable}
                      required/>
                  </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">Tipo de Gráfico</label>
                        <Select
                            defaultInputValue={this.props.form && this.props.form.tipoGrafico}
                            onChange={this.props.handleInputChange}
                            isDisabled={this.props.isDisable}
                            placeholder="Selecione"
                            options={tiposGrafico}
                        />
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
                </div>
                <div className="form-row">
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

export default GraficoForm;
