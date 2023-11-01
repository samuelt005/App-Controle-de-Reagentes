const database = require('../models');

class TagsController {
  	// Método para pegar todas as tags cadastradas
	static async getAllTags(req, res) {
		try {
			const allTags = await database.Tags.findAll();
			return res.status(200).json(allTags);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = TagsController;
