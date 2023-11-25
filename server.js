const app = require("./app")
const http = require("http")
require("dotenv").config()

const server = http.createServer(app)
const PORT = process.env.PORT || 5000

server.listen(PORT)