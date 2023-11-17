const database = require('../models');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');

class AuthController {
	static async login(req, res) {
		const { email, senha } = req.body;

		try {
			const usuario = await database.Usuarios.findOne({
				where: {
					email,
				},
				attributes: ['id', 'nome', 'ra', 'cpf', 'email', 'senha'],
				include: [
					{
						model: database.Perfis,
						as: 'perfil',
						attributes: { exclude: ['createdAt', 'updatedAt'] },
					},
				],
			});

			if (!usuario) {
				return res.status(404).json({
					message: 'Usuário não cadastrado',
				});
			}

			const samePassword = await compare(senha, usuario.senha);

			if (!samePassword) {
				return res.status(401).json({ message: 'Usuário ou senha invalido' });
			}

			const accessToken = sign(
				{
					id: usuario.id,
					nome: usuario.nome,
					ra: usuario.ra,
					cpf: usuario.cpf,
					email: usuario.email,
					perfil: usuario.perfil.nome,
				},
				jsonSecret.secret,
				{ expiresIn: 86400 }
			);

			return res.status(200).json({ accessToken: accessToken });
		} catch (error) {
			return res.status(401).json({ message: error.message });
		}
	}
}

module.exports = AuthController;
