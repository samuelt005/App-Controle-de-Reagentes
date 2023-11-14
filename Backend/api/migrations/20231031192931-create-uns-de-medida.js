'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
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
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('UnsDeMedida');
	},
};
