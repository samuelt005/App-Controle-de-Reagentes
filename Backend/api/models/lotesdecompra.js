'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class LotesDeCompra extends Model {
		static associate(models) {
			LotesDeCompra.hasMany(models.ItensMovimentacao, {
        as: 'lote',
				foreignKey: 'id_lote_fk',
			});
		}
	}
	LotesDeCompra.init(
		{
			numero: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'LotesDeCompra',
      tableName: 'lotesdecompra'
		}
	);
	return LotesDeCompra;
};
