const database = require('../models');
const { LotesDeCompra } = require('../models');

class LotesDeCompraController {
	// Método para pegar um lote de compra específico
	static async getLoteDeCompra(req, res) {
		const { id } = req.params;
		try {
			const lotedecompra = await database.LotesDeCompra.findOne({
				where: { id: Number(id) },
				attributes: { exclude: ['createdAt', 'updatedAt'] },
			});
			return res.status(200).json(lotedecompra);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para pegar 20 lotes de compra (paginação)
	static async getLotesDeCompra(req, res) {
		const { page } = req.params;

		const pageNumber = parseInt(page) || 1;
		const itemsPerPage = 20;

		const offset = (pageNumber - 1) * itemsPerPage;

		try {
			const result = await database.LotesDeCompra.findAndCountAll({
				where: {},
				limit: itemsPerPage,
				offset: offset,
				attributes: { exclude: ['updatedAt'] },
				order: [['numero', 'DESC']],
			});

			const lotesdecompra = result.rows;

			for (const lotedecompra of lotesdecompra) {
				lotedecompra.dataValues.itens_vinculados =
					await database.ItensMovimentacao.count({
						where: { id_lote_fk: lotedecompra.id },
					});
			}

			const totalItems = await database.LotesDeCompra.count();

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

	// Método para pegar todos os lotes de compra
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

	// Método para criar um lote de compra
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

	// Método para atualizar o número do lote de compra
	static async updateNumero(req, res) {
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

	// Método para atualizar a quantidade de itens vinculados ao lote de compra
	static async updateItensVinculados(req, res) {
		//TODO remover esta rota e jogar a lógica para o controller de ItensMovimentação
		const { id } = req.params;
		const { soma } = req.body;

		try {
			const loteDeCompra = await LotesDeCompra.findOne({
				where: { id: Number(id) },
			});

			const newValue = soma
				? loteDeCompra.itens_vinculados + 1
				: loteDeCompra.itens_vinculados - 1;

			await database.LotesDeCompra.update(
				{ itens_vinculados: newValue },
				{ where: { id: Number(id) } }
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
