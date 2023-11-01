'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Tags extends Model {
		static associate(models) {
      Tags.belongsToMany(models.TiposDeReagente, {
				through: 'TiposDeReagenteTags',
				foreignKey: 'id_tag_tipo_de_reagente_fk',
				otherKey: 'id_tipo_de_reagente_tag_fk',
			});
    }
	}
	Tags.init(
		{
			nome: DataTypes.STRING,
			sigla: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Tags',
      tableName: 'tags'
		}
	);
	return Tags;
};
