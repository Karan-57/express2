const express = require('express')
const multer = require('multer')
const cors = require('cors')

const postModel = require('./models/post.model')
const uploadFile = require('../services/strorage.service')
const connectDB = require('../db/db')

const app = express()
app.use(cors())
app.use(express.json())
const upload = multer({ storage: multer.memoryStorage() })


connectDB();

app.post('/create-post', upload.single("image"), async(req, res) => {
    const response = await uploadFile(req.file.buffer);
    const post = await postModel.create({
        image: response.url,
        caption: req.body.caption
    });
    res.status(201).json({ message: "success" });
});

app.get('/get-posts', async(req, res) => {
    const posts = await postModel.find();
    res.status(200).json({ message: "success", posts });
});




module.exports = app;