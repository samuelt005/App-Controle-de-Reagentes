const database = require('../models');
const { Usuarios } = require('../models');
const { hash, compare } = require('bcryptjs');
const uuid = require('uuid');

class UsuariosController {
	// Método para pegar um usuario específico
	static async getUsuario(req, res) {
		const { id } = req.params;
		try {
			const usuario = await database.Usuarios.findOne({
				where: { id: id },
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'id_perfil_fk', 'senha'],
				},
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
		const { nome, email, nova_senha, ra, cpf } = req.body;

		try {
			const existingRa = await Usuarios.findOne({
				where: {
					ra,
				},
			});

			if (existingRa) {
				return res.status(400).json({
					message: 'Já existe um Usuário com o mesmo RA.',
				});
			}

			const existingCpf = await Usuarios.findOne({
				where: {
					cpf,
				},
			});

			if (existingCpf) {
				return res.status(400).json({
					message: 'Já existe um Usuário com o mesmo CPF.',
				});
			}

			const senha = await hash(nova_senha, 8);

			const createdUsuario = await Usuarios.create({
				id: uuid.v4(),
				nome,
				email,
				senha,
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
		const { nome, email, nova_senha } = req.body;

		try {
			const senha = await hash(nova_senha, 8);

			await database.Usuarios.update(
				{
					nome,
					email,
					senha,
				},
				{
					where: { id: id },
				}
			);
			const updatedUsuario = await database.Usuarios.findOne({
				where: { id: id },
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'id_perfil_fk', 'senha'],
				},
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
					id_perfil_fk: Number(id_perfil),
				},
				{
					where: { id: id },
				}
			);
			const updatedUsuario = await database.Usuarios.findOne({
				where: { id: id },
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'senha'],
				},
			});
			return res.status(200).json(updatedUsuario);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async updateSenha(req, res) {
		const { id } = req.params;
		const { old_password, new_password } = req.body;

		try {
			const usuario = await database.Usuarios.findOne({
				where: { id: id },
				attributes: ['senha'],
			});

			const comparedPassword = await compare(old_password, usuario.senha);

			if (!comparedPassword) {
				return res.status(401).json({ message: 'Senha invalida' });
			}

			if (old_password === new_password) {
				return res
					.status(400)
					.json({ message: 'Senha nova igual a senha antiga' });
			}

			const hashedPassword = await hash(new_password, 8);

			await database.Usuarios.update(
				{
					senha: hashedPassword,
				},
				{
					where: { id: id },
				}
			);

			return res.status(200).json({ message: 'Senha atualizada com sucesso' });
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = UsuariosController;
