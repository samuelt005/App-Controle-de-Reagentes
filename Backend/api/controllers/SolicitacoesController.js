const database = require('../models');

class SolicitacoesController {
	// Método para pegar um solicitação específico
	static async getSolicitacao(req, res) {
		const { id } = req.params;
		try {
			const solicitacao = await database.Solicitacoes.findOne({
				where: { id: Number(id) },
				attributes: { exclude: ['updatedAt'] },
			});
			return res.status(200).json(solicitacao);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para pegar 20 solicitações (paginação)
	static async getSolicitacoes(req, res) {
		const { page } = req.params;

		const pageNumber = parseInt(page) || 1;
		const itemsPerPage = 20;

		const offset = (pageNumber - 1) * itemsPerPage;

		try {
			const solicitacoes = await database.Solicitacoes.findAndCountAll({
				where: {},
				limit: itemsPerPage,
				offset: offset,
				attributes: { exclude: ['updatedAt', 'id_usuario_fk'] },
				include: [
					{
						model: database.Usuarios,
						as: 'responsavel',
						attributes: ['nome'],
					},
				],
			});

			const totalItems = await database.Solicitacoes.count();

			const totalPages = Math.ceil(totalItems / itemsPerPage);

			const resData = {
				currentPage: pageNumber,
				totalPages: totalPages,
				totalItems: totalItems,
				data: solicitacoes.rows,
			};

			return res.status(200).json(resData);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para criar um solicitação
	static async createSolicitacao(req, res) {
		const { comentario, id_usuario } = req.body;

		try {
			const createdSolicitacao = await database.Solicitacoes.create({
				comentario,
				id_usuario_fk: id_usuario,
			});
			return res.status(200).json(createdSolicitacao);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para atualizar o status de uma solicitação
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
