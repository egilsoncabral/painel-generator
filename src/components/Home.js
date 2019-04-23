import React, { Component } from "react";
import SideMenu from "./SideMenu";
import Content from "./Content";
import axios from "axios";

class Home extends Component {
  state = {
    itensMenu: [
      { titulo: "Menus", icon: "ti-panel", link: "items_menu" },
      { titulo: "Páginas", icon: "ti-files", link: "paginas" },
      { titulo: "Indicadores", icon: "ti-view-list-alt", link: "indicadores" },
      { titulo: "Gráficos", icon: "ti-pie-chart", link: "graficos" }
    ],
    selectedMenu: { titulo: "Menus", body: [] }
  };

  componentDidMount() {
    this.carregarItems("items_menu")
  }

  carregarItems = doMenu => {
    axios
      .get(`http://localhost:3000/api/${doMenu}`)
      .then(response => {
        let menu = this.state.selectedMenu;
        if (response.data && response.data.length > 0) {
          menu.body = response.data;
          let itemMenu = this.state.itensMenu.find(item => item.link === doMenu)
          menu.titulo = itemMenu.titulo
          menu.link = itemMenu.link
        }
        this.setState({ selectedMenu: menu });
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div id="pnlHome">
        <SideMenu itensMenu={this.state.itensMenu} cargaItems={this.carregarItems} />
        <Content tabela={this.state.selectedMenu} cargaItems={this.carregarItems}/>
      </div>
    );
  }
}

export default Home;
