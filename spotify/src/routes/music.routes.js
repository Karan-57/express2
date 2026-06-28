const express = require('express')
const multer = require('multer')

const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware')
const musicController = require('../controllers/music.controller')

const upload = multer({
    storage: multer.memoryStorage()
});

router.post('/upload', authMiddleware.authArtist, upload.single('music'), musicController.uploadMusic);
router.post('/create-album', authMiddleware.authArtist, musicController.createAlbum);

router.get('/', authMiddleware.authUser, musicController.getAllMusics);
router.get('/albums', authMiddleware.authUser, musicController.getAllAlbums);
router.get('/albums-by-id/:albumId', authMiddleware.authUser, musicController.getAlbumById);

module.exports = router;