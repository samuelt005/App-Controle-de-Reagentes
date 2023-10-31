'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class UnsDeMedida extends Model {
		static associate(models) {
			UnsDeMedida.hasMany(models.TiposDeReagente, {
				foreignKey: 'id_un_de_medida_fk',
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
		}
	);
	return UnsDeMedida;
};
