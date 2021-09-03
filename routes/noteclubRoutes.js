const express = require('express');
const musicController = require('../controllers/musicController');

const router = express.Router();

router.get('/create', musicController.noteclub_create_get);
router.get('/', musicController.noteclub_index);
router.post('/', musicController.noteclub_add_music);
router.get('/:id', musicController.noteclub_details);
router.delete('/:id', musicController.noteclub_delete);

module.exports = router;