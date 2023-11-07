'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Nfes extends Model {
		static associate(models) {
			Nfes.hasMany(models.ItensMovimentacao, {
        as: 'nfe',
				foreignKey: 'id_nfe_fk',
			});
			Nfes.belongsTo(models.Fornecedores, {
				as: 'emitente',
				foreignKey: 'id_fornecedor_fk',
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
			tableName: 'nfes',
		}
	);
	return Nfes;
};
