const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const autenticado = require('../middleware/autenticado');
const LotesDeCompraController = require('../controllers/LotesDeCompraController');

const router = Router();

router
	// Rota para listar lotes de compra com paginação
	.get(
		'/lotesdecompra/page/:page',
    autenticado,
		autorizacao(['Administrador']),
		LotesDeCompraController.getLotesDeCompra
	)

	// Rota para listar todos os lotes de compra
	.get(
		'/lotesdecompra',
    autenticado,
		autorizacao(['Administrador']),
		LotesDeCompraController.getAllLotesDeCompra
	)

	// Rota para criar um lote de compra
	.post(
		'/lotesdecompra',
    autenticado,
		autorizacao(['Administrador']),
		LotesDeCompraController.createLoteDeCompra
	)

	// Rota para atualizar o número de um lote de compra
	.put(
		'/lotesdecompra/:id',
    autenticado,
		autorizacao(['Administrador']),
		LotesDeCompraController.updateLoteDeCompra
	);

module.exports = router;
