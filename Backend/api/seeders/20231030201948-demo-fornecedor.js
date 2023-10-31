'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const objects = [];

		for (let i = 1; i <= 50; i++) {
			objects.push({
				razao_social: `Empresa ${i}`,
				cnpj: `11111111${i.toString().padStart(4, '0')}`,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		await queryInterface.bulkInsert('fornecedores', objects, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('fornecedores', null, {});
	},
};
