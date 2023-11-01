'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const objects = [];
		const startDate = new Date('2023-01-01');
		const endDate = new Date('2023-12-31');

		for (let i = 1; i <= 87; i++) {
			const randomDate = new Date(
				startDate.getTime() +
					Math.random() * (endDate.getTime() - startDate.getTime())
			);

			objects.push({
				numero: Math.floor(Math.random() * 10000) + 1,
				data_emissao: randomDate,
				id_fornecedor_fk: Math.floor(Math.random() * 50) + 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		await queryInterface.bulkInsert('nfes', objects, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('nfes', null, {});
	},
};
