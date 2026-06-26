const jwt = require('jsonwebtoken')

const userModel = require('../models/user.model')


async function registerUser(req, res) {
    const { username, email, password } = req.body;

    const userExists = await userModel.findOne({ email });

    if (userExists) {
        return res.status(409).json({
            message: "user already exists"
        });
    }

    const user = await userModel.create({
        username,
        email,
        password
    });

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(201).json({
        user,
        message: "user registered"
    });
}

module.exports = { registerUser };