const database = require('../models');
const { Usuarios } = require('../models');

// TODO melhorar a segurança

class UsuariosController {
	// Método para pegar um usuario específico
	static async getUsuario(req, res) {
		const { id } = req.params;
		try {
			const usuario = await database.Usuarios.findOne({
				where: { id: Number(id) },
				attributes: { exclude: ['createdAt', 'updatedAt', 'id_perfil_fk'] },
				include: [
					{
						model: database.Perfis,
						as: 'perfil',
						attributes: { exclude: ['createdAt', 'updatedAt'] },
					},
				],
			});
			return res.status(200).json(usuario);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para criar um usuario
	static async createUsuario(req, res) {
		const { nome, email, senha_hash, salt, ra, cpf } = req.body;

		try {
			// TODO validar CPF também?
			const existingUsuario = await Usuarios.findOne({
				where: {
					ra,
				},
			});

			if (existingUsuario) {
				return res.status(400).json({
					message: 'Já existe um Usuário com o mesmo RA.',
				});
			}

			const createdUsuario = await Usuarios.create({
				nome,
				email,
				senha_hash,
				salt,
				ra,
				cpf,
			});
			return res.status(200).json(createdUsuario);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para atualizar um usuario
	static async updateUsuario(req, res) {
		const { id } = req.params;
		const { nome, email, senha_hash, salt } = req.body;

		try {
			await database.Usuarios.update(
				{
					nome,
					email,
					senha_hash,
					salt,
				},
				{
					where: { id: Number(id) },
				}
			);
			const updatedUsuario = await database.Usuarios.findOne({
				where: { id: Number(id) },
			});
			return res.status(200).json(updatedUsuario);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

  static async updatePerfil(req, res) {
		const { id } = req.params;
		const { id_perfil } = req.body;

		try {
			await database.Usuarios.update(
				{
					id_perfil_fk: Number(id_perfil)
				},
				{
					where: { id: Number(id) },
				}
			);
			const updatedUsuario = await database.Usuarios.findOne({
				where: { id: Number(id) },
			});
			return res.status(200).json(updatedUsuario);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = UsuariosController;
