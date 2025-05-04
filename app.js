const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cors = require("cors")


const app = express()

const allowedOrigins = process.env.NODE_ENV === "production"
? ["https://beluga-fll.netlify.app", "https://csphotosport.com"]
: ["http://localhost:3000", "http://127.0.0.1:5500", /* etc */];

// Enable CORS with credentials
app.use(cors());

app.use(bodyParser.json({
    limit: '50mb'
}))
app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}))


const { router: sessionRouter } = require("./routes/sessionRoutes.js")
const { router: paymentRouter } = require("./routes/paymentRoutes.js")
const { router: userRouter } = require("./routes/userRoutes.js")
const baseRoute = "/api"

app.post(baseRoute + "/beluga/login", async (req, res) => {
    const PASSWORD_HASH = "$2b$12$z903d5MNPZxK4MryWKPzOusBL4XvHGU/X2DQIel.xHkp4M.u/sR/y"
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ error: "Password mancante" });
    }
    const ok = await bcrypt.compare(password, PASSWORD_HASH);
    if (!ok) {
      return res.status(401).json({ error: "Password errata" });
    }
    const token = jwt.sign({ authenticated: true }, "1481e65235e9e257994a3be69b843fffb4ae6c80096ef0d4584e0dcda7e93bcb339b771d651f006598e2c7ba53173b9d7c4929040b6aed3f1e61815a861e3d9e1b19ef4d47daedc752057c746de25ea73873ecf6a71e7520524dabbb0da8e5f7f35ecb33b225fedebb212c6e0c05791d4812ce3e43229cd79b54615be50aa37398dbee21016e71cb2ba594f21309dd4a4a8f2b30820558a2e75283e51ba6da0516d370353e48df6fb8d15a3a4ca8a3a47399038f5860d02b1b0eb6576c5eb2ca60b158957dc1b322dec518b2caa9b9b5d51cd5041cda556e0212c5bd37ddacf6475125733f0e71c1cfc43f2d29c39829743c007de3ceb51e83a8791d9b3f684a", {
        expiresIn: "1h",
    });
    res
    .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    })
      .json({ status: "ok" });
    });

app.use(baseRoute, sessionRouter)
app.use(baseRoute, paymentRouter)
app.use(baseRoute, userRouter)

app.use("/", express.static(path.join(__dirname, "./client/build")))
if (process.env.NODE_ENV === "development") {
    app.use("/img", express.static(path.join(__dirname, "./client/public/img")))
    app.use("/previews", express.static(path.join(__dirname, "./client/public/previews")))
    app.use("/cover", express.static(path.join(__dirname, "./client/public/cover")))
}
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

module.exports = app