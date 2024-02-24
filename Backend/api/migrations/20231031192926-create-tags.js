'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Tags', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			nome: {
				allowNull: false,
				type: Sequelize.STRING(20),
			},
			sigla: {
				allowNull: false,
				type: Sequelize.STRING(2),
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

		const objects = [];

		objects.push({
			nome: 'Estoque Mínimo',
			sigla: 'em',
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		objects.push({
			nome: 'Polícia Federal',
			sigla: 'pf',
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		objects.push({
			nome: 'Polícia Civil',
			sigla: 'pc',
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		objects.push({
			nome: 'Exército Brasileiro',
			sigla: 'eb',
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await queryInterface.bulkInsert('tags', objects, {});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Tags');
	},
};
