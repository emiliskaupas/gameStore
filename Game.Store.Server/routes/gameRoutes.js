const express = require('express');
const GameController = require('../controllers/GameController');

const router = express.Router();

router.get('/list', GameController.list);
router.get('/games/:id', GameController.getById);
router.post('/games', GameController.create);
router.put('/games/:id', GameController.update);
router.delete('/games/:id', GameController.delete);

module.exports = router;
