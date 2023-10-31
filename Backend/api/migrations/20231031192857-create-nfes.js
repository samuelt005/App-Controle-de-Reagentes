'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Nfes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			numero: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			data_emissao: {
				allowNull: false,
				type: Sequelize.DATEONLY,
			},
			id_fornecedor_fk: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: 'Fornecedores', key: 'id' },
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
		await queryInterface.dropTable('Nfes');
	},
};
