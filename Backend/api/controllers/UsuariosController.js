require('dotenv').config();
const database = require('../models');
const { Usuarios } = require('../models');
const { hash, compare } = require('bcryptjs');
const uuid = require('uuid');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const templatePath = path.join(__dirname, '..', 'templates\\');

const transport = nodemailer.createTransport({
	host: (process.env.HOST),
	port: (process.env.PORT),
	auth: {
		user: (process.env.AUTH_USER),
		pass: (process.env.AUTH_PASS),
	},
});

class UsuariosController {
	// Função para criar um usuario
	static async createUsuario(req, res) {
		const { nome, ra, cpf, email } = req.body;

		try {
			const existingRa = await Usuarios.findOne({
				where: {
					ra,
				},
			});

			if (existingRa) {
				return res.status(400).json({
					message: 'Já existe um Usuário com o mesmo RA',
				});
			}

			const existingCpf = await Usuarios.findOne({
				where: {
					cpf,
				},
			});

			if (existingCpf) {
				return res.status(400).json({
					message: 'Já existe um Usuário com o mesmo CPF',
				});
			}

			const sameEmail = await database.Usuarios.findOne({
				where: { email },
			});

			if (sameEmail) {
				return res.status(400).json({
					message: 'E-mail já utilizado',
				});
			}

			const uniqueCode = uuid.v4().split('-')[0];
			const confirmation_code = uuid.v4().replace(/-/g, '');

			const createdUsuario = await Usuarios.create({
				id: uuid.v4(),
				nome,
				email,
				confirmation_code,
				ra,
				cpf,
				codigo_unico: uniqueCode,
			});

			const usuario = await database.Usuarios.findOne({
				where: { ra, cpf },
				attributes: ['createdAt', 'nome', 'ra'],
			});

			if (createdUsuario) {
				const signupLink = 'http://localhost:4200/cadastrar';
				const template = fs.readFileSync(
					templatePath + 'registered.ejs',
					'utf-8'
				);

				const templateVariables = {
					nome: usuario.nome,
					ra: usuario.ra,
					uniqueCode,
					signupLink,
				};

				const compiledTemplate = ejs.compile(template);
				const htmlContent = compiledTemplate(templateVariables);

				const emailData = {
					from: 'samuel.thomas@gmail.com',
					to: email,
					subject: 'Continue seu Cadastro - Biopark Controle de Regentes',
					html: htmlContent,
				};

				transport.sendMail(emailData, function (error) {
					if (error) {
						console.error('Erro ao enviar email: ' + error);
					} else {
						console.log('Email enviado para: ' + email);
					}
				});
			}

			return res.status(200).json({ message: 'Usuário criado com sucesso' });
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async getUsuarios(req, res) {
		const { search } = req.query;
		const { page } = req.params;

		const pageNumber = parseInt(page) || 1;
		const itemsPerPage = 20;

		const offset = (pageNumber - 1) * itemsPerPage;

		try {
			const where = {};

			// TODO alterar o search
			// if (search) {
			// 	if (!isNaN(search)) {
			// 		where.numero = {
			// 			[Op.like]: `%${search}%`,
			// 		};
			// 	} else {
			// 		whereEmitente.razao_social = {
			// 			[Op.like]: `%${search}%`,
			// 		};
			// 	}
			// }

			const usuarios = await database.Usuarios.findAll({
				where: where,
				limit: itemsPerPage,
				offset: offset,
				include: [
					{
						model: database.Perfis,
						as: 'perfil',
						attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
					},
				],
				attributes: {
					exclude: [
						'id',
						'confirmation_code',
						'senha',
						'codigo_unico',
						'updatedAt',
						'id_perfil_fk',
					],
				},
				order: [['createdAt', 'DESC']],
			});

			let totalItems;
			if (search) {
				totalItems = await database.Usuarios.count({
					where: where,
				});
			} else {
				totalItems = await database.Usuarios.count();
			}

			const totalPages = Math.ceil(totalItems / itemsPerPage);

			const resData = {
				currentPage: pageNumber,
				totalPages: totalPages,
				totalItems: totalItems,
				data: usuarios,
			};

			return res.status(200).json(resData);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para validar ra e codigo_unico
	static async validateNewUser(req, res) {
		const { ra, codigo_unico } = req.params;

		try {
			const usuario = await database.Usuarios.findOne({
				where: { ra, codigo_unico },
			});

			if (!usuario) {
				return res.status(200).json(false);
			}

			return res.status(200).json(true);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para efetuar o signup
	static async signup(req, res) {
		const { ra, codigo_unico, password } = req.body;

		try {
			const hashedPassword = await hash(password, 8);

			const usuario = await database.Usuarios.findOne({
				where: { ra, codigo_unico },
			});

			if (!usuario) {
				return res.status(404).json({
					message: 'Usuário não encontrado',
				});
			}

			await database.Usuarios.update(
				{
					senha: hashedPassword,
					codigo_unico: null,
				},
				{
					where: { ra, codigo_unico },
				}
			);

			const validateEmailLink = `http://localhost:4200/confirmaremail/${usuario.confirmation_code}`;
			const template = fs.readFileSync(
				templatePath + 'verifyEmail.ejs',
				'utf-8'
			);

			const templateVariables = {
				nome: usuario.nome,
				validateEmailLink,
			};

			const compiledTemplate = ejs.compile(template);
			const htmlContent = compiledTemplate(templateVariables);

			const emailData = {
				from: 'samuel.thomas@gmail.com',
				to: usuario.email,
				subject: 'Validar E-mail - Biopark Controle de Regentes',
				html: htmlContent,
			};

			transport.sendMail(emailData, function (error) {
				if (error) {
					console.error('Erro ao enviar email: ' + error);
				} else {
					console.log('Email enviado para: ' + email);
				}
			});

			return res
				.status(200)
				.json({ message: 'Usuário cadastrado com sucesso' });
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para reenviar o email para confirmar
	static async resendConfirmationEmail(req, res) {
		const { ra } = req.params;

		try {
			const usuario = await database.Usuarios.findOne({
				where: { ra },
			});

			if (!usuario) {
				return res.status(404).json({
					message: 'Usuário não encontrado',
				});
			}

			if (usuario.confirmed_email) {
				return res.status(400).json({
					message: 'E-mail já confirmado',
				});
			}

			const validateEmailLink = `http://localhost:4200/confirmaremail/${usuario.confirmation_code}`;
			const template = fs.readFileSync(
				templatePath + 'verifyEmail.ejs',
				'utf-8'
			);

			const templateVariables = {
				nome: usuario.nome,
				validateEmailLink,
			};

			const compiledTemplate = ejs.compile(template);
			const htmlContent = compiledTemplate(templateVariables);

			const emailData = {
				from: 'samuel.thomas@gmail.com',
				to: usuario.email,
				subject: 'Confirmação de E-mail - Biopark Controle de Regentes',
				html: htmlContent,
			};

			transport.sendMail(emailData, function (error) {
				if (error) {
					console.error('Erro ao enviar email: ' + error);
				} else {
					console.log('E-mail enviado para: ' + email);
				}
			});

			return res.status(200).json({ message: 'E-mail enviado com sucesso' });
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para verificar se o email está confirmado
	static async isEmailConfirmed(req, res) {
		const { id } = req.params;

		try {
			const usuario = await database.Usuarios.findOne({
				where: { id },
			});

			if (!usuario.confirmed_email) {
				return res.status(200).json(false);
			}

			return res.status(200).json(true);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para confirmar o email
	static async confirmarEmail(req, res) {
		const { confirmation_code } = req.params;

		try {
			const usuario = await database.Usuarios.findOne({
				where: { confirmation_code },
			});

			if (!usuario) {
				return res.status(404).json({
					message: 'Usuário não encontrado',
				});
			}

			if (usuario.confirmed_email) {
				return res.status(400).json({
					message: 'E-mail já confirmado',
				});
			}

			await database.Usuarios.update(
				{
					confirmed_email: true,
				},
				{
					where: { confirmation_code },
				}
			);

			return res.status(200).json({
				message: 'E-mail confirmado com sucesso',
			});
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para atualizar o perfil do usuário
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

	// Função para atualizar a senha do usuário
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
