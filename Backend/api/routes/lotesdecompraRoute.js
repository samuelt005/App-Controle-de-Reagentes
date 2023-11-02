const { Router } = require('express');
const LotesDeCompraController = require('../controllers/LotesDeCompraController');

const router = Router();

// Rota para listar um lote de compra
router.get('/lotesdecompra/:id', LotesDeCompraController.getLoteDeCompra);

// Rota para listar lotes de compra com paginação
router.get('/lotesdecompra/page/:page', LotesDeCompraController.getLotesDeCompra);

// Rota para criar um lote de compra
router.post('/lotesdecompra', LotesDeCompraController.createLoteDeCompra);

// Rota para atualizar o número de um lote de compra
router.put('/lotesdecompra/:id', LotesDeCompraController.updateNumero);

// Rota para atualizar os itens vinculádos a um lote de compra
router.put('/lotesdecompra/itensvinculados/:id', LotesDeCompraController.updateItensVinculados); 
//TODO remover esta rota e jogar a lógica para o controller de ItensMovimentação

module.exports = router;