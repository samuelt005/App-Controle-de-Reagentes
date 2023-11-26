const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const LotesDeCompraController = require('../controllers/LotesDeCompraController');

const router = Router();

router
	// Rota para listar lotes de compra com paginação
	.get(
		'/lotesdecompra/page/:page',
		autorizacao(['Administrador']),
		LotesDeCompraController.getLotesDeCompra
	)

	// Rota para listar todos os lotes de compra
	.get(
		'/lotesdecompra',
		autorizacao(['Administrador']),
		LotesDeCompraController.getAllLotesDeCompra
	)

	// Rota para criar um lote de compra
	.post(
		'/lotesdecompra',
		autorizacao(['Administrador']),
		LotesDeCompraController.createLoteDeCompra
	)

	// Rota para atualizar o número de um lote de compra
	.put(
		'/lotesdecompra/:id',
		autorizacao(['Administrador']),
		LotesDeCompraController.updateLoteDeCompra
	);

module.exports = router;
