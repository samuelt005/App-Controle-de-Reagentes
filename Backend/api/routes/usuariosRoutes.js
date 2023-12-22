const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const autenticado = require('../middleware/autenticado');
const UsuariosController = require('../controllers/UsuariosController');

const router = Router();

router
	// Rota para criar um usuario
	.post('/usuarios', UsuariosController.createUsuario)

	// Rota para validar ra e codigo_unico
	.get('/validarnovousuario', UsuariosController.validateNewUser)

	// Rota para efetuar o signup
	.put('/registrarse', UsuariosController.signup)

	// Rota para verificar se o email está confirmado
	.get(
		'/usuario/:id/emailconfirmado',
		autenticado,
		autorizacao(['Administrador', 'Professor', 'Aluno']),
		UsuariosController.isEmailConfirmed
	)

	// Rota para confirmar o email
	.put('/confirmemail', UsuariosController.confirmEmail)

	// Rota para atualizar o perfil de um usuário
	.put(
		'/usuario/:id/perfil',
		autenticado,
		autorizacao(['Administrador']),
		UsuariosController.updatePerfil
	)

	// Rota para atualizar a senha de um usuário
	.put(
		'/usuarios/:id/senha',
		autenticado,
		autorizacao(['Administrador', 'Professor', 'Aluno']),
		UsuariosController.updateSenha
	);

module.exports = router;
