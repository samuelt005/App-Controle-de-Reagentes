const database = require('../models');

class PerfisController {
	// Método para pegar apenas um perfil cadastrado
	static async getPerfil(req, res) {
		const { id } = req.params;
		try {
			const perfil = await database.Perfis.findOne({
				where: { id: Number(id) },
				attributes: { exclude: ['createdAt', 'updatedAt'] },
			});

			return res.status(200).json(perfil);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para pegar todas as perfis cadastradas
	static async getAllPerfis(req, res) {
		try {
			const allPerfis = await database.Perfis.findAll({
				attributes: { exclude: ['createdAt', 'updatedAt'] },
				include: [
					{
						model: database.Permissoes,
						as: 'Permissoes',
						attributes: ['id', 'nome', 'descricao'],
						through: {
							attributes: [],
						},
					},
				],
			});

			return res.status(200).json(allPerfis);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = PerfisController;
