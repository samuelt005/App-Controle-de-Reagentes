'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const objects = [];

		objects.push({
			nome: 'Administrador',
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		objects.push({
			nome: 'Professor',
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		objects.push({
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
