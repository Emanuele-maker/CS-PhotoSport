const { Stripe } = require("stripe")
const sessions = require("../models/Session.js")
require("dotenv").config()

const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY

if (!STRIPE_PRIVATE_KEY)
    throw new Error("Could not get any Stripe API access key from the execution enviroment")

const stripe = new Stripe(STRIPE_PRIVATE_KEY)

const createCheckoutSession = async (req, res) => {
    const session = sessions.find(s => s.id === req.params.session_id)
    if (!session) return res.status(404).json({ message: "Session not found" })
    await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map(item => {
            return {
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: item.fileName
                    },
                    unit_amount: 300
                },
                quantity: 1
            }
        }),
        success_url: process.env.NODE_ENV === "production" ? `http://csphotosport.com/success` : "http://localhost:3000/success",
        cancel_url: process.env.NODE_ENV === "production" ? `http://csphotosport.com` : "http://localhost:3000"
    })
    .then(checkout => {
        session.boughtImages = req.body.items
        res.json({ url: checkout.url })
    })
    .catch (err =>  {
        console.error(err)
        res.status(500)
    })
}

module.exports = { 
    createCheckoutSession, 
}
