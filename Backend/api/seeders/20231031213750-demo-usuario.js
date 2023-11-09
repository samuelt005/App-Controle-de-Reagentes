'use strict';

const uuid = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const objects = [];

		objects.push({
			id: uuid.v4(),
			nome: 'Admin',
			email: 'test@email.com',
			senha: 'PLACEHOLDER', //TODO Mudar isso depois
			ra: '12345678',
			cpf: 12345678901,
			id_perfil_fk: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		objects.push({
			id: uuid.v4(),
			nome: 'Professor Teste',
			email: 'test@email.com',
			senha: 'PLACEHOLDER', //TODO Mudar isso depois
			ra: '12345678',
			cpf: 12345678901,
			id_perfil_fk: 2,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		objects.push({
			id: uuid.v4(),
			nome: 'Aluno Teste',
			email: 'test@email.com',
			senha: 'PLACEHOLDER', //TODO Mudar isso depois
			ra: '12345678',
			cpf: 12345678901,
			id_perfil_fk: 3,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await queryInterface.bulkInsert('usuarios', objects, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('usuarios', null, {});
	},
};
