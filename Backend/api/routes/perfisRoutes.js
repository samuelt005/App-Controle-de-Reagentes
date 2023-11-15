const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const PerfisController = require('../controllers/PerfisController');

const router = Router();

router
	// Rota para listar apenas um perfil
	.get(
		'/perfil/:id',
		autorizacao(['Administrador']),
		PerfisController.getPerfil
	)

	// Rota para listar todos os perfis
	.get(
		'/perfis',
		autorizacao(['Administrador']),
		PerfisController.getAllPerfis
	);

module.exports = router;
