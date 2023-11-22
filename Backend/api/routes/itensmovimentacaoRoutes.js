const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const ItensMovimentacaoController = require('../controllers/ItensMovimentacaoController');

const router = Router();

// Rota para listar 20 históricos de movimentação
router
	.get(
		'/historico/item/:id/page/:page',
		autorizacao(['Administrador']),
		ItensMovimentacaoController.getHistory
	)

	// Rota para criar um ajuste de movimentação
	.post(
		'/movimentacao/ajuste/:id',
		autorizacao(['Administrador']),
		ItensMovimentacaoController.newAdjustment
	)

	// Rota para criar uma baixa
	.post(
		'/movimentacao/baixa/:id',
		autorizacao(['Administrador']),
		ItensMovimentacaoController.newWriteOff
	)

	// Rota para criar um item de pedido
	.post(
		'/movimentacao/solicitacao/:id',
		autorizacao(['Administrador']),
		ItensMovimentacaoController.newRequestItem
	);

module.exports = router;
