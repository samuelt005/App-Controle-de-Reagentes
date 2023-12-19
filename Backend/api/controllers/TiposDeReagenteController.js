const database = require('../models');
const { Op } = require('sequelize');
const { TiposDeReagente } = require('../models');

class TiposDeReagenteController {
	// Função para pegar 20 tipos de reagente
	static async getTiposDeReagente(req, res) {
		const { search } = req.query;
		const { page } = req.params;

		const pageNumber = parseInt(page) || 1;
		const itemsPerPage = 20;

		const offset = (pageNumber - 1) * itemsPerPage;

		try {
			const where = {};

			if (search) {
				if (!isNaN(search)) {
					where.cod = {
						[Op.like]: `%${search}%`,
					};
				} else {
					where.descricao = {
						[Op.like]: `%${search}%`,
					};
				}
			}

			const tiposDeReagente = await database.TiposDeReagente.findAll({
				where: where,
				limit: itemsPerPage,
				offset: offset,
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'id_un_de_medida_fk'],
				},
				include: [
					{
						model: database.UnsDeMedida,
						as: 'un_de_medida',
						attributes: { exclude: ['createdAt', 'updatedAt'] },
					},
				],
			});

			for (const tipoDeReagente of tiposDeReagente) {
				tipoDeReagente.dataValues.tags = await tipoDeReagente.getTags({
					attributes: ['sigla'],
				});
			}

			let totalItems;
			if (search) {
				totalItems = await database.TiposDeReagente.count({
					where: where,
				});
			} else {
				totalItems = await database.TiposDeReagente.count();
			}

			const totalPages = Math.ceil(totalItems / itemsPerPage);

			const resData = {
				currentPage: pageNumber,
				totalPages: totalPages,
				totalItems: totalItems,
				data: tiposDeReagente,
			};

			return res.status(200).json(resData);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para pegar 20 tipos de reagente ativos
	static async getTiposDeReagenteActive(req, res) {
		const { search } = req.query;
		const { page } = req.params;

		const pageNumber = parseInt(page) || 1;
		const itemsPerPage = 20;

		const offset = (pageNumber - 1) * itemsPerPage;

		try {
			const where = { ativo: true };

			if (search) {
				if (!isNaN(search)) {
					where.cod = {
						[Op.like]: `%${search}%`,
					};
				} else {
					where.descricao = {
						[Op.like]: `%${search}%`,
					};
				}
			}

			const tiposDeReagente = await database.TiposDeReagente.findAll({
				where: where,
				limit: itemsPerPage,
				offset: offset,
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'id_un_de_medida_fk'],
				},
				include: [
					{
						model: database.UnsDeMedida,
						as: 'un_de_medida',
						attributes: { exclude: ['createdAt', 'updatedAt'] },
					},
					{
						model: database.Tags,
						as: 'tags',
						through: { attributes: [] },
						attributes: { exclude: ['createdAt', 'updatedAt'] },
					},
				],
			});

			let totalItems;
			if (search) {
				totalItems = await database.TiposDeReagente.count({
					where: where,
				});
			} else {
				totalItems = await database.TiposDeReagente.count({
					where: { ativo: true },
				});
			}

			const totalPages = Math.ceil(totalItems / itemsPerPage);

			const resData = {
				currentPage: pageNumber,
				totalPages: totalPages,
				totalItems: totalItems,
				data: tiposDeReagente,
			};

