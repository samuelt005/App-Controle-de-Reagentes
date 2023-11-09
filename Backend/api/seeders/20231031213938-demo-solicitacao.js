'use strict';

const database = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const objects = [];
		const startDate = new Date('2023-01-01');
		const endDate = new Date('2023-12-31');

		function generateRandomLorem(wordsCount) {
			const loremWords = [
				'Lorem',
				'ipsum',
				'dolor',
				'sit',
				'amet',
				'consectetur',
				'adipisicing',
				'elit',
				'sed',
				'do',
				'eiusmod',
				'tempor',
				'incididunt',
				'ut',
				'labore',
				'et',
				'dolore',
				'magna',
				'aliqua',
			];

			const randomLorem = [];

			for (let i = 0; i < wordsCount; i++) {
				const randomIndex = Math.floor(Math.random() * loremWords.length);
				randomLorem.push(loremWords[randomIndex]);
			}

			return randomLorem.join(' ');
		}

		async function getUsuario(nome) {
			const user = await database.Usuarios.findOne({
				where: {
					nome,
				},
			});

			return user.id;
		}

		const getUserPromises = [];

		for (let i = 1; i <= 36; i++) {
			getUserPromises.push(getUsuario('Professor Teste'));
		}

		const userIds = await Promise.all(getUserPromises);


		for (let i = 1; i <= 36; i++) {
			objects.push({
				status: Math.floor(Math.random() * 3) + 1,
				comentario: generateRandomLorem(10),
				id_usuario_fk: userIds[i - 1],
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		await queryInterface.bulkInsert('solicitacoes', objects, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('solicitacoes', null, {});
	},
};
