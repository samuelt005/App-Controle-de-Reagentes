const { Router } = require('express');
const PaginatorController = require('../controllers/PaginatorController');

const router = Router();

// Rota para contar itens de uma tabela específica
router.get('/items/count/:table', PaginatorController.getItemsCount);

module.exports = router;