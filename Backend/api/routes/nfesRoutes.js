const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const NfesController = require('../controllers/NfesController');

const router = Router();

router
	// Rota para listar um nfe
	.get('/nfes/:id', autorizacao(['Administrador']), NfesController.getNfe)

	// Rota para listar nfes com paginação
	.get(
		'/nfes/page/:page',
		autorizacao(['Administrador']),
		NfesController.getNfes
	)

	// Rota para listar todas as nfes
	.get('/nfes', autorizacao(['Administrador']), NfesController.getAllNfes)

	// Rota para criar um nfe
	.post('/nfes', autorizacao(['Administrador']), NfesController.createNfe)

	// Rota para atualizar um nfe
	.put('/nfes/:id', autorizacao(['Administrador']), NfesController.updateNfe);

module.exports = router;
