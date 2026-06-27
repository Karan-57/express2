const express = require('express')
const multer = require('multer')

const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware')
const musicController = require('../controllers/music.controller')

const upload = multer({
    storage: multer.memoryStorage()
});

router.post('/upload', authMiddleware, upload.single('music'), musicController.uploadMusic);
router.post('/create-album', authMiddleware, musicController.createAlbum);

router.get('/', authMiddleware.authUser, musicController.getAllMusics);

module.exports = router;