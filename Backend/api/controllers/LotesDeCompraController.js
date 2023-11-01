const database = require('../models');
const { LotesDeCompra } = require('../models');

class LotesDeCompraController {
	// Método para pegar um lote de compra específico
	static async getLoteDeCompra(req, res) {
		const { id } = req.params;
		try {
			const lotedecompra = await database.LotesDeCompra.findOne({
				where: { id: Number(id) },
			});
			return res.status(200).json(lotedecompra);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para pegar 20 lotes de compra (paginação)
	static async getLotesDeCompra(req, res) {
		const { page } = req.params;

		const pageNumber = !isNaN(page) ? parseInt(page) : 1;
		const itemsPerPage = 20;

		const offset = (pageNumber - 1) * itemsPerPage;

		try {
			const lotesdecompra = await database.LotesDeCompra.findAndCountAll({
				where: {},
				limit: itemsPerPage,
				offset: offset,
			});

			return res.status(200).json(lotesdecompra);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para criar um lote de compra
	static async createLoteDeCompra(req, res) {
		const newLoteDeCompra = req.body;

		try {
			const existingLoteDeCompra = await LotesDeCompra.findOne({
				where: {
					numero: newLoteDeCompra.numero,
				},
			});

			if (existingLoteDeCompra) {
				return res.status(400).json({
					message: 'Já existe um lote de compra com o mesmo número.',
				});
			}

			const createdLoteDeCompra = await database.LotesDeCompra.create(
				newLoteDeCompra
			);
			return res.status(200).json(createdLoteDeCompra);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para atualizar um lote de compra
	static async updateLoteDeCompra(req, res) {
		const { id } = req.params;
		const newInfo = req.body;

		try {
      const existingLoteDeCompra = await LotesDeCompra.findOne({
				where: {
					numero: newInfo.numero,
				},
			});

			if (existingLoteDeCompra) {
				return res.status(400).json({
					message: 'Já existe um lote de compra com o mesmo número.',
				});
			}

			await database.LotesDeCompra.update(newInfo, {
				where: { id: Number(id) },
			});
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
