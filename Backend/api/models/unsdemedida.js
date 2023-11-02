'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class UnsDeMedida extends Model {
		static associate(models) {
			UnsDeMedida.hasMany(models.TiposDeReagente, {
        foreignKey: 'id_un_de_medida_fk',
        as: 'un_de_medida',
			});
		}
	}
	UnsDeMedida.init(
		{
			sigla: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'UnsDeMedida',
      tableName: 'unsdemedida'
		}
	);
	return UnsDeMedida;
};
