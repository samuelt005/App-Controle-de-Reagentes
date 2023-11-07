const { Router } = require('express');
const ItensMovimentacaoController = require('../controllers/ItensMovimentacaoController');

const router = Router();

// Rota para listar 20 históricos de movimentação
router.get('/history/item/:id/page/:page', ItensMovimentacaoController.getHistory);

module.exports = router;