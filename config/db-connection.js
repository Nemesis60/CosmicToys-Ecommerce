const mongoose = require('mongoose');

// to fix mongoose Deprecation Warning
mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("db is connected successfully to Atlas")
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB