const mysql = require("mysql")
require("dotenv").config()

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// const conn = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Emanuele.01",
//     database: "cs_photosport"
// })

console.log("Connected to database")

module.exports = conn