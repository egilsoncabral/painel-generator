const express = require('express');
var proxy = require('express-http-proxy');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5001;

app.use(cors());
app.use(proxy("http://localhost:5000"))

app.listen(port, () => console.log(`Listening on port ${port}`));
