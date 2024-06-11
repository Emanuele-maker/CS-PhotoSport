const { Router } = require("express")
const path = require("path")
const multer = require("multer")

const upload = multer({
    dest: path.join(__dirname, "../registrazioni tottoi")
})

const router = Router()

router.patch('/multipart-upload', upload.single("audio"), (req, res) => {
    // You can access other HTTP parameters. They are located in the body object.
    console.log(req.body)
    res.end('OK')
})

module.exports = {
    router
}