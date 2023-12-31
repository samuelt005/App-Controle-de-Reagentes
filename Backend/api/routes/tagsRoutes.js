const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const autenticado = require('../middleware/autenticado');
const TagsController = require('../controllers/TagsController');

const router = Router();

router
	// Rota para listar todas as tags
	.get(
		'/tags',
		autenticado,
		autorizacao(['Administrador']),
		TagsController.getAllTags
	)

	// Rota para atualizar tags vinculadas
	.put(
		'/tags/:id',
		autenticado,
		autorizacao(['Administrador']),
		TagsController.updateTags
	);

module.exports = router;
