'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Solicitacoes extends Model {
		static associate(models) {
			Solicitacoes.hasMany(models.ItensMovimentacao, {
        as: 'solicitacao',
				foreignKey: 'id_solicitacao_fk',
			});
      Solicitacoes.belongsTo(models.Usuarios, {
        as: 'responsavel',
				foreignKey: 'id_usuario_fk',
			});
		}
	}
	Solicitacoes.init(
		{
			status: DataTypes.INTEGER,
			comentario: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Solicitacoes',
      tableName: 'solicitacoes'
		}
	);
	return Solicitacoes;
};