			return res.status(200).json(resData);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para pegar todos os tipos de reagente ativos
	static async getAllTiposDeReagenteActive(req, res) {
		try {
			const tiposDeReagente = await database.TiposDeReagente.findAll({
				where: { ativo: true },
				attributes: ['id', 'cod', 'descricao'],
			});

			const resData = tiposDeReagente;

			return res.status(200).json(resData);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para pegar 20 tipos de reagente, ativos e filtrado
	static async getTiposDeReagenteFiltered(req, res) {
		const {
			page,
			search,
			unmedida,
			qtdMin,
			qtdMax,
			vlrTotMin,
			vlrTotMax,
			loc,
			tag,
		} = req.query;

		const pageNumber = parseInt(page) || 1;
		const itemsPerPage = 20;
		const offset = (pageNumber - 1) * itemsPerPage;

		try {
			const whereUn = {};
			const where = {
				ativo: true,
			};

			if (search) {
				if (!isNaN(search)) {
					where.cod = {
						[Op.like]: `%${search}%`,
					};
				} else {
					where.descricao = {
						[Op.like]: `%${search}%`,
					};
				}
			}

			if (unmedida) {
				whereUn.sigla = unmedida;
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

			// TODO filtrar por valor unitário

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

			if (loc !== undefined) {
				where.loc_estoque = {
					[Op.like]: `%${loc}%`,
				};
			}

			// Busca os itens que inclui a tag e salva num array o id do item
			if (tag) {
				const itensWithTag = await database.TiposDeReagente.findAll({
					attributes: ['id'],
					include: [
						{
							model: database.Tags,
							as: 'tags',
							through: { attributes: [] },
							where: { sigla: tag },
						},
					],
					order: [['id', 'ASC']],
				});

				const ids = itensWithTag.map((item) => item.id);

				where.id = {
					[Op.in]: ids,
				};
			}

			const tiposdereagente = await database.TiposDeReagente.findAll({
				where: where,
				limit: itemsPerPage,
				offset: offset,
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'id_un_de_medida_fk'],
				},
				include: [
					{
						model: database.UnsDeMedida,
						as: 'un_de_medida',
						where: whereUn,
						attributes: { exclude: ['createdAt', 'updatedAt'] },
					},
					{
						model: database.Tags,
						as: 'tags',
						through: { attributes: [] },
						attributes: { exclude: ['createdAt', 'updatedAt'] },
					},
				],
			});

			const totalItems = await database.TiposDeReagente.count({
				where: where,
				include: [
					{
						model: database.UnsDeMedida,
						as: 'un_de_medida',
						where: whereUn,
						attributes: { exclude: ['createdAt', 'updatedAt'] },
					},
				],
			});

			const totalPages = Math.ceil(totalItems / itemsPerPage);

			const resData = {
				currentPage: pageNumber,
				totalPages: totalPages,
				totalItems: totalItems,
				data: tiposdereagente,
			};

			return res.status(200).json(resData);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para criar um tipo de reagente
	static async createTipoDeReagente(req, res) {
		const { cod, descricao, loc_estoque, id_un_de_medida } = req.body;

		try {
			const existingReagente = await TiposDeReagente.findOne({
				where: {
					cod,
				},
			});

			if (existingReagente) {
				return res.status(409).json({
					message: 'Já existe um material com o mesmo código.',
				});
			}

			const createdTipoDeReagente = await database.TiposDeReagente.create({
				cod,
				descricao,
				loc_estoque,
				id_un_de_medida_fk: id_un_de_medida,
			});
			return res.status(200).json(createdTipoDeReagente);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para atualizar os dados de um tipo de reagente
	static async updateTipoDeReagente(req, res) {
		const { id } = req.params;
		const { cod, descricao, loc_estoque, id_un_de_medida } = req.body;

		try {
			const existingTipoDeReagente = await TiposDeReagente.findOne({
				where: {
					cod,
				},
			});

			if (
				existingTipoDeReagente &&
				existingTipoDeReagente.id !== parseInt(id)
			) {
				return res.status(409).json({
					message: 'Já existe um tipo de reagente com o mesmo código.',
				});
			}

			await database.TiposDeReagente.update(
				{
					cod,
					descricao,
					loc_estoque,
					id_un_de_medida_fk: id_un_de_medida,
				},
				{
					where: { id: Number(id) },
				}
			);
			const updatedTipoDeReagente = await database.TiposDeReagente.findOne({
				where: { id: Number(id) },
			});
			return res.status(200).json(updatedTipoDeReagente);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para atualizar se esta atívo ou não
	static async updateAtivo(req, res) {
		const { id } = req.params;

		try {
			const existingTipoDeReagente = await TiposDeReagente.findOne({
				where: { id },
			});

			if (parseFloat(existingTipoDeReagente.vlr_estoque) !== 0) {
				return res.status(400).json({
					message: 'Não é possível inativar um tipo com valor em estoque.',
				});
			}

			await database.TiposDeReagente.update(
				{ ativo: !existingTipoDeReagente.ativo },
				{
					where: { id: Number(id) },
				}
			);
			const updatedTipoDeReagente = await database.TiposDeReagente.findOne({
				where: { id: Number(id) },
			});
			return res.status(200).json(updatedTipoDeReagente);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = TiposDeReagenteController;
