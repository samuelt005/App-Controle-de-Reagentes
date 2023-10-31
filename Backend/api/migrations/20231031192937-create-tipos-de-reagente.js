'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('TiposDeReagente', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			descricao: {
				allowNull: false,
				type: Sequelize.STRING(100),
			},
			loc_estoque: {
				type: Sequelize.STRING(10),
			},
			vlr_estoque: {
				allowNull: false,
				type: Sequelize.DECIMAL(10, 2),
			},
			entradas: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			saidas: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			ativo: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
			id_un_de_medida_fk: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: 'UnsDeMedida', key: 'id' },
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
		await queryInterface.dropTable('TiposDeReagente');
	},
};
