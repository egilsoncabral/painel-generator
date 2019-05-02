import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import { tiposGrafico } from "../TiposGrafico";

var _contextlocation = window.location.origin;
var _urlContent = "/run.bip?BIP_REQUEST_TYPE=BIP_RUN&BIP_folder=IBFS:/WFC/Repository/";
var _ibiapp = "painelestrategicoinss/";

class GraficoForm extends Component {
  state = {
    listaMasters: []
  };


    componentDidMount(){
      axios.get(`${_contextlocation}/ibi_apps${_urlContent}${_ibiapp}comum&BIP_item=lista_masters.fex&rnd=${Math.random()}`).then((response) =>{
          let selectOption = []
          if (response.data && response.data.length > 0 ) {
              for (const menu of response.data) {
                  selectOption.push({value: menu.nome !== null ? menu.nome.replace(/ /g,"-").toLowerCase(): '', label: menu.nome , name:"master"})                    
              }
          }
          this.setState({listaMasters: selectOption})
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
                    <input type="text" name="nome" value={this.props.form && this.props.form.nome ? this.props.form.nome : ''} className="form-control" id="inputNome" placeholder="Nome" onChange={this.props.handleInputChange} required/>
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
                      required/>
                  </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">Tipo de Gráfico</label>
                        <Select
                            value={this.props.form && this.props.form.tipoGrafico && this.props.form.tipoGrafico.filter(option => option.label)}
                            onChange={this.props.handleInputChange}
                            placeholder="Selecione"
                            options={tiposGrafico}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">Lista de Masters</label>
                        <Select
                            value={this.props.form && this.props.form.master && this.props.form.master.filter(option => option.label)}
                            onChange={this.props.handleInputChange}
                            placeholder="Selecione"
                            options={this.state.listaMasters}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">Campos da Master</label>
                        <Select
                            value={this.props.form && this.props.form.camposMaster && this.props.form.camposMaster.filter(option => option.label)}
                            onChange={this.props.handleInputChange}
                            placeholder="Selecione"
                            options={this.state.listaMasters}
                        />
                    </div>
                </div>
                

            </div>
        )
    }

}

export default GraficoForm;
