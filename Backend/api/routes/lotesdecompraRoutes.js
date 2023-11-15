const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const LotesDeCompraController = require('../controllers/LotesDeCompraController');

const router = Router();

router
	// Rota para listar um lote de compra
	.get(
		'/lotesdecompra/:id',
		autorizacao(['Administrador']),
		LotesDeCompraController.getLoteDeCompra
	)

	// Rota para listar lotes de compra com paginação
	.get(
		'/lotesdecompra/page/:page',
		autorizacao(['Administrador']),
		LotesDeCompraController.getLotesDeCompra
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
		LotesDeCompraController.updateNumero
	)

	// Rota para atualizar os itens vinculádos a um lote de compra
	.put(
		'/lotesdecompra/itensvinculados/:id',
		autorizacao(['Administrador']),
		LotesDeCompraController.updateItensVinculados
	);
//TODO remover esta rota e jogar a lógica para o controller de ItensMovimentação

module.exports = router;
