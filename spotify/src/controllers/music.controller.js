const jwt = require('jsonwebtoken')

const musicModel = require('../../models/music.model')
const uploadFile = require('../../services/storage.service')



async function uploadMusic(req, res, ) {
    token = req.cookies.token;

    if (!token) {
        res.status(401).json({
            message: "unauthorised user"
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "artist") {
            res.status(401).json({
                message: "unauthorised user"
            });
            return;
        }

        const file = req.file;
        const { title } = req.body;

        const result = await uploadFile(file.buffer.toString('base64'));

        const music = await musicModel.create({
            uri: result.url,
            title: title,
            artist: decoded.id
        });

        res.status(201).json({
            message: "music created",
            music
        });
    } catch (err) {
        res.status(403).json({
            message: 'user cannot access resource'
        });
    }
}

module.exports = { uploadMusic }