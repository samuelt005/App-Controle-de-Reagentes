const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const autenticado = require('../middleware/autenticado');
const NfesController = require('../controllers/NfesController');

const router = Router();

router
	// Rota para listar nfes com paginação
	.get(
		'/nfes/page/:page',
		autenticado,
		autorizacao(['Administrador']),
		NfesController.getNfes
	)

	// Rota para listar todas as nfes
	.get(
		'/nfes',
		autenticado,
		autorizacao(['Administrador']),
		NfesController.getAllNfes
	)

	// Rota para criar um nfe
	.post(
		'/nfes',
		autenticado,
		autorizacao(['Administrador']),
		NfesController.createNfe
	)

	// Rota para atualizar um nfe
	.put(
		'/nfes/:id',
		autenticado,
		autorizacao(['Administrador']),
		NfesController.updateNfe
	);

module.exports = router;
