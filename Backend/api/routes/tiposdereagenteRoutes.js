const { Router } = require('express');
const TiposDeReagenteController = require('../controllers/TiposDeReagenteController');

const router = Router();

// Rota para listar um tipo de reagente
router.get('/tiposdereagente/:id', TiposDeReagenteController.getTipoDeReagente);

// Rota para listar tipos de reagente com paginação
router.get('/tiposdereagente/page/:page', TiposDeReagenteController.getTiposDeReagente);

// Rota para listar tipos de reagente com paginação
router.get('/tiposdereagente/page/:page/active', TiposDeReagenteController.getTiposDeReagenteActive);

// Rota para listar tipos de reagente com paginação, ativos e filtrados
// router.get('/tiposdereagente/page/:page/filtered', TiposDeReagenteController.getTiposDeReagenteFiltered);

// Rota para criar um tipo de reagente
router.post('/tiposdereagente', TiposDeReagenteController.createTipoDeReagente);

// Rota para atualizar um tipo de reagente
router.put('/tiposdereagente/:id', TiposDeReagenteController.updateTipoDeReagente);

// Rota para atualizar um tipo de reagente
router.put('/tiposdereagente/:id/ativo', TiposDeReagenteController.updateAtivo);

module.exports = router;