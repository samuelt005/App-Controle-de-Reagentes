const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const autenticado = require('../middleware/autenticado');
const TiposDeReagenteController = require('../controllers/TiposDeReagenteController');

const router = Router();

router
	// Rota para listar tipos de reagente com paginação
	.get(
		'/tiposdereagente/page/:page',
		autenticado,
		autorizacao(['Administrador']),
		TiposDeReagenteController.getTiposDeReagente
	)

	// Rota para listar tipos de reagente ativos com paginação
	.get(
		'/tiposdereagente/page/:page/active',
		autenticado,
		autorizacao(['Administrador', 'Professor', 'Aluno']),
		TiposDeReagenteController.getTiposDeReagenteActive
	)

	// Rota para listar tipos de reagente ativos
	.get(
		'/tiposdereagente',
		autenticado,
		autorizacao(['Administrador', 'Professor', 'Aluno']),
		TiposDeReagenteController.getAllTiposDeReagenteActive
	)

	// Rota para listar tipos de reagente com paginação, ativos e filtrados
	.get(
		'/tiposdereagente/page/:page/filtered',
		autenticado,
		autorizacao(['Administrador', 'Professor', 'Aluno']),
		TiposDeReagenteController.getTiposDeReagenteFiltered
	)

	// Rota para criar um tipo de reagente
	.post(
		'/tiposdereagente',
		autenticado,
		autorizacao(['Administrador']),
		TiposDeReagenteController.createTipoDeReagente
	)

	// Rota para atualizar um tipo de reagente
	.put(
		'/tiposdereagente/:id',
		autenticado,
		autorizacao(['Administrador']),
		TiposDeReagenteController.updateTipoDeReagente
	)

	// Rota para atualizar um tipo de reagente
	.put(
		'/tiposdereagente/:id/ativo',
		autenticado,
		autorizacao(['Administrador']),
		TiposDeReagenteController.updateAtivo
	);

module.exports = router;
