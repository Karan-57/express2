const jwt = require('jsonwebtoken')

async function authArtist(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({
            message: "unauthorised user"
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== 'artist') {
            res.status(403).json({ message: "user does not have access" });
            return;
        }

        req.user = decoded

        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "unauthorised user" })
    }
}

async function authUser(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        res.status(401).json({ message: "unauthorised user" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== 'user') {
            res.status(403).json({ message: "cannot access resource" });
            return;
        }
        req.user = decoded;

        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "unauthorised user" });
    }
}

module.exports = { authArtist, authUser };