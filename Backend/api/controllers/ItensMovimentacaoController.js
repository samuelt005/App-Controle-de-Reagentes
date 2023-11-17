const database = require('../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');

class TiposDeReagenteController {
	// Método para pegar 20 históricos de movimentação
	static async getHistory(req, res) {
		const { page, id } = req.params;

		const pageNumber = parseInt(page) || 1;
		const itemsPerPage = 20;
		const offset = (pageNumber - 1) * itemsPerPage;

		try {
			const itensmovimentacao =
				await database.ItensMovimentacao.findAndCountAll({
					where: {
						id_tipo_de_reagente_fk: Number(id),
						operacao: { [Op.not]: null },
					},
					limit: itemsPerPage,
					offset: offset,
					attributes: {
						exclude: [
							'createdAt',
							'id_tipo_de_reagente_fk',
							'id_solicitacao_fk',
							'id_lote_fk',
							'id_nfe_fk',
							'validade',
							'updatedAt',
							'id_usuario_fk',
						],
						include: [
							[
								Sequelize.fn(
									'date',
									Sequelize.col('ItensMovimentacao.updatedAt')
								),
								'data',
							],
						],
					},
					include: [
						{
							model: database.Nfes,
							as: 'nfe',
							attributes: ['numero', ['id_fornecedor_fk', 'id_emitente']],
							include: [
								{
									model: database.Fornecedores,
									as: 'emitente',
									attributes: ['cnpj', 'razao_social'],
								},
							],
						},
						{
							model: database.Solicitacoes,
							as: 'solicitacao',
							attributes: [['id_usuario_fk', 'id_responsavel']],
							include: [
								{
									model: database.Usuarios,
									as: 'responsavel_solicitacao',
									attributes: ['nome'],
								},
							],
						},
						{
							model: database.TiposDeReagente,
							as: 'tipo',
							attributes: [['id_un_de_medida_fk', 'id_un_de_medida']],
							include: [
								{
									model: database.UnsDeMedida,
									as: 'un_de_medida',
									attributes: ['sigla'],
								},
							],
						},
						{
							model: database.Usuarios,
							as: 'responsavel_movimentacao',
							attributes: ['nome'],
						},
					],
					order: [['updatedAt', 'ASC']],
				});

			const totalItems = itensmovimentacao.count;
			const totalPages = Math.ceil(totalItems / itemsPerPage);

			const resData = {
				currentPage: pageNumber,
				totalPages: totalPages,
				totalItems: totalItems,
				data: itensmovimentacao.rows,
			};

			return res.status(200).json(resData);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async newAdjustment(req, res) {
		const { data, valor_total, quantidade, comentario, id_usuario } = req.body;
		const { id } = req.params;

		const valor_unit = parseFloat(valor_total / quantidade);

		try {
			const createdItemMovimentacao = await database.ItensMovimentacao.create({
				operacao: 3,
				qtd_mov: quantidade,
				valor_unit,
				data_ajuste: data,
				comentario,
				id_usuario_fk: id_usuario,
				id_tipo_de_reagente_fk: id,
			});

			if (createdItemMovimentacao !== null) {
				const tipoDeReagente = await database.TiposDeReagente.findOne({
					where: { id: Number(id) },
					attributes: ['vlr_estoque'],
				});

				const newValue =
					parseFloat(tipoDeReagente.vlr_estoque) + parseFloat(valor_total);

				await database.TiposDeReagente.update(
					{ vlr_estoque: newValue },
					{
						where: { id: Number(id) },
					}
				);
			}

			return res.status(200).json(createdItemMovimentacao);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = TiposDeReagenteController;
