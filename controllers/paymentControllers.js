const { Stripe } = require("stripe")
require("dotenv").config()
const conn = require("../db/conn")
const moment = require("moment")

const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY

if (!STRIPE_PUBLIC_KEY)
    throw new Error("Could not get any Stripe API access key from the execution enviroment")

const stripe = new Stripe(STRIPE_PUBLIC_KEY, {
    apiVersion: "2020-08-27",
})

const createCheckoutSession = async (req, res) => {
    conn.query(`SELECT * FROM sessions WHERE id = "${req.params.session_id}"`, async (err, rows) => {
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
                    unit_amount: req.body.totalPrice
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

const createNativePayment = async(req, res) => {
    const {
      email,
      fullName,
      totalPrice,
      currency,
      request_three_d_secure,
      payment_method_types = ["card"],
    } = req.body

    const customer = await stripe.customers.create({ email, name: fullName })

    const params = {
      amount: totalPrice,
      currency,
      customer: customer.id,
      payment_method_options: {
        card: {
          request_three_d_secure: request_three_d_secure || "automatic",
        },
        sofort: {
          preferred_language: "en",
        },
      },
      payment_method_types: payment_method_types,
    }
    console.log('!@# 1')
    try {
      const paymentIntent = await stripe.paymentIntents.create(params)
      console.log('!@# create pi', paymentIntent)
      res.send({
        clientSecret: paymentIntent.client_secret,
      })
    } catch (error) {
      console.log('!@# create error', error)
      res.send({
        error: error.raw.message,
      })
    }
}

module.exports = { 
    createCheckoutSession,
    createNativePayment
}
