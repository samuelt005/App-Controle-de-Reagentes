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
		'/historico/item/:id',
		autorizacao(['Administrador']),
		ItensMovimentacaoController.newAdjustment
	);

module.exports = router;
