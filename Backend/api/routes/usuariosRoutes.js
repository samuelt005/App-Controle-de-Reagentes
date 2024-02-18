const { Router } = require('express');
const autorizacao = require('../middleware/autorizacao');
const autenticado = require('../middleware/autenticado');
const UsuariosController = require('../controllers/UsuariosController');

const router = Router();

router
	// Rota para criar um usuario
	.post('/usuarios', UsuariosController.createUsuario)

  // // Rota para listar usuários com paginação
  .get(
		'/usuarios/page/:page',
		autenticado,
		autorizacao(['Administrador']),
		UsuariosController.getUsuarios
	)

	// Rota para validar ra e codigo_unico
	.get('/validarnovousuario/:ra/:codigo_unico', UsuariosController.validateNewUser)

	// Rota para efetuar o signup
	.put('/registrarse', UsuariosController.signup)

	// Rota para reenviar o email para confirmar
	.get('/reenviaremail/:ra', UsuariosController.resendConfirmationEmail)

	// Rota para verificar se o email está confirmado
	.get(
		'/usuario/:id/emailconfirmado',
		autenticado,
		autorizacao(['Administrador', 'Professor', 'Aluno']),
		UsuariosController.isEmailConfirmed
	)

	// Rota para confirmar o email
	.get('/confirmaremail/:confirmation_code', UsuariosController.confirmarEmail)

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
