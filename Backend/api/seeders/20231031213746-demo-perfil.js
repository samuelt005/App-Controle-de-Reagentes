'use strict';

const uuid = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const objects = [];

		objects.push({
			id: uuid.v4(),
			nome: 'Administrador',
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		objects.push({
			id: uuid.v4(),
			nome: 'Professor',
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		objects.push({
			id: uuid.v4(),
			nome: 'Aluno',
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await queryInterface.bulkInsert('perfis', objects, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('perfis', null, {});
	},
};
