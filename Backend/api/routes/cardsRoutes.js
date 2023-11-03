const { Router } = require('express');
const CardsController = require('../controllers/CardsController');

const router = Router();

// Rota para somar valores de uma tabela e coluna específica
router.get('/items/sum/:table/:column', CardsController.getItemsSum);

// Rota para contar itens ativos da tabela tiposdereagente
router.get('/tiposdereagente/count/actives', CardsController.getActiveTypesCount);

// Rota para encontrar o item com mais usos
router.get('/tiposdereagente/find/mostused', CardsController.getMostUsedCount);

module.exports = router;