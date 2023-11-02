'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class TiposDeReagenteTags extends Model {
		static associate(models) {
			// Defina o relacionamento com a tabela TiposDeReagente
			TiposDeReagenteTags.belongsTo(models.TiposDeReagente, {
				foreignKey: 'id_tipo_de_reagente_tag_fk',
				as: 'tipoDeReagente',
			});

			// Defina o relacionamento com a tabela Tags
			TiposDeReagenteTags.belongsTo(models.Tags, {
				foreignKey: 'id_tag_tipo_de_reagente_fk',
				as: 'tag',
			});
		}
	}
	TiposDeReagenteTags.init(
		{
			id_tag_tipo_de_reagente_fk: DataTypes.INTEGER,
			id_tipo_de_reagente_tag_fk: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'TiposDeReagenteTags',
			tableName: 'tiposdereagentetags',
		}
	);
	return TiposDeReagenteTags;
};
