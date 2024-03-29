'use strict';

const database = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Criação da tabela
		let defaultPerfil;
		try {
			defaultPerfil = await database.Perfis.findOne({
				where: { nome: 'Aluno' },
			});
			console.log(defaultPerfil.id);
		} catch (e) {
			console.error('Erro ao buscar o perfil: ', e);
		}

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
				allowNull: true,
				type: Sequelize.STRING(100),
			},
			confirmed_email: {
				defaultValue: false,
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
			confirmation_code: {
				allowNull: true,
				type: Sequelize.STRING(32),
			},
			senha: {
				allowNull: true,
				type: Sequelize.STRING(100),
			},
			ra: {
				allowNull: false,
				type: Sequelize.STRING(8),
			},
			codigo_unico: {
				allowNull: true,
				type: Sequelize.STRING(10),
			},
			cpf: {
				allowNull: false,
				type: Sequelize.BIGINT,
			},
			id_perfil_fk: {
				defaultValue: defaultPerfil.id,
				type: Sequelize.UUID,
				references: { model: 'Perfis', key: 'id' },
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
