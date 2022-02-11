const { Stripe } = require("stripe")
const path = require("path")
const sessions = require("../models/Session.js")

const STRIPE_PRIVATE_KEY = "sk_test_51K70ndGAxcO40dtlfGBXA7hdtTspL7IfV4zqvONyhFtWxbDLWI1GZ74OicjK4nvM7500PZt5XOZUsN8G0aA0tHeh00xLbFDOTo"

if (!STRIPE_PRIVATE_KEY)
    throw new Error("Could not get any Stripe API access key from the execution enviroment. Make sure that the variable name is STRIPE_PRIVATE_KEY")

const stripe = new Stripe(STRIPE_PRIVATE_KEY)

const createCheckoutSession = async (req, res) => {
    const session = sessions.find(s => s.id === req.params.session_id)
    if (!session)
        return res.status(400)
    session.boughtImages = req.body.items
    try {
        const session = await stripe.checkout.sessions.create({
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
            success_url: process.env.NODE_ENV === "production" ? `http://csphotosport.com` : "http://localhost:3000",
            cancel_url: process.env.NODE_ENV === "production" ? `http://csphotosport.com` : "http://localhost:3000"
        })
        res.json({ url: session.url, boughtImages: req.body.items })
    }
    catch (err) {
        console.log(err)
        res.status(500)
    }
}
const sendSuccessPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../payment/success.html"))
}
const sendCancelPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../payment/cancel.html"))
}
module.exports = { createCheckoutSession, sendSuccessPage, sendCancelPage }
