const mysql = require("mysql")
require("dotenv").config()

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: "Emanuele.01#!",
    database: process.env.DB_NAME
})

console.log("Connected to database")

module.exports = conn