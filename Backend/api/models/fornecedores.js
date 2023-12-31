'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Fornecedores extends Model {
		static associate(models) {
			Fornecedores.hasMany(models.Nfes, {
        as: 'emitente',
				foreignKey: 'id_fornecedor_fk',
			});
		}
	}
	Fornecedores.init(
		{
			razao_social: DataTypes.STRING,
			cnpj: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Fornecedores',
      tableName: 'fornecedores'
		}
	);
	return Fornecedores;
};
