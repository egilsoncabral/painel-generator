import React, { Component } from 'react';
import SideMenu from './SideMenu';
import Content from './Content';
import axios from 'axios'

class Home extends Component {

  state={
    itensMenu:[
      {titulo:'Menus', icon:'ti-panel'},
      {titulo:'Páginas', icon:'ti-files'},
      {titulo:'Indicadores', icon:'ti-view-list-alt'},
      {titulo:'Gráficos', icon:'ti-pie-chart'},
    ],
    selectedMenu:{titulo: 'Menus', body:[]}
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/items_menu').then((response) => {
      let menu = this.state.selectedMenu
      if (response.data && response.data.length > 0) {
        menu.body = response.data
      }
      this.setState({ selectedMenu: menu })
    }).catch((error) => console.log(error))
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
