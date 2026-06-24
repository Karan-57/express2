const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        await mongoose.connect('mongodb+srv://test:test@express2.ivrlo1x.mongodb.net/meteor');
        console.log("db connected");
    } catch {
        console.log("error in db connection");
    }
}

module.exports = connectDB;