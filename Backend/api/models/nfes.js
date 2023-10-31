'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Nfes extends Model {
		static associate(models) {
			Nfes.hasMany(models.ItensMovimentacao, {
				foreignKey: 'id_nfe_fk',
			});
      Nfes.belongsTo(models.Fornecedores, {
				foreignKey: 'id_emitente_fk',
			});
		}
	}
	Nfes.init(
		{
			numero: DataTypes.INTEGER,
			data_emissao: DataTypes.DATEONLY,
		},
		{
			sequelize,
			modelName: 'Nfes',
		}
	);
	return Nfes;
};
