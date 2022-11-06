const { Router } = require("express")
const { createCheckoutSession, createNativePayment } = require("../controllers/paymentControllers.js")

const router = Router()

router.post("/checkout/:session_id", createCheckoutSession)
router.post("/payment-sheet", createNativePayment)

module.exports = { 
    router
}