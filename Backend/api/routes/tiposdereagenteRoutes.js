const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const TiposDeReagenteController = require('../controllers/TiposDeReagenteController');

const router = Router();

router
	// Rota para listar tipos de reagente com paginação
	.get(
		'/tiposdereagente/page/:page',
		autorizacao(['Administrador']),
		TiposDeReagenteController.getTiposDeReagente
	)

	// Rota para listar tipos de reagente ativos com paginação
	.get(
		'/tiposdereagente/page/:page/active',
		autorizacao(['Administrador']),
		TiposDeReagenteController.getTiposDeReagenteActive
	)

	// Rota para listar tipos de reagente ativos
	.get(
		'/tiposdereagente',
		autorizacao(['Administrador']),
		TiposDeReagenteController.getAllTiposDeReagenteActive
	)

	// Rota para listar tipos de reagente com paginação, ativos e filtrados
	.get(
		'/tiposdereagente/page/:page/filtered',
		TiposDeReagenteController.getTiposDeReagenteFiltered
	)

	// Rota para criar um tipo de reagente
	.post(
		'/tiposdereagente',
		autorizacao(['Administrador']),
		TiposDeReagenteController.createTipoDeReagente
	)

	// Rota para atualizar um tipo de reagente
	.put(
		'/tiposdereagente/:id',
		autorizacao(['Administrador']),
		TiposDeReagenteController.updateTipoDeReagente
	)

	// Rota para atualizar um tipo de reagente
	.put(
		'/tiposdereagente/:id/ativo',
		autorizacao(['Administrador']),
		TiposDeReagenteController.updateAtivo
	);

module.exports = router;
