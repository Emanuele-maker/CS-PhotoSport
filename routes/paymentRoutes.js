const { Router } = require("express")
const { createCheckoutSession } = require("../controllers/paymentControllers.js")

const router = Router()

router.post("/checkout/:session_id", createCheckoutSession)

module.exports = { 
    router
}