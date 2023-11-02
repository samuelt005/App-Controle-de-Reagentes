const bodyParser = require('body-parser');
const fornecedores = require('./fornecedoresRoute');
const lotesdecompra = require('./lotesdecompraRoute');
const nfes = require('./nfesRoute');
const perfis = require('./perfisRoute');
const solicitacoes = require('./solicitacoesRoute');
const tags = require('./tagsRoute');
const tiposdereagente = require('./tiposdereagenteRoute');
const unsdemedida = require('./unsdemedidaRoute');
const usuarios = require('./usuariosRoute');

module.exports = (app) => {
  app.use(bodyParser.json()); // Converte os dados de body recebidos por métodos em JSON
  app.use(fornecedores, lotesdecompra, nfes, perfis, solicitacoes, tags, tiposdereagente, unsdemedida, usuarios);
};