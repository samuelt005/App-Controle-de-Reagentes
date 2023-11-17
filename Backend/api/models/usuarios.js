'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Usuarios extends Model {
		static associate(models) {
			Usuarios.hasMany(models.Solicitacoes, {
				as: 'responsavel_solicitacao',
				foreignKey: 'id_usuario_fk',
			});
			Usuarios.hasMany(models.ItensMovimentacao, {
				as: 'responsavel_movimentacao',
				foreignKey: 'id_usuario_fk',
			});
			Usuarios.belongsTo(models.Perfis, {
				as: 'perfil',
				foreignKey: 'id_perfil_fk',
			});
		}
	}
	Usuarios.init(
		{
			nome: DataTypes.STRING,
			email: DataTypes.STRING,
			senha: DataTypes.STRING,
			ra: DataTypes.STRING,
			cpf: DataTypes.BIGINT,
		},
		{
			sequelize,
			modelName: 'Usuarios',
			tableName: 'usuarios',
			defaultScope: {
				attributes: {
					exclude: ['senha'],
				},
			},
		}
	);
	return Usuarios;
};
