const { Router } = require('express');
const TagsController = require('../controllers/TagsController');

const router = Router();

// Rota para listar todas as tags
router.get('/tags', TagsController.getAllTags);

module.exports = router;