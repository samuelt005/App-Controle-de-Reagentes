'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const objects = [];

		objects.push({
			sigla: 'ml',
			nome: 'Mililitros',
			peso: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		objects.push({
			sigla: 'lt',
			nome: 'Litros',
			peso: 1000,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		objects.push({
			sigla: 'mg',
			nome: 'Miligramas',
			peso: 0.001,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		objects.push({
			sigla: 'gr',
			nome: 'Gramas',
			peso: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		objects.push({
			sigla: 'kg',
			nome: 'Kilogramas',
			peso: 1000,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await queryInterface.bulkInsert('unsdemedida', objects, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('unsdemedida', null, {});
	},
};
