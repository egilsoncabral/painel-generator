import React, {Component} from 'react'
import '../assets/css/content.css'
import ModalEdicao from './ModalEdicao';
import {Button, ButtonToolbar} from 'react-bootstrap'
import MenuForm from './forms/MenuForm';

class Content extends Component {

    state = { modalShow: false };

    montaCabecalho(cabecalho){
        var colunas = []
        colunas.push( <th scope="col" key="headerCheckbox">#</th>)
        var keyCabecalhos = Object.keys(cabecalho);
        for (const nome of keyCabecalhos) {
            colunas.push( <th scope="col" key={nome}>{nome.charAt(0).toUpperCase() + nome.slice(1)}</th>)
        }
        return colunas
    }

    montaColuna(coluna){
        var colunas = []
        colunas.push(<th scope="row" key="checkbox">
                        <input type="checkbox" aria-label="Checkbox for following text input" />
                       </th>)
        for (const key in coluna) {
            if (coluna.hasOwnProperty(key)) {
                const element = coluna[key];
                colunas.push(<td key={key}>{element}</td>)
            }
        }
        return colunas
    }

    render(){
        let modalClose = () => this.setState({ modalShow: false });
        return(
        <div className="main-panel">
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="!#">{this.props.tabela.titulo}</a>
                    </div>
                </div>
            </nav>
            <div className="content">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-md-12">
                            <div className="card">
                                <div className="header">
                                    <div className="row">
                                        <div className="col">
                                            <h4 className="title">Itens</h4>
                                        </div>
                                        <div className="col">
                                            <div className="float-right">
                                                <ul className="nav navbar-nav navbar-right">
                                                    <li>
                                                    <ButtonToolbar>
                                                        <div className="col">
                                                        <Button
                                                        variant="primary"
                                                        onClick={() => this.setState({ modalShow: true })}
                                                        >
                                                        + Adicionar
                                                        </Button>
                                                        </div>
                                                        <div className="col">
                                                        <Button
                                                        variant="primary"
                                                        onClick={() => this.setState({ modalShow: true })}
                                                        >
                                                        <i className="ti-trash"></i>Remover
                                                        </Button>
                                                        </div>
                                                        <ModalEdicao
                                                        componente={MenuForm}
                                                        show={this.state.modalShow}
                                                        onHide={modalClose}
                                                        />
                                                    </ButtonToolbar>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="content table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr style={{textAlign:'center'}}>
                                                {this.props.tabela.body ? this.montaCabecalho(this.props.tabela.body[0]) : ''}    
                                                </tr>
                                            </thead>
                                            
                                            <tbody>
                                                {this.props.tabela.body ? this.props.tabela.body.map(itensBody =>
                                                    <tr key={itensBody.nome} style={{textAlign:'center'}}>
                                                        {this.montaColuna(itensBody)}
                                                    </tr>
                                                ):  ''}
                                            </tbody>
                                        </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
        
        )
    }
}
export default Content