const jwt = require('jsonwebtoken')

function getPost(req, res) {
    token = req.cookies.token
    if (!token) {
        res.status(401).json({ message: "please log in" });
    }

    const result = jwt.verify(token, process.env.JWT_SECRET)

    console.log(result)

}

module.exports = { getPost }