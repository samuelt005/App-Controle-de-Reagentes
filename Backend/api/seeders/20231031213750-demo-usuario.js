'use strict';

const uuid = require('uuid');
const database = require('../models');
const { hash } = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const objects = [];

		async function getPerfil(nome) {
			const perfil = await database.Perfis.findOne({
				where: {
					nome,
				},
			});

			return perfil.id;
		}
		async function getSenhaHash(senha) {
			return await hash(senha, 8);
		}

		const getPerfisPromises = [];
		const getSenhasPromises = [];

		getPerfisPromises.push(getPerfil('Administrador'));
		getPerfisPromises.push(getPerfil('Professor'));
		getPerfisPromises.push(getPerfil('Aluno'));
		getSenhasPromises.push(getSenhaHash('admin'));
		getSenhasPromises.push(getSenhaHash('professor'));
		getSenhasPromises.push(getSenhaHash('aluno'));

		const perfisIds = await Promise.all(getPerfisPromises);
		const senhasIds = await Promise.all(getSenhasPromises);

		objects.push({
			id: uuid.v4(),
			nome: 'admin',
			email: 'admin@email.com',
			senha: senhasIds[0],
			ra: '12345678',
			cpf: 12345678901,
			id_perfil_fk: perfisIds[0],
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		objects.push({
			id: uuid.v4(),
			nome: 'Professor Teste',
			email: 'professor@email.com',
			senha: senhasIds[1],
			ra: '12345678',
			cpf: 12345678901,
			id_perfil_fk: perfisIds[1],
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		objects.push({
			id: uuid.v4(),
			nome: 'Aluno Teste',
			email: 'aluno@email.com',
			senha: senhasIds[2],
			ra: '12345678',
			cpf: 12345678901,
			id_perfil_fk: perfisIds[2],
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await queryInterface.bulkInsert('usuarios', objects, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('usuarios', null, {});
	},
};
