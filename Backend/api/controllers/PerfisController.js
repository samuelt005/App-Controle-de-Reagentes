const database = require('../models');

class PerfisController {
	// Método para pegar todas as perfis cadastradas
	static async getAllPerfis(req, res) {
		try {
			const allPerfis = await database.Perfis.findAll({
				attributes: { exclude: ['createdAt', 'updatedAt'] },
			});
			return res.status(200).json(allPerfis);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = PerfisController;
