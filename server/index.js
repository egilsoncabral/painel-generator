const express = require('express');
var proxy = require('express-http-proxy');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5001;

app.use(cors());
// REGRAS DE PROXY PARA AUTENTICAÇÃO DE USUÁRIO E ACESSO ÀS FEX
app.get('/ibi_apps/:p(*)',  proxy('http://v321d018:8080'));

app.get('/ibi_apps',  proxy('http://v321d018:8080'));

app.post('/ibi_apps/:p(*)',  proxy('http://v321d018:8080'));

app.use(proxy("http://localhost:5002"))

app.listen(port, () => console.log(`Listening on port ${port}`));
