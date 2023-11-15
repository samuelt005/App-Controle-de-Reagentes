const bodyParser = require('body-parser');
const fornecedores = require('./fornecedoresRoutes');
const lotesdecompra = require('./lotesdecompraRoutes');
const nfes = require('./nfesRoutes');
const perfis = require('./perfisRoutes');
const solicitacoes = require('./solicitacoesRoutes');
const tags = require('./tagsRoutes');
const tiposdereagente = require('./tiposdereagenteRoutes');
const unsdemedida = require('./unsdemedidaRoutes');
const usuarios = require('./usuariosRoutes');
const itensmovimentacao = require('./itensmovimentacaoRoutes');
const cards = require('./cardsRoutes');
const auth = require('./authRoutes');

module.exports = (app) => {
	app.use(bodyParser.json()); // Converte os dados de body recebidos por métodos em JSON
	app.use(
		auth,
		usuarios,
		fornecedores,
		lotesdecompra,
		nfes,
		solicitacoes,
		tags,
		tiposdereagente,
		unsdemedida,
		itensmovimentacao,
		cards,
		perfis
	);
};
