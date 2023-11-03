const { Router } = require('express');
const PerfisController = require('../controllers/PerfisController');

const router = Router();

// Rota para listar todos os perfis
router.get('/perfis', PerfisController.getAllPerfis);

module.exports = router;