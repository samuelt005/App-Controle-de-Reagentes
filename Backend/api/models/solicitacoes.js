'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Solicitacoes extends Model {
		static associate(models) {
			Solicitacoes.hasMany(models.ItensMovimentacao, {
				foreignKey: 'id_solicitacao_fk',
			});
      Solicitacoes.belongsTo(models.Usuarios, {
				foreignKey: 'id_usuario_fk',
			});
		}
	}
	Solicitacoes.init(
		{
			data: DataTypes.DATEONLY,
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
