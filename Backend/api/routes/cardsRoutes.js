const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const CardsController = require('../controllers/CardsController');

const router = Router();

router
	// Rota para pegar os dados da página de listagem
	.get(
		'/cards/listing',
		autorizacao(['Administrador']),
		CardsController.getListingData
	)

	// Rota para pegar os dados da página de histórico
	.get(
		'/cards/historico/:id',
		autorizacao(['Administrador']),
		CardsController.getHistoricoData
	)

	// Rota para pegar os dados da página de solicitação
	.get(
		'/cards/solicitacao/:id',
		autorizacao(['Administrador']),
		CardsController.getSolicitacaoData
	);

module.exports = router;
