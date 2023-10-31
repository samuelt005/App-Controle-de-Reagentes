const database = require('../models');

class FornecedorController {
	// Método para pegar todos os fornecedores cadastrados
	static async getAllFornecedores(req, res) {
		try {
			const allFornecedores = await database.Fornecedores.findAll();
			return res.status(200).json(allFornecedores);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para pegar um fornecedor específico
	static async getFornecedor(req, res) {
		const { id } = req.params;
		try {
			const fornecedor = await database.Fornecedores.findOne({
				where: { id: Number(id) },
			});
			return res.status(200).json(fornecedor);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para pegar 20 fornecedores (paginação)
	static async getFornecedoresPerPage(req, res) {
		const { page } = req.params; // Lê os parâmetros da query

		// Valores padrão para página e itens por página
		const pageNumber = !isNaN(page) ? parseInt(page) : 1;
		const itemsPerPage = 20;

		const offset = (pageNumber - 1) * itemsPerPage; // Calcula o deslocamento

		try {
			const fornecedores = await database.Fornecedores.findAndCountAll({
				where: {},
				limit: itemsPerPage,
				offset: offset,
			});

			return res.status(200).json(fornecedores);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para criar um fornecedor
	static async createNewFornecedor(req, res) {
		const newFornecedor = req.body;

		try {
			const createdFornecedor = await database.Fornecedores.create(
				newFornecedor
			);
			return res.status(200).json(createdFornecedor);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para atualizar um fornecedor
	static async updateFornecedor(req, res) {
		const { id } = req.params;
		const newInfo = req.body;

		try {
			await database.Fornecedores.update(newInfo, {
				where: { id: Number(id) },
			});
			const updatedFornecedor = await database.Fornecedores.findOne({
				where: { id: Number(id) },
			});
			return res.status(200).json(updatedFornecedor);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = FornecedorController;
