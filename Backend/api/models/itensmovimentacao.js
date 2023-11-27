'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ItensMovimentacao extends Model {
		static associate(models) {
			ItensMovimentacao.belongsTo(models.Solicitacoes, {
				as: 'solicitacao',
				foreignKey: 'id_solicitacao_fk',
			});
			ItensMovimentacao.belongsTo(models.LotesDeCompra, {
        as: 'lote',
				foreignKey: 'id_lote_fk',
			});
			ItensMovimentacao.belongsTo(models.Nfes, {
				as: 'nfe',
				foreignKey: 'id_nfe_fk',
			});
			ItensMovimentacao.belongsTo(models.TiposDeReagente, {
				as: 'tipo',
				foreignKey: 'id_tipo_de_reagente_fk',
			});
			ItensMovimentacao.belongsTo(models.Usuarios, {
				as: 'responsavel_movimentacao',
				foreignKey: 'id_usuario_fk',
			});
		}
	}
	ItensMovimentacao.init(
		{
			operacao: DataTypes.INTEGER,
			qtd_mov: DataTypes.FLOAT,
			qtd_rec: DataTypes.FLOAT,
			valor_tot: DataTypes.DECIMAL,
			novo: DataTypes.BOOLEAN,
			recusado: DataTypes.BOOLEAN,
			validade: DataTypes.DATEONLY,
			data: DataTypes.DATEONLY,
			comentario: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'ItensMovimentacao',
			tableName: 'itensmovimentacao',
		}
	);
	return ItensMovimentacao;
};
