const { Router } = require("express")
const { beginSession, getSessions } = require("../controllers/sessionControllers.js")

const router = Router()

router.get("/sessions", getSessions)
router.get("/begin-session/:session_id?", beginSession)

module.exports = { 
    router
}