const crypto = require("crypto")
const conn = require("../db/conn")

function generateSession() {
    const sessionId = crypto.randomBytes(16).toString("hex")
    conn.query(`INSERT INTO sessions (id, bought, boughtImages) VALUES ("${sessionId}", FALSE, "[]");`, (err, rows) => {
        if (err) throw err

        console.log("Generated new Session")
    })
    
    return {
        id: sessionId,
        bought: false,
        boughtImages: []
    }
}
const beginSession = (req, res) => {
    conn.query(`SELECT * FROM sessions WHERE id = "${req.params.session_id}";`, (err, rows) => {
        if (err) throw err

        if (rows.length === 0) return res.json({ session: generateSession() })
        else return res.json({ session: rows[0] })
    })
}

module.exports = {
    beginSession
}