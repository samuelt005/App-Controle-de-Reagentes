'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const objects = [];

		objects.push({
			sigla: 'ml',
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		objects.push({
			sigla: 'lt',
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		objects.push({
			sigla: 'mg',
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		objects.push({
			sigla: 'gr',
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		objects.push({
			sigla: 'kg',
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await queryInterface.bulkInsert('unsdemedida', objects, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('unsdemedida', null, {});
	},
};
