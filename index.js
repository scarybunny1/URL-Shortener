const express = require("express");
const connectDB = require('./config/db')
require('dotenv').config()

const app = express()

connectDB()

app.use(express.json())

//Using routes
app.use("/", require("./routes/index"))
app.use("/api/url", require("./routes/url"))

const PORT = process.env.PORT || 9000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = app