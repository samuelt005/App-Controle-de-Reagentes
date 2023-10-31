'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class LotesDeCompra extends Model {
		static associate(models) {
			LotesDeCompra.hasMany(models.ItensMovimentacao, {
				foreignKey: 'id_lote_fk',
			});
		}
	}
	LotesDeCompra.init(
		{
			numero: DataTypes.INTEGER,
			itens_vinculados: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'LotesDeCompra',
		}
	);
	return LotesDeCompra;
};
