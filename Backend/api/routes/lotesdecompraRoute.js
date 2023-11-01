const { Router } = require('express');
const LotesDeCompraController = require('../controllers/LotesDeCompraController');

const router = Router();

// Rota para listar um lote de compra
router.get('/lotesdecompra/:id', LotesDeCompraController.getLoteDeCompra);

// Rota para listar lotes de compra com paginação
router.get('/lotesdecompra/page/:page', LotesDeCompraController.getLotesDeCompra);

// Rota para criar um lote de compra
router.post('/lotesdecompra', LotesDeCompraController.createLoteDeCompra);

// Rota para atualizar um lote de compra
router.put('/lotesdecompra/:id', LotesDeCompraController.updateLoteDeCompra);

module.exports = router;