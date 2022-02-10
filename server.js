const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const { router: imagesRouter } = require("./routes/imagesRoutes.js")
const { router: sessionRouter } = require("./routes/sessionRoutes.js")
const { router: paymentRouter } = require("./routes/paymentRoutes.js")

const app = express()

app.use(express.static(path.join(__dirname)))
const PORT = process.env.PORT || 3000

app.use(bodyParser.json({
    limit: '50mb'
}))
app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}))

app.use("/images", imagesRouter)
app.use(sessionRouter)
app.use(paymentRouter)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
