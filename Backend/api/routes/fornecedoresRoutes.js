const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const autenticado = require('../middleware/autenticado');
const FornecedoresController = require('../controllers/FornecedoresController');

const router = Router();

router.use(autenticado);

router
	// Rota para listar um fornecedor
	.get(
		'/fornecedores/:id',
		autorizacao(['Administrador']),
		FornecedoresController.getFornecedor
	)

	// Rota para listar fornecedores com paginação
	.get(
		'/fornecedores/page/:page',
		autorizacao(['Administrador']),
		FornecedoresController.getFornecedores
	)

	// Rota para listar todos os fornecedores
	.get(
		'/fornecedores',
		autorizacao(['Administrador']),
		FornecedoresController.getAllFornecedores
	)

	// Rota para criar um fornecedor
	.post(
		'/fornecedores',
		autorizacao(['Administrador']),
		FornecedoresController.createFornecedor
	)

	// Rota para atualizar um fornecedor
	.put(
		'/fornecedores/:id',
		autorizacao(['Administrador']),
		FornecedoresController.updateFornecedor
	);

module.exports = router;
