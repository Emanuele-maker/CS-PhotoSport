const app = require("./app")
const http = require("http")
require("./Feedback bot/index")

const server = http.createServer(app)
const PORT = process.env.PORT || 5000

server.listen(PORT)