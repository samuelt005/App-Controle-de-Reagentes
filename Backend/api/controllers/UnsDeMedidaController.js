const database = require('../models');

class UnsDeMedidaController {
  	// Método para pegar todos as uns de medida cadastradas
	static async getAllUnsDeMedida(req, res) {
		try {
			const allUnsDeMedida = await database.UnsDeMedida.findAll();
			return res.status(200).json(allUnsDeMedida);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = UnsDeMedidaController;
