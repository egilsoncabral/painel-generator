import React from 'react';
import {Alert, Button} from 'react-bootstrap';
import CustomSpinner from "../components/CustomSpinner";


import * as FexAPI from '../utils/FexAPI';

import '../assets/css/login.css';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      senha: "",
      msgErroAuth: "",
      autenticando: false,
      showErro: false,
    }
  }

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState ({
      [name]: value
    })
  }

  iniciarAutenticacao = autenticando => {
    this.setState({autenticando})
  }

  showErroAuth = (show, msg) => {
    this.setState({
      showErro: show,
      msgErroAuth: msg
    });
    this.iniciarAutenticacao(false);
  }

  handleSubmit = event => {

    event.preventDefault();
    this.iniciarAutenticacao(true);

    document.body.style.cursor='wait';

    FexAPI.login(this.state.usuario, this.state.senha, (retornoLogin) => {
      let result = retornoLogin.querySelector('result');
      if (result.getAttribute('value') > 0) {
        this.keepTokenSession(result.getAttribute('CSRFTokenValue'));
        this.redirectUser("/home");
      } else if (result.getAttribute('value') === '-1') {
        this.showErroAuth(true, 'Usuário não tem permissão para acessar a aplicação')
      } else{
        this.showErroAuth(true, 'Usuário ou Senha inválidos')
      }
      document.body.style.cursor='default';
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
      <React.Fragment>
        <Alert dismissible show={this.state.showErro} variant="danger"
          onClick={() => this.showErroAuth(false,'')}>
          <p> {this.state.msgErroAuth} </p>
        </Alert>

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
                <Button type="submit" variant="primary" value="Submit">
                  {this.state.autenticando ?
                    <CustomSpinner msg="Autenticando..." /> : "Acessar"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    )
  }

}

export default Login;
