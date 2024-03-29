const bodyParser = require('body-parser');
const fornecedores = require('./fornecedoresRoutes');
const lotesdecompra = require('./lotesdecompraRoutes');
const nfes = require('./nfesRoutes');
const solicitacoes = require('./solicitacoesRoutes');
const tags = require('./tagsRoutes');
const tiposdereagente = require('./tiposdereagenteRoutes');
const usuarios = require('./usuariosRoutes');
const itensmovimentacao = require('./itensmovimentacaoRoutes');
const cards = require('./cardsRoutes');
const auth = require('./authRoutes');
const perfis = require('./perfisRoutes');

module.exports = (app) => {
	app.use(bodyParser.json());
	app.use(
		auth,
		usuarios,
		fornecedores,
		lotesdecompra,
		nfes,
		solicitacoes,
		tags,
		tiposdereagente,
		itensmovimentacao,
		cards,
		perfis
	);
};
