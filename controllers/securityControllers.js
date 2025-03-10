require("dotenv").config()

module.exports = (req, res, next) => {
    const allowedOrigins = process.env.NODE_ENV === "production" ? ['http://csphotosport.com'] : ['http://csphotosport.com', 'http://localhost:3000', 'http://localhost:5000', "http://127.0.0.1:5500/", "http://127.0.0.1:5501/"]
    const origin = req.headers.origin
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin)
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header('Access-Control-Allow-Credentials', true)
    return next()
    // res.header("Access-Control-Allow-Origin", "*");
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
}