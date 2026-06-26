const express = require('express')
const router = express.Router()

const postController = require('../controller/post.controller')

router.get('/post', postController.getPost)

module.exports = router