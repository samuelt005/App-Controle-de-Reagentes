'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
    // Criação da tabela
		await queryInterface.createTable('UnsDeMedida', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			sigla: {
				allowNull: false,
				type: Sequelize.STRING(2),
			},
			nome: {
				allowNull: false,
				type: Sequelize.STRING(20),
			},
			peso: {
				allowNull: false,
				type: Sequelize.DECIMAL(10, 4),
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});

    // Inserção dos registros padrões
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
		await queryInterface.dropTable('UnsDeMedida');
	},
};
