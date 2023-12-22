const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const autenticado = require('../middleware/autenticado');
const SolicitacoesController = require('../controllers/SolicitacoesController');

const router = Router();

router
	// Rota para listar um solicitação
	.get(
		'/solicitacao/:id',
		autenticado,
		autorizacao(['Administrador']),
		SolicitacoesController.getSolicitacaoItems
	)

	// Rota para listar solicitações com paginação
	.get(
		'/solicitacoes/page/:page',
		autenticado,
		autorizacao(['Administrador']),
		SolicitacoesController.getSolicitacoes
	)

	// Rota para criar um solicitação
	.post(
		'/solicitacoes',
		autenticado,
		autorizacao(['Administrador', 'Professor']),
		SolicitacoesController.createSolicitacao
	)

	// Rota para atualizar o status de uma solicitação
	.put(
		'/solicitacoes/:id',
		autenticado,
		autorizacao(['Administrador']),
		SolicitacoesController.updateStatus
	);

module.exports = router;
