import React, { Component } from "react";
import SideMenu from "./SideMenu";
import Content from "./Content";
import axios from "axios";
import MenuForm from "./forms/MenuForm";
import PaginaForm from "./forms/PaginaForm";
import IndicadorForm from "./forms/IndicadorForm";
import GraficoForm from "./forms/GraficoForm";

class Home extends Component {
  state = {
    itensMenu: [
      { titulo: "Menus", icon: "ti-panel", link: "items_menu", form: MenuForm },
      { titulo: "Páginas", icon: "ti-files", link: "paginas", form: PaginaForm},
      { titulo: "Indicadores", icon: "ti-view-list-alt", link: "indicadores", form: IndicadorForm},
      { titulo: "Gráficos", icon: "ti-pie-chart", link: "graficos", form: GraficoForm },
      { titulo: "Logout", icon: "ti-direction", link: "home", form: '' }
    ],
    selectedMenu: { titulo: "Menus", body: [] },
    selectedItens: []
  };

  componentDidMount() {
    this.carregarItems("items_menu")
  }

  handleItemMenuClick = (element, item) => {
      this.setState({selectedItens: []})
      if (item.titulo !== "Logout") {
        this.carregarItems(item.link);
      } else {
        sessionStorage.removeItem("user","");
        this.props.history.push(item.link);
      }
  }

  carregarItems = doMenu => {
    this.setState({selectedItens: []})
    axios
      .get(`http://localhost:3000/api/${doMenu}`)
      .then(response => {
        let menu = this.state.selectedMenu;
        let itemMenu = this.state.itensMenu.find(item => item.link === doMenu)
        if (response.data && response.data.length > 0) {
          menu.body = response.data;
        }else{
          menu.body = []
        }
        menu.titulo = itemMenu.titulo
        menu.link = itemMenu.link
        menu.form = itemMenu.form
        this.setState({ selectedMenu: menu });
      })
      .catch(error => console.log(error));
  };

  removerItemMenu = comId => {    
    let items = this.state.selectedMenu;
    items.body = this.state.selectedMenu.body.filter(item => item._id !== comId);
    this.setState({selectedMenu: items})
  }

  render() {
    return (
      <div id="pnlHome">
        <SideMenu itensMenu={this.state.itensMenu} handleItemMenuClick={this.handleItemMenuClick} />
        <Content tabela={this.state.selectedMenu}
            cargaItems={this.carregarItems}
            selectedItens={this.state.selectedItens}
            removerItemMenu={this.removerItemMenu}/>
      </div>
    );
  }
}

export default Home;
