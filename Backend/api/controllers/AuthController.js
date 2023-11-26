const database = require('../models');
const jsonSecret = require('../config/jsonSecret');
const { sign } = require('jsonwebtoken');
const { compare } = require('bcryptjs');

class AuthController {
	// Função para efetuar login
	static async login(req, res) {
		const { email, senha } = req.body;

		if (!email || !senha) {
			return res.status(400).json({ message: 'Informe email e senha' });
		}

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
					message: 'E-mail não cadastrado',
				});
			}

			const comparedPassword = await compare(senha, usuario.senha);
			if (!comparedPassword)
				return res.status(401).json({ message: 'E-mail ou senha inválido' });

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

			return res.status(200).json({ accessToken });
		} catch (error) {
			return res
				.status(401)
				.json({ message: 'Erro durante o login', error: error.message });
		}
	}

	// Função para efetuar logout
	static async logout(req, res) {
		const token = req.headers.authorization.split(' ')[1];

		try {
			await database.InvalidTokens.create({ token });

			res.status(200).json({ message: 'Logout efetuado' });
		} catch (error) {
			return res.status(400).json({ message: error.message });
		}
	}
}

module.exports = AuthController;
