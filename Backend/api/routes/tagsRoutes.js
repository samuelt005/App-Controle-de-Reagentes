const { Router } = require('express');
const TagsController = require('../controllers/TagsController');

const router = Router();

// Rota para listar todas as tags
router.get('/tags', TagsController.getAllTags);

router.put('/tags/:id', TagsController.updateTags);

module.exports = router;
