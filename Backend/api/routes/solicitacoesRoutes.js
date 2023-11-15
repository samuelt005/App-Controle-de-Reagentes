const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const SolicitacoesController = require('../controllers/SolicitacoesController');

const router = Router();

router
	// Rota para listar um solicitação
	.get(
		'/Solicitacoes/:id',
		autorizacao(['Administrador']),
		SolicitacoesController.getSolicitacao
	)

	// Rota para listar solicitações com paginação
	.get(
		'/Solicitacoes/page/:page',
		autorizacao(['Administrador']),
		SolicitacoesController.getSolicitacoes
	)

	// Rota para criar um solicitação
	.post(
		'/Solicitacoes',
		autorizacao(['Administrador']),
		SolicitacoesController.createSolicitacao
	)

	// Rota para atualizar o status de uma solicitação
	.put(
		'/Solicitacoes/:id',
		autorizacao(['Administrador']),
		SolicitacoesController.updateStatus
	);

module.exports = router;
