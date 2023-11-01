'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const objects = [];
		const materialsArray = [
			'Ácido sulfúrico',
			'Hidróxido de sódio',
			'Cloreto de sódio',
			'Ácido clorídrico',
			'Hidrogênio',
			'Oxigênio',
			'Amônia',
			'Metanol',
			'Etanol',
			'Acetona',
			'Dióxido de enxofre',
			'Ácido acético',
			'Peróxido de hidrogênio',
			'Nitrato de sódio',
			'Clorofórmio',
			'Ácido nítrico',
			'Ácido sulfúrico',
			'Sulfato de ferro',
			'Sulfato de zinco',
			'Bromo',
			'Ácido cítrico',
			'Benzeno',
			'Ácido fosfórico',
			'Cloreto de magnésio',
			'Sulfato de cobre',
		];

		for (let i = 1; i <= 25; i++) {
			function getRandomDecimal() {
				const intPart = Math.floor(Math.random() * 1000);
				const decimalPart = Math.floor(Math.random() * 100);
				const decimalNumber = intPart + decimalPart / 100;
				return parseFloat(decimalNumber.toFixed(2));
			}

			let active = Math.random() < 0.5;

			let randomDecimal = getRandomDecimal();

			objects.push({
				descricao: materialsArray[i - 1],
				loc_estoque:
					'A' +
					(Math.floor(Math.random() * 10) + 1) +
					'P' +
					(Math.floor(Math.random() * 3) + 1),
				vlr_estoque: active ? randomDecimal : 0.0,
				entradas: Math.floor(Math.random() * 50) + 1,
				saidas: Math.floor(Math.random() * 50) + 1,
				ativo: active,
				id_un_de_medida_fk: Math.floor(Math.random() * 5) + 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		await queryInterface.bulkInsert('tiposdereagente', objects, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('tiposdereagente', null, {});
	},
};
