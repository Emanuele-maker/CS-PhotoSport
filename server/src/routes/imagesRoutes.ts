import { getAlbumImages } from "../controllers/imagesControllers.js"
import { Router } from "express"

const router = Router()

router.get("/:album_name", getAlbumImages)

export {
    router
}