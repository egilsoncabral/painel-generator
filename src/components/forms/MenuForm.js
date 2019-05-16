import React, { Component } from "react";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import "@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css";
import "@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css";
import { icones } from "../ListaIcones";
import { listaCores } from "../ListaCores";
import Select from "react-select";
import axios from "axios";

class MenuForm extends Component {
  state = {
    menuOptions: []
  };


    componentDidMount(){
        axios.get('http://localhost:3000/api/items_menu').then((response) =>{
            let selectOption = []
            if (response.data && response.data.length > 0 ) {
                for (const menu of response.data) {
                    selectOption.push({value: menu, label: menu.nome , name:"subMenu"})                    
                }
            }
            this.setState({menuOptions: selectOption})
        }).catch((error) => console.log(error))
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
        }
        

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
                            <input type="text" name="idCard" value={this.props.form && this.props.form.idCard ? this.props.form.idCard : ''} className="form-control" id="inputIdCard" placeholder="identificador" onChange={this.props.handleInputChange} required/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="inputCity">Sub Menu</label>
                            <Select
                                isMulti
                                value={this.props.form && this.props.form.subMenu && this.props.form.subMenu.map(option => {option.label = option.nome; return option})}
                                onChange={this.props.handleInputChange}
                                placeholder="Selecione"
                                options={this.state.menuOptions}
                                name="subMenu"
                            />
                        </div>

                    </div>

            </div>
        )
    }

}

export default MenuForm;
