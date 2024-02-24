'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Criação da tabela
		await queryInterface.createTable('Fornecedores', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			razao_social: {
				allowNull: false,
				type: Sequelize.STRING(100),
			},
			cnpj: {
				allowNull: false,
				type: Sequelize.STRING(14),
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
		await queryInterface.dropTable('Fornecedores');
	},
};
