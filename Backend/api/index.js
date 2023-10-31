const express = require('express');
const routes = require('./routes');

const app = express();
const port = 3000; // Porta padrão

routes(app);

app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`));

module.exports = app;
