const bodyParser = require('body-parser');
const fornecedores = require('./fornecedoresRoute');

module.exports = (app) => {
	app.use(bodyParser.json()); // Converte os dados de body recebidos por métodos em json
  app.use(fornecedores);
};
