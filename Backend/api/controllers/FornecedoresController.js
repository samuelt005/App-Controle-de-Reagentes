const database = require('../models');
const { Fornecedores } = require('../models');
const { Op } = require('sequelize');

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
		const { search } = req.query;
		const { page } = req.params;

		const pageNumber = parseInt(page) || 1;
		const itemsPerPage = 20;

		const offset = (pageNumber - 1) * itemsPerPage;

		try {
			const where = {};

			if (search) {
				const cleanedSearch = search.replace(/[\/\.-]/g, '');

				if (!isNaN(cleanedSearch)) {
					where.cnpj = {
						[Op.like]: `%${cleanedSearch}%`,
					};
				} else {
					where.razao_social = {
						[Op.like]: `%${cleanedSearch}%`,
					};
				}
			}

			const fornecedores = await database.Fornecedores.findAll({
				where: where,
				limit: itemsPerPage,
				offset: offset,
				attributes: { exclude: ['updatedAt'] },
			});

			for (const fornecedor of fornecedores) {
				fornecedor.dataValues.notas_vinculadas = await database.Nfes.count({
					where: { id_fornecedor_fk: fornecedor.id },
				});
			}

			let totalItems;
			if (search) {
				totalItems = await database.Fornecedores.count({
					where: where,
				});
			} else {
				totalItems = await database.Fornecedores.count();
			}

			const totalPages = Math.ceil(totalItems / itemsPerPage);

			const resData = {
				currentPage: pageNumber,
				totalPages: totalPages,
				totalItems: totalItems,
				data: fornecedores,
			};

			return res.status(200).json(resData);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para pegar todos os fornecedores
	static async getAllFornecedores(req, res) {
		try {
			const fornecedores = await database.Fornecedores.findAll({
				where: {},
				attributes: { exclude: ['createdAt', 'updatedAt'] },
			});

			const totalItems = await database.Fornecedores.count();

			const resData = {
				currentPage: 1,
				totalPages: 1,
				totalItems: totalItems,
				data: fornecedores,
			};

			return res.status(200).json(resData);
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
				return res.status(409).json({
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
				return res.status(409).json({
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
