const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const UnsDeMedidaController = require('../controllers/UnsDeMedidaController');

const router = Router();

// Rota para listar todas as uns de medida
router.get(
	'/unsdemedida',
	autorizacao(['Administrador']),
	UnsDeMedidaController.getAllUnsDeMedida
);

module.exports = router;
