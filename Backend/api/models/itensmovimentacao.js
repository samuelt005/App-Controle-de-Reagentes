'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ItensMovimentacao extends Model {
		static associate(models) {
      ItensMovimentacao.belongsTo(models.Solicitacoes, {
				foreignKey: 'id_solicitacao_fk',
			});
      ItensMovimentacao.belongsTo(models.LotesDeCompra, {
				foreignKey: 'id_lote_fk',
			});
      ItensMovimentacao.belongsTo(models.Nfes, {
				foreignKey: 'id_nfe_fk',
			});
      ItensMovimentacao.belongsTo(models.TiposDeReagente, {
				foreignKey: 'id_tipo_de_reagente_fk',
			});
    }
	}
	ItensMovimentacao.init(
		{
			operacao: DataTypes.INTEGER,
			qtd_mov: DataTypes.FLOAT,
			qtd_rec: DataTypes.FLOAT,
			valor_unit: DataTypes.DECIMAL,
			novo: DataTypes.BOOLEAN,
			recusado: DataTypes.BOOLEAN,
			validade: DataTypes.DATEONLY,
			comentario: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'ItensMovimentacao',
		}
	);
	return ItensMovimentacao;
};
