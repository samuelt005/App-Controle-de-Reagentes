'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('ItensMovimentacao', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			operacao: {
				type: Sequelize.INTEGER,
			},
			qtd_mov: {
				allowNull: false,
				type: Sequelize.DECIMAL(14, 4),
			},
			qtd_rec: {
				type: Sequelize.DECIMAL(14, 4),
			},
			valor_tot: {
				type: Sequelize.DECIMAL(12, 2),
			},
			novo: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			recusado: {
				type: Sequelize.BOOLEAN,
			},
			validade: {
				type: Sequelize.DATEONLY,
			},
			data: {
				type: Sequelize.DATEONLY,
			},
			comentario: {
				allowNull: false,
				type: Sequelize.STRING(200),
			},
			id_solicitacao_fk: {
				allowNull: true,
				type: Sequelize.INTEGER,
				references: { model: 'Solicitacoes', key: 'id' },
			},
			id_lote_fk: {
				allowNull: true,
				type: Sequelize.INTEGER,
				references: { model: 'LotesDeCompra', key: 'id' },
			},
			id_nfe_fk: {
				allowNull: true,
				type: Sequelize.INTEGER,
				references: { model: 'Nfes', key: 'id' },
			},
			id_usuario_fk: {
				allowNull: true,
				type: Sequelize.UUID,
				references: { model: 'Usuarios', key: 'id' },
			},
			id_tipo_de_reagente_fk: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: 'TiposDeReagente', key: 'id' },
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
		await queryInterface.dropTable('ItensMovimentacao');
	},
};
