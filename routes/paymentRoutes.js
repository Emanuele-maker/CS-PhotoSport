const { Router } = require("express")
const { createCheckoutSession, sendCancelPage, sendSuccessPage } = require("../controllers/paymentControllers.js")

const router = Router()

router.post("/checkout/:session_id", createCheckoutSession)

router.get("/success", sendSuccessPage)
router.get("/cancel", sendCancelPage)

module.exports = { 
    router
}