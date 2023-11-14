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
			cod: {
				allowNull: false,
				type: Sequelize.BIGINT,
			},
			descricao: {
				allowNull: false,
				type: Sequelize.STRING(100),
			},
			loc_estoque: {
				type: Sequelize.STRING(10),
			},
			estoque_atual: {
				allowNull: false,
				type: Sequelize.DECIMAL(14, 4),
				defaultValue: '0',
			},
			vlr_estoque: {
				allowNull: false,
				type: Sequelize.DECIMAL(12, 2),
				defaultValue: '0',
			},
			entradas: {
				allowNull: false,
				type: Sequelize.INTEGER,
				defaultValue: '0',
			},
			saidas: {
				allowNull: false,
				type: Sequelize.INTEGER,
				defaultValue: '0',
			},
			ativo: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: true,
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
