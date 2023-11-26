const database = require('../models');
const { Op } = require('sequelize');
const { Nfes } = require('../models');

class NfesController {
	// Função para pegar 20 nfes (paginação)
	static async getNfes(req, res) {
		const { search } = req.query;
		const { page } = req.params;

		const pageNumber = parseInt(page) || 1;
		const itemsPerPage = 20;

		const offset = (pageNumber - 1) * itemsPerPage;

		try {
			const where = {};
			const whereEmitente = {};

			if (search) {
				if (!isNaN(search)) {
					where.numero = {
						[Op.like]: `%${search}%`,
					};
				} else {
					whereEmitente.razao_social = {
						[Op.like]: `%${search}%`,
					};
				}
			}

			const nfes = await database.Nfes.findAll({
				where: where,
				limit: itemsPerPage,
				offset: offset,
				include: [
					{
						model: database.Fornecedores,
						as: 'emitente',
						attributes: { exclude: ['createdAt', 'updatedAt'] },
						where: whereEmitente,
					},
				],
				attributes: { exclude: ['createdAt', 'updatedAt', 'id_fornecedor_fk'] },
				order: [['data_emissao', 'DESC']],
			});

			for (const nfe of nfes) {
				nfe.dataValues.itens_vinculados =
					await database.ItensMovimentacao.count({
						where: { id_nfe_fk: nfe.id },
					});
			}

			let totalItems;
			if (search) {
				if (!isNaN(search)) {
					totalItems = await database.Nfes.count({
						where: where,
					});
				} else {
					totalItems = await database.Nfes.count({
						include: [
							{
								model: database.Fornecedores,
								as: 'emitente',
								attributes: [],
								where: whereEmitente,
							},
						],
					});
				}
			} else {
				totalItems = await database.Nfes.count();
			}

			const totalPages = Math.ceil(totalItems / itemsPerPage);

			const resData = {
				currentPage: pageNumber,
				totalPages: totalPages,
				totalItems: totalItems,
				data: nfes,
			};

			return res.status(200).json(resData);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para pegar todas as nfes
	static async getAllNfes(req, res) {
		try {
			const resData = await database.Nfes.findAll({
				where: {},
				attributes: ['id', 'numero'],
				include: [
					{
						model: database.Fornecedores,
						as: 'emitente',
						attributes: ['razao_social'],
					},
				],
				order: [['data_emissao', 'DESC']],
			});

			return res.status(200).json(resData);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para criar uma nfe
	static async createNfe(req, res) {
		const { numero, data_emissao, id_fornecedor } = req.body;

		try {
			const existingNfe = await Nfes.findOne({
				where: {
					numero,
					id_fornecedor_fk: id_fornecedor,
				},
			});

			if (existingNfe) {
				return res.status(409).json({
					message: 'Já existe uma NFe com o mesmo número e fornecedor.',
				});
			}

			const createdNfe = await Nfes.create({
				numero,
				data_emissao,
				id_fornecedor_fk: id_fornecedor,
			});
			return res.status(200).json(createdNfe);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para atualizar uma nfe
	static async updateNfe(req, res) {
		const { id } = req.params;
		const { numero, data_emissao, id_fornecedor } = req.body;

		try {
			const existingNfe = await Nfes.findOne({
				where: {
					numero,
					id_fornecedor_fk: id_fornecedor,
				},
			});

			if (existingNfe && existingNfe.id !== parseInt(id)) {
				return res.status(409).json({
					message: 'Já existe uma NFe com o mesmo número e fornecedor.',
				});
			}

			await database.Nfes.update(
				{
					numero,
					data_emissao,
					id_fornecedor_fk: id_fornecedor,
				},
				{
					where: { id: Number(id) },
				}
			);
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
