const database = require('../models');

class CardsController {
	static async getItemsSum(req, res) {
		const { table, column } = req.params;

		try {
			const model = database[table];

			if (
				table == 'Usuarios' ||
				table == 'Perfis' ||
				table == 'Tags' ||
				table == 'UnsDeMedida'
			) {
				return res.status(403).json();
			} else {
				const sum = await model.sum(column);
				return res.status(200).json(sum);
			}
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para pegar a quantidade de de tipos ativos
	static async getActiveTypesCount(req, res) {
		try {
			const count = await database.TiposDeReagente.count({
				where: { ativo: true },
			});
			return res.status(200).json(count);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para pegar o item com mais utilizações(saídas)
	static async getMostUsedCount(req, res) {
		try {
			const maxItem = await database.TiposDeReagente.findOne({
				attributes: ['descricao'],
				order: [['saidas', 'DESC']],
				where: { ativo: true },
			});

			return res.status(200).json(maxItem.descricao);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = CardsController;
