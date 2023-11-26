const database = require('../models');

class TagsController {
	// Função para pegar todas as tags cadastradas
	static async getAllTags(req, res) {
		try {
			const allTags = await database.Tags.findAll({
				attributes: { exclude: ['createdAt', 'updatedAt'] },
			});
			return res.status(200).json(allTags);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	// Função para atualizar tags vinculadas a um tipo
	static async updateTags(req, res) {
    const { id } = req.params;
		const { em, pf, pc, eb } = req.body;

		try {
			await database.TiposDeReagenteTags.destroy({
				where: {
					id_tipo_de_reagente_tag_fk: id,
				},
			});

			if (em) {
				await database.TiposDeReagenteTags.create({
					id_tag_tipo_de_reagente_fk: 1,
					id_tipo_de_reagente_tag_fk: id,
				});
			}

			if (pf) {
				await database.TiposDeReagenteTags.create({
					id_tag_tipo_de_reagente_fk: 2,
					id_tipo_de_reagente_tag_fk: id,
				});
			}

			if (pc) {
				await database.TiposDeReagenteTags.create({
					id_tag_tipo_de_reagente_fk: 3,
					id_tipo_de_reagente_tag_fk: id,
				});
			}

			if (eb) {
				await database.TiposDeReagenteTags.create({
					id_tag_tipo_de_reagente_fk: 4,
					id_tipo_de_reagente_tag_fk: id,
				});
			}
			return res.status(200).json({ message: 'Tags atualizadas com sucesso.' });
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = TagsController;
