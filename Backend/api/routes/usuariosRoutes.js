const { Router } = require('express');
const UsuariosController = require('../controllers/UsuariosController');

const router = Router();

// Rota para listar um usuario
router.get('/usuarios/:id', UsuariosController.getUsuario);

// Rota para criar um usuario
router.post('/usuarios', UsuariosController.createUsuario);

// Rota para atualizar um usuario
router.put('/usuarios/:id', UsuariosController.updateUsuario);

// Rota para atualizar o perfil de um usuario
router.put('/usuarios/:id/perfil', UsuariosController.updatePerfil);

module.exports = router;