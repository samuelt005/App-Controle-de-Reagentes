const { Router } = require('express');
const FornecedoresController = require('../controllers/FornecedoresController');

const router = Router();

// Rota para listar um fornecedor
router.get('/fornecedores/:id', FornecedoresController.getFornecedor);

// Rota para listar fornecedores com paginação
router.get('/fornecedores/page/:page', FornecedoresController.getFornecedores);

// Rota para listar todos os fornecedores
router.get('/fornecedores', FornecedoresController.getAllFornecedores);

// Rota para criar um fornecedor
router.post('/fornecedores', FornecedoresController.createFornecedor);

// Rota para atualizar um fornecedor
router.put('/fornecedores/:id', FornecedoresController.updateFornecedor);

module.exports = router;