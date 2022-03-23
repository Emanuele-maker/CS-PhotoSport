const { Router } = require("express")
const { createCheckoutSession, createMobileCheckoutSession } = require("../controllers/paymentControllers.js")

const router = Router()

router.post("/checkout/:session_id", createCheckoutSession)
router.post("/mobile-checkout", createMobileCheckoutSession)

module.exports = { 
    router
}