'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Solicitacoes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			data: {
				allowNull: false,
				type: Sequelize.DATEONLY,
			},
			status: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			comentario: {
				type: Sequelize.STRING(500),
			},
			id_usuario_fk: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: 'Usuarios', key: 'id' },
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
		await queryInterface.dropTable('Solicitacoes');
	},
};
