const database = require('../models');

class UnsDeMedidaController {
  	// Função para pegar todos as uns de medida cadastradas
    // TODO remover esta requisição e salvar os tipos de UN no front
	static async getAllUnsDeMedida(req, res) {
		try {
			const allUnsDeMedida = await database.UnsDeMedida.findAll({
				attributes: { exclude: ['createdAt', 'updatedAt'] },
			});
			return res.status(200).json(allUnsDeMedida);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = UnsDeMedidaController;
