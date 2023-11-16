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
									as: 'responsavel',
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
		const { data, valor_total, quantidade, comentario } = req.body;
		const { id } = req.params;

		try {
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
}

module.exports = TiposDeReagenteController;
