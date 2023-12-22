const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const autenticado = require('../middleware/autenticado');
const CardsController = require('../controllers/CardsController');

const router = Router();

router
	// Rota para pegar os dados da página de listagem
	.get(
		'/cards/listagem',
    autenticado,
		autorizacao(['Administrador', 'Professor', 'Aluno']),
		CardsController.getListingData
	)

	// Rota para pegar os dados da página de histórico
	.get(
		'/cards/historico/:id',
    autenticado,
		autorizacao(['Administrador']),
		CardsController.getHistoricoData
	)

	// Rota para pegar os dados da página de solicitação
	.get(
		'/cards/solicitacao/:id',
    autenticado,
		autorizacao(['Administrador']),
		CardsController.getSolicitacaoData
	);

module.exports = router;
