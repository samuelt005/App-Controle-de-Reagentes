const { Router } = require('express');
const UnsDeMedidaController = require('../controllers/UnsDeMedidaController');

const router = Router();

// Rota para listar todas as uns de medida
router.get('/unsdemedida', UnsDeMedidaController.getAllUnsDeMedida);

module.exports = router;