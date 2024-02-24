const database = require('../models');

class PerfisController {
	// Função para pegar todos os perfis
	static async getAllPerfis(req, res) {
		try {
			const perfis = await database.Perfis.findAll({
				where: {},
				attributes: { exclude: ['createdAt', 'updatedAt'] },
			});

			const resData = {
				data: perfis,
			};

			return res.status(200).json(resData);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = PerfisController;
