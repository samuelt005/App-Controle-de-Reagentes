'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class InvalidTokens extends Model {
		static associate(models) {}
	}

	InvalidTokens.init(
		{
			token: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
		},
		{
			sequelize,
			modelName: 'InvalidTokens',
			tableName: 'invalidtokens', // Nome da tabela para os tokens inválidos
		}
	);

	return InvalidTokens;
};
