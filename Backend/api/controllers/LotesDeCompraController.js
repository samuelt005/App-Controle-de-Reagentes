const database = require('../models');
const { Op } = require('sequelize');
const { LotesDeCompra } = require('../models');

class LotesDeCompraController {
	// Função para pegar 20 lotes de compra (paginação)
	static async getLotesDeCompra(req, res) {
		const { search } = req.query;
		const { page } = req.params;

		const pageNumber = parseInt(page) || 1;
		const itemsPerPage = 20;

		const offset = (pageNumber - 1) * itemsPerPage;

		try {
			const where = {};

			if (search) {
				where.numero = {
					[Op.like]: `%${search}%`,
				};
			}

			const lotesdecompra = await database.LotesDeCompra.findAll({
				where: where,
				limit: itemsPerPage,
				offset: offset,
				attributes: { exclude: ['updatedAt'] },
				order: [['numero', 'DESC']],
			});

			for (const lotedecompra of lotesdecompra) {
				lotedecompra.dataValues.itens_vinculados =
					await database.ItensMovimentacao.count({
						where: { id_lote_fk: lotedecompra.id },
					});
			}

			let totalItems;
			if (search) {
				totalItems = await database.LotesDeCompra.count({
					where: where,
				});
			} else {
				totalItems = await database.LotesDeCompra.count();
			}

			const totalPages = Math.ceil(totalItems / itemsPerPage);

			const resData = {
				currentPage: pageNumber,
				totalPages: totalPages,
				totalItems: totalItems,
				data: lotesdecompra,
			};

			return res.status(200).json(resData);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para pegar todos os lotes de compra
	static async getAllLotesDeCompra(req, res) {
		try {
			const resData = await database.LotesDeCompra.findAll({
				where: {},
				attributes: ['id', 'numero'],
				order: [['numero', 'DESC']],
			});

			return res.status(200).json(resData);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para criar um lote de compra
	static async createLoteDeCompra(req, res) {
		const { numero } = req.body;

		try {
			const existingLoteDeCompra = await LotesDeCompra.findOne({
				where: {
					numero,
				},
			});

			if (existingLoteDeCompra) {
				return res.status(409).json({
					message: 'Já existe um lote de compra com o mesmo número.',
				});
			}

			const createdLoteDeCompra = await database.LotesDeCompra.create({
				numero,
			});
			return res.status(200).json(createdLoteDeCompra);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para atualizar o número do lote de compra
	static async updateLoteDeCompra(req, res) {
		const { id } = req.params;
		const { numero } = req.body;

		try {
			const existingLoteDeCompra = await LotesDeCompra.findOne({
				where: {
					numero,
				},
			});

			if (existingLoteDeCompra && existingLoteDeCompra.id !== parseInt(id)) {
				return res.status(409).json({
					message: 'Já existe um lote de compra com o mesmo número.',
				});
			}

			await database.LotesDeCompra.update(
				{ numero },
				{
					where: { id: Number(id) },
				}
			);
			const updatedLoteDeCompra = await database.LotesDeCompra.findOne({
				where: { id: Number(id) },
			});
			return res.status(200).json(updatedLoteDeCompra);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = LotesDeCompraController;
