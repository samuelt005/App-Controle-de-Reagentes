const database = require('../models');
const { Op } = require('sequelize');

class SolicitacoesController {
	// Função para pegar os itens de uma solicitação
	static async getSolicitacaoItems(req, res) {
		const { id } = req.params;
		try {
			const solicitacao = await database.ItensMovimentacao.findAll({
				where: { id_solicitacao_fk: Number(id) },
				attributes: [
					'id',
					'novo',
					'recusado',
					'comentario',
					'qtd_mov',
					'valor_tot',
					'qtd_rec',
					'validade',
				],
				include: [
					{
						model: database.LotesDeCompra,
						as: 'lote',
						attributes: ['id', 'numero'],
					},
					{
						model: database.Nfes,
						as: 'nfe',
						attributes: ['id', 'numero'],
					},
					{
						model: database.TiposDeReagente,
						as: 'tipo',
						attributes: ['id', 'cod', 'descricao'],
						include: [
							{
								model: database.UnsDeMedida,
								as: 'un_de_medida',
								attributes: ['sigla', 'nome', 'peso'],
							},
						],
					},
				],
			});
			return res.status(200).json(solicitacao);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para pegar 20 solicitações (paginação)
	static async getSolicitacoes(req, res) {
		const { search } = req.query;
		const { page } = req.params;

		const pageNumber = parseInt(page) || 1;
		const itemsPerPage = 20;

		const offset = (pageNumber - 1) * itemsPerPage;

		try {
			const whereResponsavel = {};

			if (search) {
				whereResponsavel.nome = {
					[Op.like]: `%${search}%`,
				};
			}

			const solicitacoes = await database.Solicitacoes.findAll({
				where: {},
				limit: itemsPerPage,
				offset: offset,
				attributes: { exclude: ['updatedAt', 'id_usuario_fk'] },
				include: [
					{
						model: database.Usuarios,
						as: 'responsavel_solicitacao',
						attributes: ['nome'],
						where: whereResponsavel,
					},
				],
				order: [['id', 'DESC']],
			});

			let totalItems;
			if (search) {
				totalItems = await database.Solicitacoes.count({
					include: [
						{
							model: database.Usuarios,
							as: 'responsavel_solicitacao',
							attributes: ['nome'],
							where: whereResponsavel,
						},
					],
				});
			} else {
				totalItems = await database.Solicitacoes.count();
			}

			const totalPages = Math.ceil(totalItems / itemsPerPage);

			const resData = {
				currentPage: pageNumber,
				totalPages: totalPages,
				totalItems: totalItems,
				data: solicitacoes,
			};

			return res.status(200).json(resData);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para criar um solicitação
	static async createSolicitacao(req, res) {
		const { comentario, id_usuario } = req.body;

		try {
			const createdSolicitacao = await database.Solicitacoes.create({
				comentario,
				id_usuario_fk: id_usuario,
			});
			return res.status(200).json(createdSolicitacao.id);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para atualizar o status de uma solicitação
	static async updateStatus(req, res) {
		const { id } = req.params;
		const { status } = req.body;

		try {
			await database.Solicitacoes.update(
				{ status },
				{
					where: { id: Number(id) },
				}
			);

			const updatedSolicitacao = await database.Solicitacoes.findOne({
				where: { id: Number(id) },
			});
			return res.status(200).json(updatedSolicitacao);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = SolicitacoesController;
