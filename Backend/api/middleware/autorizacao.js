const database = require('../models');

const autorizacao = (perfisList) => {
	return async (req, res, next) => {
		const { usuarioId } = req;

		try {

      if (!usuarioId) {
        return res.status(401).send('Usuário não informado');
      }

			const usuario = await database.Usuarios.findOne({
				where: {
					id: usuarioId,
				},
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'id_perfil_fk', 'senha'],
				},
				include: [
					{
						model: database.Perfis,
						as: 'perfil',
						attributes: { exclude: ['createdAt', 'updatedAt'] },
					},
				],
			});

			if (!usuario) {
				return res.status(401).send('Usuário não cadastrado');
			}

			const perfilUsuario = usuario.perfil.nome;

			if (!perfisList.includes(perfilUsuario)) {
				return res.status(403).send('Este usuário não tem acesso a esta rota');
			}

			next();
		} catch (error) {
			console.error(error);
			return res.status(500).send('Erro interno do servidor');
		}
	};
};

module.exports = autorizacao;
