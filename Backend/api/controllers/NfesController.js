const database = require('../models');
const { Nfes } = require('../models');

class NfesController {
	// Método para pegar um nfe específico
	static async getNfe(req, res) {
		const { id } = req.params;
		try {
			const nfe = await database.Nfes.findOne({
				where: { id: Number(id) },
				include: [
					{
						model: database.Fornecedores,
						as: 'emitente',
					},
				],
			});
			return res.status(200).json(nfe);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para pegar 20 nfes (paginação)
	static async getNfes(req, res) {
		const { page } = req.params;

		const pageNumber = !isNaN(page) ? parseInt(page) : 1;
		const itemsPerPage = 20;

		const offset = (pageNumber - 1) * itemsPerPage;

		try {
			const nfes = await database.Nfes.findAndCountAll({
				where: {},
				limit: itemsPerPage,
				offset: offset,
				include: [
					{
						model: database.Fornecedores,
						as: 'emitente',
					},
				],
			});

			return res.status(200).json(nfes);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para criar um nfe
	static async createNfe(req, res) {
		const newNfe = req.body;

		try {
			const existingNfe = await Nfes.findOne({
				where: {
					numero: newNfe.numero,
					id_fornecedor_fk: newNfe.id_fornecedor_fk,
				},
			});

			if (existingNfe) {
				return res.status(400).json({
					message: 'Já existe uma NFe com o mesmo número e fornecedor.',
				});
			}

			const createdNfe = await Nfes.create(newNfe);
			return res.status(200).json(createdNfe);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para atualizar um nfe
	static async updateNfe(req, res) {
		const { id } = req.params;
		const newInfo = req.body;

		try {
			const existingNfe = await Nfes.findOne({
				where: {
					numero: newInfo.numero,
					id_fornecedor_fk: newInfo.id_fornecedor_fk,
				},
			});

			if (existingNfe) {
				return res.status(400).json({
					message: 'Já existe uma NFe com o mesmo número e fornecedor.',
				});
			}

			await database.Nfes.update(newInfo, {
				where: { id: Number(id) },
			});
			const updatedNfe = await database.Nfes.findOne({
				where: { id: Number(id) },
			});
			return res.status(200).json(updatedNfe);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = NfesController;
