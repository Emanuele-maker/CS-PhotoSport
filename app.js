const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const { router: sessionRouter } = require("./routes/sessionRoutes.js")
const { router: paymentRouter } = require("./routes/paymentRoutes.js")

const app = express()

app.use(express.static(path.join(__dirname)))

app.use(bodyParser.json({
    limit: '50mb'
}))
app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}))

app.use("/", sessionRouter)
app.use("/", paymentRouter)

module.exports = app