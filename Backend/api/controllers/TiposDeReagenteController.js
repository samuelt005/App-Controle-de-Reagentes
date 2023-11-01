const database = require('../models');
const { Op } = require('sequelize');
const { TiposDeReagente } = require('../models');

class TiposDeReagenteController {
	// Método para pegar um tipo de reagente específico
	static async getTipoDeReagente(req, res) {
		const { id } = req.params;
		try {
			const TipoDeReagente = await database.TiposDeReagente.findOne({
				where: { id: Number(id) },
				include: [
					{
						model: database.UnsDeMedida,
						as: 'un_de_medida',
					},
				],
			});
			return res.status(200).json(TipoDeReagente);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para pegar 20 tipos de reagente
	static async getTiposDeReagente(req, res) {
		const { page } = req.params;

		const pageNumber = !isNaN(page) ? parseInt(page) : 1;
		const itemsPerPage = 20;

		const offset = (pageNumber - 1) * itemsPerPage;

		try {
			const tiposdereagente = await database.TiposDeReagente.findAndCountAll({
				where: {},
				limit: itemsPerPage,
				offset: offset,
				include: [
					{
						model: database.UnsDeMedida,
						as: 'un_de_medida',
					},
				],
			});

			return res.status(200).json(tiposdereagente);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para pegar 20 tipos de reagente, ativos e filtrado
	static async getTiposDeReagenteFiltered(req, res) {
		const { page } = req.query;
		const searchInput = req.query.searchInput; // Filtro do input de pesquisa
		// const tag = req.query.tag; // TODO adicionar o filtro por tag
		const unmedida = req.query.unmedida; // Filtro por unmedida
		const qtdMin = req.query.qtdMin; // Filtro por quantidade mínima
		const qtdMax = req.query.qtdMax; // Filtro por quantidade máxima
		const vlrTotMin = req.query.vlrTotMin; // Filtro por valor total mínimo
		const vlrTotMax = req.query.vlrTotMax; // Filtro por valor total máximo
		const loc = req.query.loc; // Filtro por localização

		const pageNumber = !isNaN(page) ? parseInt(page) : 1;
		const itemsPerPage = 20;
		const offset = (pageNumber - 1) * itemsPerPage;

		try {
			const where = {
				ativo: true,
			};

			if (searchInput) {
				if (!isNaN(searchInput)) {
					where.cod = {
						[Op.like]: `%${searchInput}%`,
					};
				} else {
					where.descricao = {
						[Op.like]: `%${searchInput}%`,
					};
				}
			}

			if (unmedida) {
				where['$un_de_medida.sigla$'] = unmedida;
			}

			if (qtdMin !== undefined) {
				where.estoque_atual = {
					[Op.gte]: qtdMin,
				};
			}

			if (qtdMax !== undefined) {
				where.estoque_atual = {
					...where.estoque_atual,
					[Op.lte]: qtdMax,
				};
			}

			if (vlrTotMin !== undefined) {
				where.vlr_estoque = {
					[Op.gte]: vlrTotMin,
				};
			}

			if (vlrTotMax !== undefined) {
				where.vlr_estoque = {
					...where.vlr_estoque,
					[Op.lte]: vlrTotMax,
				};
			}

			if (loc) {
				where.loc_estoque = loc;
			}

			const tiposdereagente = await database.TiposDeReagente.findAndCountAll({
				where: where,
				limit: itemsPerPage,
				offset: offset,
				include: [
					{
						model: database.UnsDeMedida,
						as: 'un_de_medida',
					},
				],
			});

			return res.status(200).json(tiposdereagente);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para criar um tipo de reagente
	static async createTipoDeReagente(req, res) {
		const newTipoDeReagente = req.body;

		try {
			const existingReagente = await TiposDeReagente.findOne({
				where: {
					cod: newTipoDeReagente.cod,
				},
			});

			if (existingReagente) {
				return res.status(400).json({
					message: 'Já existe um material com o mesmo código.',
				});
			}

			const createdTipoDeReagente = await database.TiposDeReagente.create(
				newTipoDeReagente
			);
			return res.status(200).json(createdTipoDeReagente);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para atualizar os dados de um tipo de reagente
	static async updateTipoDeReagente(req, res) {
		const { id } = req.params;
		const newInfo = req.body;
		// TODO converter o estoque atual quando a un de medida é alterada

		try {
			await database.TiposDeReagente.update(newInfo, {
				where: { id: Number(id) },
			});
			const updatedTipoDeReagente = await database.TiposDeReagente.findOne({
				where: { id: Number(id) },
			});
			return res.status(200).json(updatedTipoDeReagente);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

// TODO Método para atualizar as tags de um tipo de reagente

module.exports = TiposDeReagenteController;
