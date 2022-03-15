const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const { router: sessionRouter } = require("./routes/sessionRoutes.js")
const { router: paymentRouter } = require("./routes/paymentRoutes.js")
const cors = require("./controllers/securityControllers.js")

const app = express()

app.use("/", express.static(path.join(__dirname, "./client/build")))
if (process.env.NODE_ENV === "development") {
    app.use("/img", express.static(path.join(__dirname, "./client/public/img")))
    app.use("/previews", express.static(path.join(__dirname, "./client/public/previews")))
}

app.use(bodyParser.json({
    limit: '50mb'
}))
app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}))
app.use(cors)

const baseRoute = "/api"

app.use(baseRoute, sessionRouter)
app.use(baseRoute, paymentRouter)

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

module.exports = app