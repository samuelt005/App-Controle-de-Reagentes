'use strict';

const uuid = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Criação da tabela
		await queryInterface.createTable('Perfis', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUID,
			},
			nome: {
				allowNull: false,
				type: Sequelize.STRING(20),
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
			id: uuid.v4(),
			nome: 'Administrador',
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		objects.push({
			id: uuid.v4(),
			nome: 'Professor',
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		objects.push({
			id: uuid.v4(),
			nome: 'Aluno',
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await queryInterface.bulkInsert('perfis', objects, {});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Perfis');
	},
};
