import React, {Component} from 'react'
import '../assets/css/content.css'
import ModalEdicao from './ModalEdicao';
import {ButtonToolbar, Dropdown, DropdownButton} from 'react-bootstrap'
import ModalRemocao from './ModalRemocao';

class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalEdicaoShow: false, 
            modalRemocaoShow: false,
            selectedItens: []
        };

        this.handleSelect = this.handleSelect.bind(this)
    }


    montaCabecalho(cabecalho){
        var colunas = []
        if (cabecalho) {
            colunas.push(<th scope="col" key="headerCheckbox">#</th>)
            var keyCabecalhos = Object.keys(cabecalho);
            for (const nome of keyCabecalhos) {
                if (nome !== '_id' && nome !== '__v') {
                    colunas.push(<th scope="col" key={nome}>{nome.charAt(0).toUpperCase() + nome.slice(1)}</th>)    
                }
                
            }
        }
        return colunas
    }

    montaColuna(coluna){
        var colunas = []
        if (coluna) {
            colunas.push(<th scope="row" key="checkbox">
                <input type="checkbox" id={coluna.nome} aria-label="Checkbox for following text input" onClick={this.handleSelect}/>
            </th>)
            for (const key in coluna) {
                if (coluna.hasOwnProperty(key) && key !== '_id' && key !== '__v') {
                    const element = coluna[key];
                        colunas.push(<td key={key}>{Array.isArray(element) ? element.map((el, index) => index === 0 ? el.label : ', ' + el.label  ) : element}</td>)
                }
            }
        }
        return colunas
    }

    handleSelect(event){
        let itensSelecionados = this.state.selectedItens
        if (event.target.checked) {
            itensSelecionados.push(this.props.tabela.body.find(itemMenu => {
                return itemMenu.nome === event.target.id
            }))
        } else{
            itensSelecionados = itensSelecionados.filter(itemMenu => {
                return itemMenu.nome !== event.target.id
            })
        }
        this.setState({selectedItens : itensSelecionados})
    }

    render(){
        let modalClose = () => this.setState({ modalEdicaoShow: false, modalRemocaoShow: false});
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
                                                <ul className="nav navbar-nav navbar-right float-right">
                                                    <li>
                                                    <ButtonToolbar>
                                                        <div className="col">
                                                        <DropdownButton
                                                            variant="primary"
                                                            id={`dropdown-button-drop-down`}
                                                            key='down' drop="left"
                                                            title=""
                                                        >
                                                            <Dropdown.Item onClick={() => this.setState({ modalEdicaoShow: true })} disabled={this.state.selectedItens.length > 0 ? true : false}>+ Adicionar</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => this.setState({ modalEdicaoShow: true })}
                                                            disabled={this.state.selectedItens.length === 1 ? false : true}>Editar</Dropdown.Item>
                                                            <Dropdown.Divider />
                                                            <Dropdown.Item onClick={() => this.setState({ modalRemocaoShow: true })} 
                                                                disabled={this.state.selectedItens.length > 0 ? false : true}><i className="ti-trash"></i>Remover</Dropdown.Item>
                                                        </DropdownButton>
                                                        </div>
                                                        <ModalEdicao
                                                        component={this.props.tabela.form ? this.props.tabela.form : ''}
                                                        itens={this.state.selectedItens}
                                                        show={this.state.modalEdicaoShow}
                                                        onHide={modalClose}
                                                        selectedMenu={this.props.tabela}
                                                        cargaItems={this.props.cargaItems}
                                                        />
                                                        <ModalRemocao
                                                        itens={this.state.selectedItens}
                                                        show={this.state.modalRemocaoShow}
                                                        onHide={modalClose}
                                                        selectedMenu={this.props.tabela}
                                                        cargaItems={this.props.cargaItems}
                                                        />
                                                    </ButtonToolbar>
                                                    </li>
                                                </ul>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="content table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr style={{textAlign:'center'}}>
                                                {this.props.tabela.body && this.montaCabecalho(this.props.tabela.body[0])}    
                                                </tr>
                                            </thead>
                                            
                                            <tbody>
                                                {this.props.tabela.body && this.props.tabela.body.map((itensBody, index) =>
                                                    <tr key={itensBody.nome + index} style={{textAlign:'center'}}>
                                                        {this.montaColuna(itensBody)}
                                                    </tr>
                                                )}
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