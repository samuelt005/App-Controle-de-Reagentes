'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Usuarios extends Model {
		static associate(models) {
			Usuarios.hasMany(models.Solicitacoes, {
				foreignKey: 'id_usuario_fk',
			});
      Usuarios.belongsTo(models.Perfis, {
				foreignKey: 'id_perfil_fk',
			});
		}
	}
	Usuarios.init(
		{
			nome: DataTypes.STRING,
			email: DataTypes.STRING,
			senha_hash: DataTypes.STRING,
			salt: DataTypes.STRING,
			data_criacao: DataTypes.DATEONLY,
			ra: DataTypes.STRING,
			cpf: DataTypes.BIGINT,
		},
		{
			sequelize,
			modelName: 'Usuarios',
		}
	);
	return Usuarios;
};
