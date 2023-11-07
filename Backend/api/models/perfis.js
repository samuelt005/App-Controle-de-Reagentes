'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Perfis extends Model {
		static associate(models) {
			Perfis.hasMany(models.Usuarios, {
        as: 'perfil',
				foreignKey: 'id_perfil_fk',
			});
		}
	}
	Perfis.init(
		{
			nome: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Perfis',
      tableName: 'perfis'
		}
	);
	return Perfis;
};
