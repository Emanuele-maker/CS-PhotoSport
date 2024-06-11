const { Router } = require("express")
const fs = require("fs")
const path = require("path")
const moment = require("moment")

const router = Router()

router.post("/operazione-tottoi", (req, res) => {
    console.log(req.body)
    return res.json({
        ciao: "ciao"
    }).status(200)
})

module.exports = {
    router
}