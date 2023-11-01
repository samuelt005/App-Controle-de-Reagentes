'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class TiposDeReagente extends Model {
		static associate(models) {
			TiposDeReagente.hasMany(models.ItensMovimentacao, {
				foreignKey: 'id_tipo_de_reagente_fk',
			});
			TiposDeReagente.belongsToMany(models.Tags, {
				through: 'TiposDeReagenteTags',
				foreignKey: 'id_tipo_de_reagente_tag_fk',
				otherKey: 'id_tag_tipo_de_reagente_fk',
			});
      TiposDeReagente.belongsTo(models.UnsDeMedida, {
				foreignKey: 'id_un_de_medida_fk',
			});
		}
	}
	TiposDeReagente.init(
		{
			descricao: DataTypes.STRING,
			loc_estoque: DataTypes.STRING,
			vlr_estoque: DataTypes.DECIMAL,
			entradas: DataTypes.INTEGER,
			saidas: DataTypes.INTEGER,
			ativo: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'TiposDeReagente',
		}
	);
	return TiposDeReagente;
};
