const mongoose = require('mongoose')
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL

exports.connectDB = async ()=> {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log("Database Connected")
    } catch (error) {
        console.error(error.message)

        process.exit(1)
    }
}