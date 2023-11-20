const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const SolicitacoesController = require('../controllers/SolicitacoesController');

const router = Router();

router
	// Rota para listar um solicitação
	.get(
		'/solicitacao/:id',
		autorizacao(['Administrador']),
		SolicitacoesController.getSolicitacaoItems
	)

	// Rota para listar solicitações com paginação
	.get(
		'/solicitacoes/page/:page',
		autorizacao(['Administrador']),
		SolicitacoesController.getSolicitacoes
	)

	// Rota para criar um solicitação
	.post(
		'/solicitacoes',
		autorizacao(['Administrador']),
		SolicitacoesController.createSolicitacao
	)

	// Rota para atualizar o status de uma solicitação
	.put(
		'/solicitacoes/:id',
		autorizacao(['Administrador']),
		SolicitacoesController.updateStatus
	)

	// Rota para atualizar um item de uma solicitação
	.put(
		'/solicitacao/item/:id',
		autorizacao(['Administrador']),
		SolicitacoesController.updateItem
	);

module.exports = router;
