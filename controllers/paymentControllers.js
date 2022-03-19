const { Stripe } = require("stripe")
const sessions = require("../models/Session.js")
require("dotenv").config()

const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY

if (!STRIPE_PRIVATE_KEY)
    throw new Error("Could not get any Stripe API access key from the execution enviroment")

const stripe = new Stripe(STRIPE_PRIVATE_KEY)

const getPrice = (quantity) => {
    const basePrice = 3.5
    const discount = 1 / 10
    const limit = 10
    if (quantity < limit) return basePrice * quantity
    else return Math.round((basePrice * quantity) - (basePrice * quantity * discount))
}

const createCheckoutSession = async (req, res) => {
    const session = sessions.find(s => s.id === req.params.session_id)
    if (!session) res.status(400).json({ message: "Session not found" })

    await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [{
            price_data: {
                currency: "eur",
                product_data: {
                    name: "immagini"
                },
                unit_amount: getPrice(req.body.items.length) * 100
            },
            quantity: 1
        }],
        success_url: process.env.NODE_ENV === "production" ? `https://csphotosport.com/success` : "http://localhost:3000/success",
        cancel_url: process.env.NODE_ENV === "production" ? `https://csphotosport.com` : "http://localhost:3000"
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
