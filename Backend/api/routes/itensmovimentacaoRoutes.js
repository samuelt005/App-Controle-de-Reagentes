const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const ItensMovimentacaoController = require('../controllers/ItensMovimentacaoController');

const router = Router();

// Rota para listar 20 históricos de movimentação
router.get(
	'/historico/item/:id/page/:page',
	autorizacao(['Administrador']),
	ItensMovimentacaoController.getHistory
);

module.exports = router;
