const { Stripe } = require("stripe")
require("dotenv").config()
const conn = require("../db/conn")
const moment = require("moment")

const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY

if (!STRIPE_PRIVATE_KEY)
    throw new Error("Could not get any Stripe API access key from the execution enviroment")

const stripe = new Stripe(STRIPE_PRIVATE_KEY)

const getPrice = (quantity) => {
    const basePrice = 3
    const discount = 1 / 10
    const limit = 10
    if (quantity < limit) return basePrice * quantity
    else return Math.round((basePrice * quantity) - (basePrice * quantity * discount))
}

const createCheckoutSession = async (req, res) => {
    conn.query(`SELECT * FROM sessions WHERE id = "${req.params.session_id}";`, async (err, rows) => {
        if (err) throw err
        if (rows.length === 0 || !rows) return res.status(400).json({ error: "Session not found" })
        const session = rows[0]
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
            conn.query(`UPDATE sessions SET boughtImages = '${JSON.stringify(req.body.items)}' WHERE id = "${req.params.session_id}"`, (err, rows) => {
                if (err) throw err
            })
            conn.query(`UPDATE sessions SET bought = TRUE WHERE id = "${req.params.session_id}"`, (err, rows) => {
                if (err) throw err
            })
            conn.query(`UPDATE sessions SET moment = "${moment().format()}" WHERE id = "${req.params.session_id}"`, (err, rows) => {
                if (err) throw err
            })
            res.json({ url: checkout.url })
        })
        .catch (err =>  {
            console.error(err)
            res.status(500)
        })
    })
}

const createMobileCheckoutSession = async (req, res) => {
    const customer = await stripe.customers.create()
    const ephemeralKey = await stripe.ephemeralKeys.create({ customer: customer.id }, { apiVersion: '2020-08-27' })
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'eur',
        customer: customer.id,
        automatic_payment_methods: {
          enabled: true,
        }
    })

    res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: process.env.STRIPE_PUBLIC_KEY
    })
}


module.exports = { 
    createCheckoutSession, 
    createMobileCheckoutSession
}
