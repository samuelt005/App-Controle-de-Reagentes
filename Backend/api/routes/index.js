const bodyParser = require('body-parser');
const fornecedores = require('./fornecedoresRoute');
const tiposdereagente = require('./tiposdereagenteRoute');
const tags = require('./tagsRoute');
const unsdemedida = require('./unsdemedidaRoute');
const perfis = require('./perfisRoute');
const nfes = require('./nfesRoute');
const lotesdecompra = require('./lotesdecompraRoute');

module.exports = (app) => {
  app.use(bodyParser.json()); // Converte os dados de body recebidos por métodos em JSON
  app.use(fornecedores, tiposdereagente, tags, unsdemedida, perfis, nfes, lotesdecompra);
};