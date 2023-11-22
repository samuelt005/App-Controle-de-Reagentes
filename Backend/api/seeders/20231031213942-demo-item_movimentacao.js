'use strict';

const database = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const objects = [];
		const startDate = new Date('2023-01-01');
		const endDate = new Date('2023-12-31');

		for (let i = 1; i <= 1000; i++) {
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

			getUserPromises.push(getUsuario('admin'));
			getUserPromises.push(getUsuario('Professor Teste'));
			getUserPromises.push(getUsuario('Aluno Teste'));

			const userIds = await Promise.all(getUserPromises);

			function getRandomFloat() {
				const randomFloat = Math.random();
				const roundedFloat = Math.round(randomFloat * 1000) / 100;

				return roundedFloat;
			}

			function getRandomDecimal() {
				const intPart = Math.floor(Math.random() * 100);
				const decimalPart = Math.floor(Math.random() * 100);
				const decimalNumber = intPart + decimalPart / 100;
				return parseFloat(decimalNumber.toFixed(2));
			}

			const randomFloat = getRandomFloat();

			const randomOperation = Math.floor(Math.random() * 3) + 1;
			// 1 Entrada
			// 2 Saída
			// 3 Ajuste

			const randomDate = new Date(
				startDate.getTime() +
					Math.random() * (endDate.getTime() - startDate.getTime())
			);

			function chooseUsuario() {
				if (randomOperation == 1) {
					return null;
				} else if (randomOperation == 2) {
					return userIds[2];
				} else if (randomOperation == 3) {
					return userIds[0];
				}
			}

			const usuarioId = chooseUsuario();

			objects.push({
				operacao: randomOperation,
				qtd_mov: randomOperation == 2 ? randomFloat * -1 : randomFloat,
				qtd_rec: randomOperation == 1 ? randomFloat : null,
				valor_unit:
					randomOperation == 2 ? getRandomDecimal() * -1 : getRandomDecimal(),
				novo: 0,
				recusado: randomOperation == 1 ? 0 : null,
				validade: randomOperation == 1 ? randomDate : null,
				data_ajuste: randomOperation == 3 ? randomDate : null,
				comentario: generateRandomLorem(10),
				id_solicitacao_fk:
					randomOperation == 1 ? Math.floor(Math.random() * 36) + 1 : null,
				id_lote_fk:
					randomOperation == 1 ? Math.floor(Math.random() * 58) + 1 : null,
				id_nfe_fk:
					randomOperation == 1 ? Math.floor(Math.random() * 87) + 1 : null,
				id_usuario_fk: usuarioId,
				id_tipo_de_reagente_fk: Math.floor(Math.random() * 25) + 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		await queryInterface.bulkInsert('itensmovimentacao', objects, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('itensmovimentacao', null, {});
	},
};
