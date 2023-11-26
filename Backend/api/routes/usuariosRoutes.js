const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const UsuariosController = require('../controllers/UsuariosController');

const router = Router();

router
	// Rota para criar um usuario
	.post('/usuarios', UsuariosController.createUsuario)

	// Rota para atualizar um usuario
	.put(
		'/usuarios/:id',
		autorizacao(['Administrador']),
		UsuariosController.updateUsuario
	)

	// Rota para atualizar o perfil de um usuario
	.put(
		'/usuarios/:id/perfil',
		autorizacao(['Administrador']),
		UsuariosController.updatePerfil
	)

	// Rota para atualizar o perfil de um usuario
	.put(
		'/usuarios/:id/senha',
		autorizacao(['Administrador']),
		UsuariosController.updateSenha
	);

module.exports = router;
