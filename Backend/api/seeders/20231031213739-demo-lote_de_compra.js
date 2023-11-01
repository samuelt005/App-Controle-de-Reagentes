'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const objects = [];

		for (let i = 1; i <= 58; i++) {
			objects.push({
				numero: Math.floor(Math.random() * 1000) + 1,
				itens_vinculados: Math.floor(Math.random() * 20) + 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		await queryInterface.bulkInsert('lotesdecompra', objects, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('lotesdecompra', null, {});
	},
};
