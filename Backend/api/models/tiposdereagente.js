'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class TiposDeReagente extends Model {
		static associate(models) {
			TiposDeReagente.hasMany(models.ItensMovimentacao, {
        as: 'tipo',
				foreignKey: 'id_tipo_de_reagente_fk',
			});
			TiposDeReagente.belongsToMany(models.Tags, {
				through: 'TiposDeReagenteTags',
				foreignKey: 'id_tipo_de_reagente_tag_fk',
				otherKey: 'id_tag_tipo_de_reagente_fk',
			});
      TiposDeReagente.belongsTo(models.UnsDeMedida, {
        as: 'un_de_medida',
				foreignKey: 'id_un_de_medida_fk',
			});
		}
	}
	TiposDeReagente.init(
		{
			cod: DataTypes.BIGINT,
			descricao: DataTypes.STRING,
			loc_estoque: DataTypes.STRING,
			estoque_atual: DataTypes.DECIMAL,
			vlr_estoque: DataTypes.DECIMAL,
			ativo: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'TiposDeReagente',
      tableName: 'tiposdereagente'
		}
	);
	return TiposDeReagente;
};
