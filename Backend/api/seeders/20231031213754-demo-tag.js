'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const objects = [];

		objects.push({
			nome: 'Estoque Mínimo',
			sigla: 'em',
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		objects.push({
			nome: 'Polícia Federal',
			sigla: 'pf',
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		objects.push({
			nome: 'Polícia Civil',
			sigla: 'pc',
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		objects.push({
			nome: 'Exército Brasileiro',
			sigla: 'eb',
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await queryInterface.bulkInsert('tags', objects, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('tags', null, {});
	},
};
