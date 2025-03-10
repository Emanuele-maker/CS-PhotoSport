const app = require("./app")
const http = require("http")
// const { Server } = require("socket.io")
require("dotenv").config()

const server = http.createServer(app)
const PORT = process.env.PORT || 5000

// const io = new Server(server, {
//     cors: {
//         origin: "*"
//     }
// })

// io.on("connection", socket => {
//     console.log(`A client just connected. Client id: ${socket.id}`)

//     socket.on("disconnect", reason => {
//         console.log(`A Client (id: ${socket.id} disconnected. ${reason})`)
//     })
// })

server.listen(PORT)