const database = require('../models');

class CardsController {
	// Método para pegar os dados dos cards da página de listagem
	static async getListingData(req, res) {
		try {
			const total_items = await database.TiposDeReagente.count({
				where: { ativo: true },
			});

			const total_value = await database.TiposDeReagente.sum('vlr_estoque', {
				where: { ativo: true },
			});

			const most_used = await database.TiposDeReagente.findOne({
				attributes: ['descricao'],
				where: { ativo: true },
			});

			const resData = {
				total_items,
				total_value,
				most_used: most_used.descricao,
			};

			return res.status(200).json(resData);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para pegar os dados dos cards da página de histórico
	static async getHistoricoData(req, res) {
		const { id } = req.params;

		try {
			const tipoDeReagente = await database.TiposDeReagente.findOne({
				where: { id: Number(id) },
				attributes: ['vlr_estoque'],
			});

			const type = await database.TiposDeReagente.findOne({
				attributes: ['descricao'],
				include: [
					{
						model: database.UnsDeMedida,
						as: 'un_de_medida',
						attributes: { exclude: ['createdAt', 'updatedAt'] },
					},
				],
				where: { id },
			});

			const total_entries = await database.ItensMovimentacao.count({
				where: { id_tipo_de_reagente_fk: id, operacao: 1 },
			});

			const total_outputs = await database.ItensMovimentacao.count({
				where: { id_tipo_de_reagente_fk: id, operacao: 2 },
			});

			const resData = {
				desc: type.descricao,
				total_value: parseFloat(tipoDeReagente.vlr_estoque),
				total_entries,
				total_outputs,
				un_de_medida: type.un_de_medida,
			};

			return res.status(200).json(resData);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Método para pegar os dados dos cards da página de histórico
	static async getSolicitacaoData(req, res) {
		const { id } = req.params;

		try {
			const solicitacao = await database.Solicitacoes.findOne({
				where: { id: Number(id) },
				attributes: ['id', 'status', 'createdAt', 'comentario'],
				include: [
					{
						model: database.Usuarios,
						as: 'responsavel_solicitacao',
						attributes: ['nome'],
					},
				],
			});

			const resData = {
				id: solicitacao.id,
				data: solicitacao.createdAt,
				status: solicitacao.status,
				responsavel: solicitacao.responsavel_solicitacao.nome,
				comentario: solicitacao.comentario,
			};

			return res.status(200).json(resData);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = CardsController;
