import axios from 'axios'
var _contextlocation = window.location.origin;
var _urlContent = "/run.bip?BIP_REQUEST_TYPE=BIP_RUN&BIP_folder=IBFS:/WFC/Repository/";
var _ibiapp = "painelestrategicoinss/";

export const getFex = (caminho, arquivo, parametros, funcaoPreenche) => {
    var retornoFexJSON;
    axios.get(`${_contextlocation}/ibi_apps${_urlContent}${_ibiapp}${caminho}&BIP_item=${arquivo}&${parametros}&rnd=${Math.random()}`)
    .then((response) => response.data)
    .then((_data) => {
      let error;
      if(_data.records){
        error = _data.records.length > 0 ? false : true;
      }
      retornoFexJSON = error ? "" : _data;
      funcaoPreenche(retornoFexJSON, error);
    }).catch(function(error) {
      retornoFexJSON = 'Sem dados';
      funcaoPreenche(retornoFexJSON, error);
    });
}


export const login = (username, password, callback, erro) => {
  const bodyFormData = new URLSearchParams();
  bodyFormData.append('IBIB_force_signon', false)
  bodyFormData.append('webfocus-security-direct-response', true)
  bodyFormData.append('IBIWF_rememberme', true)
  bodyFormData.append('IBIB_userid', username)
  bodyFormData.append('IBIB_password', password)
  var retornoLogin = '';
  const instance = axios.create()
  instance.defaults.timeout = 1000;
  instance.post(_contextlocation + '/ibi_apps/service/wf_security_check.jsp', bodyFormData, { responseType: 'document' })
    .then((_data) => {
      retornoLogin = _data.data;
      if (retornoLogin.querySelector('result').getAttribute('value') > 0) {
        getFex('comum/', 'retornaUsuario.fex', '', (retornoFexJSON) => {
          var resultado = retornoFexJSON.substring(0, retornoFexJSON.indexOf("\n")).trim();
          if (resultado !== undefined && resultado !== null && resultado !== "") {
            callback(retornoLogin)
          } else {
            retornoLogin.querySelector('result').setAttribute('value', '-1')
            callback(retornoLogin)
          }
        })
      } else {
        callback(retornoLogin)
      }
    }).catch( error => erro(error))

}
