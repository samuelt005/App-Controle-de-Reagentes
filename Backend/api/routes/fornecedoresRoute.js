const { Router } = require('express');
const FornecedorController = require('../controllers/FornecedorController');

const router = Router();

// Rota para listar todos os fornecedores
router.get('/fornecedores', FornecedorController.getAllFornecedores);

// Rota para listar um fornecedor
router.get('/fornecedores/:id', FornecedorController.getFornecedor);

// Rota para listar fornecedores com paginação
router.get('/fornecedores/page/:page', FornecedorController.getFornecedoresPerPage);

// Rota para criar um fornecedor
router.post('/fornecedores', FornecedorController.createNewFornecedor);

// Rota para atualizar um fornecedor
router.put('/fornecedores/:id', FornecedorController.updateFornecedor);

module.exports = router;