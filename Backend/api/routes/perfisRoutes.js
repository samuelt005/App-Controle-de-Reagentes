const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const autenticado = require('../middleware/autenticado');
const PerfisController = require('../controllers/PerfisController');

const router = Router();

router
	// Rota para listar todos os perfis
	.get(
		'/perfis',
		autenticado,
		autorizacao(['Administrador']),
		PerfisController.getAllPerfis
	);

module.exports = router;
