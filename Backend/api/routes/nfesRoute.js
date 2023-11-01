const { Router } = require('express');
const NfesController = require('../controllers/NfesController');

const router = Router();

// Rota para listar um nfe
router.get('/nfes/:id', NfesController.getNfe);

// Rota para listar nfes com paginação
router.get('/nfes/page/:page', NfesController.getNfes);

// Rota para criar um nfe
router.post('/nfes', NfesController.createNfe);

// Rota para atualizar um nfe
router.put('/nfes/:id', NfesController.updateNfe);

module.exports = router;