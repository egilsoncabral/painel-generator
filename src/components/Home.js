import React, { Component } from 'react';
import SideMenu from './SideMenu';
import Content from './Content';

class Home extends Component {

  state={
    itensMenu:[
      {titulo:'Menus', icon:'ti-panel'},
      {titulo:'Páginas', icon:'ti-files'},
      {titulo:'Indicadores', icon:'ti-view-list-alt'},
      {titulo:'Gráficos', icon:'ti-pie-chart'},
    ],
    selectedMenu:{titulo: 'Menus', body:[{nome:'Monitoramento MP', icon: 'trash', cor:'darken-red', identificador:'card-monitoramento', menu_Pai: '', sub_Menu: ''}]}
  }

    render() {
        return (
            <div id="pnlHome">
              <SideMenu itensMenu={this.state.itensMenu}/>  
              <Content tabela={this.state.selectedMenu}/>
            </div>
         )
    };
}

export default Home;
