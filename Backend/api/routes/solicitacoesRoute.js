const { Router } = require('express');
const SolicitacoesController = require('../controllers/SolicitacoesController');

const router = Router();

// Rota para listar um solicitação
router.get('/Solicitacoes/:id', SolicitacoesController.getSolicitacao);

// Rota para listar solicitações com paginação
router.get('/Solicitacoes/page/:page', SolicitacoesController.getSolicitacoes);

// Rota para criar um solicitação
router.post('/Solicitacoes', SolicitacoesController.createSolicitacao);

// Rota para atualizar o status de uma solicitação
router.put('/Solicitacoes/:id', SolicitacoesController.updateStatus);

module.exports = router;