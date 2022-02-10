import { Router } from "express"
import { createCheckoutSession, sendCancelPage, sendSuccessPage } from "../controllers/paymentControllers.js"

const router = Router()

router.post("/checkout/:session_id", createCheckoutSession)

router.get("/success", sendSuccessPage)
router.get("/cancel", sendCancelPage)

export {
    router
}