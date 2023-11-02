const database = require('../models');
const { Fornecedores } = require('../models');

class FornecedoresController {
	// Método para pegar um fornecedor específico
	static async getFornecedor(req, res) {
		const { id } = req.params;
		try {
			const fornecedor = await database.Fornecedores.findOne({
				where: { id: Number(id) },
				attributes: { exclude: ['createdAt', 'updatedAt'] },
			});
			return res.status(200).json(fornecedor);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para pegar 20 fornecedores (paginação)
	static async getFornecedores(req, res) {
		const { page } = req.params;

		const pageNumber = parseInt(page) || 1;
		const itemsPerPage = 20;

		const offset = (pageNumber - 1) * itemsPerPage;

		try {
			const fornecedores = await database.Fornecedores.findAndCountAll({
				where: {},
				limit: itemsPerPage,
				offset: offset,
				attributes: { exclude: ['createdAt', 'updatedAt'] },
			});

			return res.status(200).json(fornecedores);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para criar um fornecedor
	static async createFornecedor(req, res) {
		const { razao_social, cnpj } = req.body;

		try {
			const existingFornecedor = await Fornecedores.findOne({
				where: {
					cnpj,
				},
			});

			if (existingFornecedor) {
				return res.status(400).json({
					message: 'Já existe um fornecedor com o mesmo CNPJ.',
				});
			}

			const createdFornecedor = await database.Fornecedores.create({
				razao_social,
				cnpj,
			});
			return res.status(200).json(createdFornecedor);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para atualizar um fornecedor
	static async updateFornecedor(req, res) {
		const { id } = req.params;
		const { razao_social, cnpj } = req.body;

		try {
			const existingFornecedor = await Fornecedores.findOne({
				where: {
					cnpj,
				},
			});

			if (existingFornecedor && existingFornecedor.id !== parseInt(id)) {
				return res.status(400).json({
					message: 'Já existe um fornecedor com o mesmo CNPJ.',
				});
			}

			await database.Fornecedores.update(
				{ razao_social, cnpj },
				{
					where: { id: Number(id) },
				}
			);
			const updatedFornecedor = await database.Fornecedores.findOne({
				where: { id: Number(id) },
			});
			return res.status(200).json(updatedFornecedor);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = FornecedoresController;
