const { getAlbumImages } = require("../controllers/imagesControllers.js")
const { Router } = require("express")

const router = Router()

router.get("/:album_name", getAlbumImages)

module.exports = { 
    router 
}
