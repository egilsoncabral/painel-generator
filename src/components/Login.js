import React from 'react';
// import {Alert, Spinner} from 'react-bootstrap'
import {Button} from 'react-bootstrap'


import * as FexAPI from '../utils/FexAPI';

import '../assets/css/login.css';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      senha: ""
    }
  }

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState ({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    FexAPI.login(this.state.usuario, this.state.senha, (retornoLogin) => {
      let result = retornoLogin.querySelector('result');
      if (result.getAttribute('value') > 0) {
        this.keepTokenSession(result.getAttribute('CSRFTokenValue'));
        this.redirectUser("/home");
      } else if (result.getAttribute('value') === '-1') {
        alert('Usuário não tem permissão para acessar a aplicação');
      } else{
        alert('Usuário ou Senha inválidos');
      }
    })
  }

  redirectUser = (path) => {
    this.props.history.push(path);
  }

  keepTokenSession = (tokenValue) => {
    sessionStorage.setItem('user', tokenValue);
  }

  componentDidMount(){
    if (sessionStorage.getItem("user") != null) {
      this.redirectUser("/home");
    }
  }

  render() {
    return (
      <div className="form-container">
        <div className="login-form" onSubmit={this.handleSubmit}>
          <form>
            <div className="form-header">
              <span className="app-name">Gerador Painel Estratégico</span>
              <span className="app-desc">Controle de Acesso</span>
            </div>
            <div className="form-group">
                <label htmlFor="inputNome">Usuário</label>
                <input type="text" name="usuario"
                       placeholder="Usuário"
                       value={this.state.usuario}
                       className="form-control" id="inputUsuario"
                       onChange={this.handleInputChange} required/>
            </div>
            <div className="form-group">
                <label htmlFor="inputNome">Senha</label>
                <input type="password" name="senha" value={this.state.senha}
                       placeholder="Senha"
                       className="form-control" id="inputSenha"
                       onChange={this.handleInputChange} required/>
            </div>
            <div className="form-buttons">
              <Button type="submit" variant="primary" value="Submit">Acessar</Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

}

export default Login;
