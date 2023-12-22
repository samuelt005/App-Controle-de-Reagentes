const { Router } = require('express');
const autenticado = require('../middleware/autenticado');
const AuthController = require('../controllers/AuthController');

const router = Router();

router
	// Rota para logar
	.post('/auth/login', AuthController.login)

	// Rota para deslogar e invalidar o token
	.post('/auth/logout', autenticado, AuthController.logout);

module.exports = router;
