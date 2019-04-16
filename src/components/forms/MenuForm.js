import React, {Component} from 'react'
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css';
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css';
import {icones} from '../listaIcones'
import Select from 'react-select';

class MenuForm extends  Component{

    constructor(props) {
        super(props);
        this.state = {
          value: '',
          colorSelectOption: null,
          menuSelectOption: null
        };
      }
      handleChange = (value) => {
        this.setState({ value });
      }

      handleColorSelectChange = (colorSelectOption) => {
        this.setState({ colorSelectOption });
      }
      handleMenuSelectChange = (menuSelectOption) => {
        this.setState({ menuSelectOption });
      }

    render(){
        const props = {
            icons: icones,
            theme: 'bluegrey',
            value: this.state.value,
            onChange: this.handleChange,
            isMulti: false,
            renderUsing:'class',
            closeOnSelect: true,
            searchPlaceholder:'Pesquise pelo ícone'
          };
        const menuOptions = [
            //{ value: 'vanilla', label: 'Vanilla' }
        ];
        const colorOptions = [
            //{ value: 'vanilla', label: 'Vanilla' }
        ];
        
        return (
            <div>
                <form>
                <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="inputNome">Nome</label>
                        <input type="text" class="form-control" id="inputNome" placeholder="Nome" />
                        </div>
                        <div class="form-group col-md-6">
                        <label for="inputIcone">Icone</label>
                         <FontIconPicker {...props} id="inputIcone"/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="inputColor">Cor do Ícone</label>
                            <Select
                                isMulti
                                value={this.state.colorSelectOption}
                                onChange={this.handleColorSelectChange}
                                placeholder="Selecione"
                                options={colorOptions}
                            />
                        </div>
                        <div class="form-group col-md-6">
                        <label for="inputIdCard">Identificador do Card</label>
                            <input type="text" class="form-control" id="inputIdCard" placeholder="identificador" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="inputCity">Sub Menu</label>
                            <Select
                                isMulti
                                value={this.state.menuSelectOption}
                                onChange={this.handleMenuSelectChange}
                                placeholder="Selecione"
                                options={menuOptions}
                            />
                        </div>
                        
                    </div>
                    
                </form>
            </div>
        )   
    }
    
}

export default MenuForm