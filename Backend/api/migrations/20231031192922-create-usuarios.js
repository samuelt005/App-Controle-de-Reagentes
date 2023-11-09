'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Usuarios', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUID,
			},
			nome: {
				allowNull: false,
				type: Sequelize.STRING(100),
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING(100),
			},
			senha: {
				allowNull: false,
				type: Sequelize.STRING(100),
			},
			ra: {
				allowNull: false,
				type: Sequelize.STRING(8),
			},
			cpf: {
				allowNull: false,
				type: Sequelize.BIGINT,
			},
			id_perfil_fk: {
				type: Sequelize.INTEGER,
				references: { model: 'Perfis', key: 'id' },
				defaultValue: null,
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
		await queryInterface.dropTable('Usuarios');
	},
};
