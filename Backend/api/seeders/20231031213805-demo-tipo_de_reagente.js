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
			function getRandomDecimal(decimals) {
				const intPart = Math.floor(Math.random() * 1000);
				const decimalPart = Math.floor(Math.random() * 100);
				const decimalNumber = intPart + decimalPart / 100;
				return parseFloat(decimalNumber.toFixed(decimals));
			}

			let active = Math.random() < 0.5;

			let randomDecimal2 = getRandomDecimal(2);
			let randomDecimal4 = getRandomDecimal(4);

			objects.push({
				cod: Math.floor(Math.random() * 1000) + 1,
				descricao: materialsArray[i - 1],
				loc_estoque:
					'A' +
					(Math.floor(Math.random() * 10) + 1) +
					'P' +
					(Math.floor(Math.random() * 3) + 1),
        estoque_atual: active ? randomDecimal2 : 0.0,
				vlr_estoque: active ? randomDecimal4 : 0.0,
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
