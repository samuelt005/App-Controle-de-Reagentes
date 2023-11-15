const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const CardsController = require('../controllers/CardsController');

const router = Router();

router
	// Rota para somar valores de uma tabela e coluna específica
	.get(
		'/items/sum/:table/:column',
		autorizacao(['Administrador']),
		CardsController.getItemsSum
	)

	// Rota para contar itens ativos da tabela tiposdereagente
	.get(
		'/tiposdereagente/count/actives',
		autorizacao(['Administrador']),
		CardsController.getActiveTypesCount
	)

	// Rota para encontrar o item com mais usos
	.get(
		'/tiposdereagente/find/mostused',
		autorizacao(['Administrador']),
		CardsController.getMostUsedCount
	);

module.exports = router;
