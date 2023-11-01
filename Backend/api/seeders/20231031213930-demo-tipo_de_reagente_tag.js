'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const objects = [];

		for (let i = 1; i <= 65; i++) {
			objects.push({
				id_tipo_de_reagente_tag_fk: Math.floor(Math.random() * 25) + 1,
				id_tag_tipo_de_reagente_fk: Math.floor(Math.random() * 4) + 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		function isUnique(item, index, self) {
			return (
				self.findIndex(
					(obj) =>
						obj.id_tipo_de_reagente_tag_fk ===
							item.id_tipo_de_reagente_tag_fk &&
						obj.id_tag_tipo_de_reagente_fk === item.id_tag_tipo_de_reagente_fk
				) === index
			);
		}

		const uniqueObjects = objects.filter(isUnique);

		await queryInterface.bulkInsert('tiposdereagentetags', uniqueObjects, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('tiposdereagentetags', null, {});
	},
};
