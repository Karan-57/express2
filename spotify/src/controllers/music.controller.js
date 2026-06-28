const jwt = require('jsonwebtoken')

const musicModel = require('../../models/music.model')
const albumModel = require('../../models/album.model')
const uploadFile = require('../../services/storage.service')



async function uploadMusic(req, res) {
    const file = req.file;
    const { title } = req.body;

    const result = await uploadFile(file.buffer.toString('base64'));

    const music = await musicModel.create({
        uri: result.url,
        title: title,
        artist: req.user.id
    });

    res.status(201).json({
        message: "music created",
        music
    });
}

async function createAlbum(req, res) {

    const { title, musicIds } = req.body;

    const album = albumModel.create({
        title,
        musics: musicIds,
        artist: req.user.id
    });

    res.status(201).json({
        message: "album created"
    });
}

async function getAllMusics(req, res) {
    const musics = await musicModel.find().limit(3).populate('artist', 'username email')

    res.status(200).json({ message: "music fetched", musics });
}

async function getAllAlbums(req, res) {
    const albums = await albumModel.find().limit(3).populate('musics', 'title artist')

    res.status(200).json({ message: "music fetched", albums });
}

async function getAlbumById(req, res) {

    const albumId = req.params.albumId;
    const album = await albumModel.findOne({ _id: albumId });

    res.status(200).json({ message: "music fetched", albums: album });
}

module.exports = { uploadMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById }