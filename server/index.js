const express = require('express');
var proxy = require('express-http-proxy');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));


 // REGRAS DE PROXY PARA AUTENTICAÇÃO DE USUÁRIO E ACESSO ÀS FEX
 app.get('/:p(*)',  proxy('http://10.100.6.76:5000'));

 app.get('/api/*',  proxy('http://10.100.6.76:5000'));
 
 app.get('/api',  proxy('http://10.100.6.76:5000'));
 
 
