import React, { Component } from "react";
import "../assets/css/menu.css";

class SideMenu extends Component {
  render() {
    return (
      <div
        className="sidebar"
        data-background-color="white"
        data-active-color="danger"
      >
        <div className="sidebar-wrapper">
          <div className="logo">
            <a href="http://www.creative-tim.com" className="simple-text">
              Painel Admin
            </a>
          </div>

          <ul className="nav">
            {this.props.itensMenu.map(item => (
              <li className="list-group-item" key={item.titulo}>
                <a
                  onClick={() => {
                    this.props.cargaItems(item.link);
                  }}
                >
                  <p>
                    <i className={item.icon} />
                    {item.titulo}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default SideMenu;
