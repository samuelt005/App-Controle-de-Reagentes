const database = require('../models');

class PaginatorController {
	// Método para pegar a quantidade de itens em uma tabela
	static async getItemsCount(req, res) {
		const { table } = req.params;

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
				const count = await model.count();
				return res.status(200).json(count);
			}
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = PaginatorController;
