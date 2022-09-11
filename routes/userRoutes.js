const { Router } = require("express")
const conn = require("../db/conn")

const router = Router()

router.post("/user", async(req, res) => {
    const { id, userName, picture, email } = req.body
    conn.query(`INSERT IGNORE INTO users (id, userName, images, picture, email, favorites) VALUES ("${id}", "${userName}", "[]", "${picture}", "${email}", "[]")`, (err, rows) => {
        if (err) console.error(err)
    })
})

router.get("/myUser/:userId", async(req, res) => {
    conn.query(`SELECT * FROM users WHERE id = ${req.params.userId}`, (err, rows) => {
        if (err) throw err
        res.status(200).json({
            user: rows[0]
        })
    })
})

router.post("/myUser/add-image", async(req, res) => {
    conn.query(`UPDATE users SET images = '${JSON.stringify(req.body.images)}' WHERE id = ${req.body.user_id}`, (err, rows) => {
        if (err) console.error(err)
    })
})

module.exports = { 
    router
}