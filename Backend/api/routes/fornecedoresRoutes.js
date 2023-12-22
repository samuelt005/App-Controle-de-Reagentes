const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const autenticado = require('../middleware/autenticado');
const FornecedoresController = require('../controllers/FornecedoresController');

const router = Router();

router
	// Rota para listar fornecedores com paginação
	.get(
		'/fornecedores/page/:page',
    autenticado,
		autorizacao(['Administrador']),
		FornecedoresController.getFornecedores
	)

	// Rota para listar todos os fornecedores
	.get(
		'/fornecedores',
    autenticado,
		autorizacao(['Administrador']),
		FornecedoresController.getAllFornecedores
	)

	// Rota para criar um fornecedor
	.post(
		'/fornecedores',
    autenticado,
		autorizacao(['Administrador']),
		FornecedoresController.createFornecedor
	)

	// Rota para atualizar um fornecedor
	.put(
		'/fornecedores/:id',
    autenticado,
		autorizacao(['Administrador']),
		FornecedoresController.updateFornecedor
	);

module.exports = router;
