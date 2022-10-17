const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewURLParser: true
        })
        console.log("MongoDB connected...")
    }
    catch(err){
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = connectDB