'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
    // Criação da tabela
		await queryInterface.createTable('TiposDeReagenteTags', {
      id_tag_tipo_de_reagente_fk: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: 'Tags', key: 'id' },
			},
      id_tipo_de_reagente_tag_fk: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: 'TiposDeReagente', key: 'id' },
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
		await queryInterface.dropTable('TiposDeReagenteTags');
	},
};
