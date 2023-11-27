const database = require('../models');
const { Op } = require('sequelize');

class Shared {
	// TODO criar função para atualizar total de itens vinculados a Lotes e Nfes
	// Método para atualizar a quantidade de itens vinculados ao lote de compra
	// static async updateItensVinculados(req, res) {
	// 	const { id } = req.params;
	// 	const { soma } = req.body;

	// 	try {
	// 		const loteDeCompra = await LotesDeCompra.findOne({
	// 			where: { id: Number(id) },
	// 		});

	// 		const newValue = soma
	// 			? loteDeCompra.itens_vinculados + 1
	// 			: loteDeCompra.itens_vinculados - 1;

	// 		await database.LotesDeCompra.update(
	// 			{ itens_vinculados: newValue },
	// 			{ where: { id: Number(id) } }
	// 		);

	// 		const updatedLoteDeCompra = await database.LotesDeCompra.findOne({
	// 			where: { id: Number(id) },
	// 		});
	// 		return res.status(200).json(updatedLoteDeCompra);
	// 	} catch (error) {
	// 		return res.status(500).json(error.message);
	// 	}
	// }

	// Função para atualizar se esta atívo ou não
	static async updateTotals(id) {
		try {
			const totalEntriesValue = await database.ItensMovimentacao.sum(
				'valor_tot',
				{
					where: {
						operacao: 1,
						id_tipo_de_reagente_fk: id,
						qtd_rec: { [Op.not]: null },
					},
				}
			);

			const totalEntriesQuanty = await database.ItensMovimentacao.sum(
				'qtd_rec',
				{
					where: {
						operacao: 1,
						id_tipo_de_reagente_fk: id,
						qtd_rec: { [Op.not]: null },
					},
				}
			);

			const totalOthersValue = await database.ItensMovimentacao.sum(
				'valor_tot',
				{
					where: {
						operacao: { [Op.not]: 1 },
						id_tipo_de_reagente_fk: id,
					},
				}
			);

			const totalOthersQuanty = await database.ItensMovimentacao.sum(
				'qtd_mov',
				{
					where: {
						operacao: { [Op.not]: 1 },
						id_tipo_de_reagente_fk: id,
					},
				}
			);

			const totalValue = totalEntriesValue + totalOthersValue;
			const totalQuanty = totalEntriesQuanty + totalOthersQuanty;

			await database.TiposDeReagente.update(
				{ vlr_estoque: totalValue, estoque_atual: totalQuanty },
				{
					where: { id: Number(id) },
				}
			);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Shared;
