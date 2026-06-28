const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userModel = require('../../models/user.model')

async function registerUser(req, res) {
    const { username, email, password, role = 'user' } = req.body

    const userExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (userExists) {
        res.status(409).json({ message: "user already exists" });
        return;
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        role
    });

    const token = jwt.sign({
        id: user._id,
        role: role
    }, process.env.JWT_SECRET);

    res.cookie("token", token);
    res.status(201).json({ message: "user created", user });

}

async function loginUser(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (!user) {
        res.status(401).json({
            message: "invalid credentials"
        });
        return;
    }

    const isUserValid = await bcrypt.compare(password, user.password);

    if (!isUserValid) {
        res.status(401).json({
            message: "invalid credentials"
        });
        return;
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET);

    res.cookie("token", token);
    res.status(200).json({
        message: "user logged in"
    });
}

async function logoutUser(req, res) {
    res.clearCookie('token');
    res.status(200).json({
        message: "user logged out"
    });
}

module.exports = { registerUser, loginUser, logoutUser }