const { Router } = require("express")
const { beginSession } = require("../controllers/sessionControllers.js")

const router = Router()

router.post("/begin-session/:session_id?", beginSession)

module.exports = { 
    router
}