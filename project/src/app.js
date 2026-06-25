const express = require('express')
const multer = require('multer')
const app = express()
const upload = multer({ storage: multer.memoryStorage() })

const postModel = require('./models/post.model')
const uploadFile = require('../services/strorage.service')
const connectDB = require('../db/db')

connectDB();

app.use(express.json())

app.post('/create-post', upload.single("image"), async(req, res) => {
    const response = await uploadFile(req.file.buffer);
    const post = await postModel.create({
        image: response.url,
        caption: req.body.caption
    });
    res.status(201).json({ message: "success" });
});

app.get('/get-post', async(req, res) => {
    const posts = await postModel.find();
    res.status(200).json({ message: "success", posts });
});




module.exports = app;