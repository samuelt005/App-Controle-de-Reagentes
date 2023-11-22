const { Router } = require('express');
const AuthController = require('../controllers/AuthController');

const router = Router();

router
	// Rota para logar
	.post('/auth/login', AuthController.login)

	// Rota para deslogar e invalidar o token
	.post('/auth/logout', AuthController.logout);

module.exports = router;
